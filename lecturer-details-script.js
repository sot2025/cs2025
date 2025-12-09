document.addEventListener('DOMContentLoaded', function() {
  console.log('Loading lecturer details...');
  loadLecturerDetails();
});

async function loadLecturerDetails() {
  const lecturerProfile = document.getElementById('lecturerProfile');
  const loadingElement = document.getElementById('loading');
  
  try {
    // Get lecturer ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const lecturerId = urlParams.get('id');
    
    if (!lecturerId) {
      throw new Error('No lecturer ID provided');
    }
    
    console.log('Loading lecturer:', lecturerId);
    
    // Load lecturers data
    const response = await fetch('lectures-data.json?' + new Date().getTime());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const lecturer = data.lecturers.find(l => l.id === lecturerId);
    
    if (!lecturer) {
      throw new Error('Lecturer not found');
    }
    
    loadingElement.style.display = 'none';
    displayLecturerProfile(lecturer);
    
  } catch (error) {
    console.error('Error loading lecturer details:', error);
    showError('Failed to load lecturer details: ' + error.message);
    loadingElement.style.display = 'none';
  }
}

function displayLecturerProfile(lecturer) {
  const lecturerProfile = document.getElementById('lecturerProfile');
  
  const avatarContent = lecturer.avatar ? 
    `<img src="${lecturer.avatar}" alt="${lecturer.name}" class="profile-avatar" onerror="this.style.display='none'; document.getElementById('avatar-initial').style.display='flex';">` :
    '';
  
  const initial = lecturer.name.charAt(0);
  
  // Sample advice messages - you can customize these per lecturer
  const adviceMessages = [
    "Never stop learning. The field of technology evolves rapidly, and continuous learning is your greatest asset.",
    "Embrace challenges as opportunities for growth. Every problem you solve makes you a better engineer.",
    "Build projects, not just resumes. Practical experience will teach you more than any textbook.",
    "Collaborate and network. Some of the best ideas come from working with others and sharing knowledge.",
    "Stay curious and ask questions. The best innovations come from questioning the status quo.",
    "Balance technical skills with soft skills. Communication and teamwork are as important as coding ability.",
    "Learn from failures. Every mistake is a stepping stone to mastery and innovation."
  ];
  
  // Random advice for demonstration - in real app, each lecturer would have their own advice
  const randomAdvice = adviceMessages[Math.floor(Math.random() * adviceMessages.length)];
  
  lecturerProfile.innerHTML = `
    <div class="profile-header">
      ${avatarContent}
      <div id="avatar-initial" class="avatar-initial" style="${lecturer.avatar ? 'display: none;' : ''}">
        ${initial}
      </div>
      <h1 class="lecturer-name">${lecturer.name}</h1>
      <div class="lecturer-title">${lecturer.title}</div>

    
    
      <!-- Unique Advice Section -->
      <div class="advice-section">
        <h3><i class="fas fa-lightbulb"></i> Advice for Students</h3>
        <div class="advice-content">
          ${randomAdvice}
        </div>
      </div>
    </div>
  `;
}

function showError(message) {
  const lecturerProfile = document.getElementById('lecturerProfile');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-triangle"></i>
    <p>${message}</p>
    <a href="lectures.html" class="back-button" style="margin-top: 1rem;">
      <i class="fas fa-arrow-left"></i> Back to Lecturers
    </a>
  `;
  lecturerProfile.appendChild(errorDiv);

}