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
      <div class="lecturer-department">${lecturer.department} Department</div>
    </div>
    
    <div class="profile-details">
      <div class="detail-group">
        <h3><i class="fas fa-graduation-cap"></i> Academic Background</h3>
        <p><strong>Education:</strong> ${lecturer.education || 'Not specified'}</p>
        <p><strong>Experience:</strong> ${lecturer.yearsOfExperience || 'Not specified'} years</p>
        <p><strong>Specialization:</strong> ${lecturer.specialization || 'Not specified'}</p>
      </div>
      
      <div class="detail-group">
        <h3><i class="fas fa-book"></i> Courses Taught</h3>
        <div class="courses-list">
          ${lecturer.courses ? lecturer.courses.map(course => 
            `<span class="course-tag">${course}</span>`
          ).join('') : '<p>No courses specified</p>'}
        </div>
      </div>
      
      <div class="detail-group">
        <h3><i class="fas fa-briefcase"></i> Professional Bio</h3>
        <p>${lecturer.bio || 'No biography available yet.'}</p>
      </div>
      
      <div class="detail-group">
        <h3><i class="fas fa-address-card"></i> Contact Information</h3>
        <div class="contact-info">
          <div class="contact-item">
            <p><strong><i class="fas fa-envelope"></i> Email:</strong><br>${lecturer.email || 'Not provided'}</p>
          </div>
          <div class="contact-item">
            <p><strong><i class="fas fa-phone"></i> Phone:</strong><br>${lecturer.phone || 'Not provided'}</p>
          </div>
          <div class="contact-item">
            <p><strong><i class="fas fa-building"></i> Office:</strong><br>${lecturer.office || 'Not specified'}</p>
          </div>
        </div>
      </div>
      
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