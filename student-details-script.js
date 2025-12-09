document.addEventListener('DOMContentLoaded', function() {
  console.log('Loading student details...');
  loadStudentDetails();
});

async function loadStudentDetails() {
  const studentProfile = document.getElementById('studentProfile');
  const loadingElement = document.getElementById('loading');
  
  try {
    // Get student ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');
    
    if (!studentId) {
      throw new Error('No student ID provided');
    }
    
    console.log('Loading student:', studentId);
    
    // Load students data
    const response = await fetch('students-data.json?' + new Date().getTime());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const student = data.students.find(s => s.id === studentId);
    
    if (!student) {
      throw new Error('Student not found');
    }
    
    loadingElement.style.display = 'none';
    displayStudentProfile(student);
    
  } catch (error) {
    console.error('Error loading student details:', error);
    showError('Failed to load student details: ' + error.message);
    loadingElement.style.display = 'none';
  }
}

function displayStudentProfile(student) {
  const studentProfile = document.getElementById('studentProfile');
  
  const avatarContent = student.avatar ? 
    `<img src="${student.avatar}" alt="${student.name}" class="profile-avatar" onerror="this.style.display='none'; document.getElementById('avatar-initial').style.display='flex';">` :
    '';
  
  const initial = student.name.charAt(0);
  
  studentProfile.innerHTML = `
    <div class="profile-header">
      ${avatarContent}
      <div id="avatar-initial" class="avatar-initial" style="${student.avatar ? 'display: none;' : ''}">
        ${initial}
      </div>
      <h1 class="student-name">${student.fullName || student.name}</h1>
      ${student.nickname ? `<p class="student-nickname">"${student.nickname}"</p>` : ''}
    </div>
    
    <div class="profile-details">
      <div class="detail-group">
        <h3><i class="fas fa-graduation-cap"></i> Academic Information</h3>
        <p><strong>Specialization:</strong> ${student.specialization || 'Not specified'}</p>
        <p><strong>Graduation Date:</strong> ${student.graduationDate || 'June 2025'}</p>
      </div>
      
      <div class="detail-group">
        <h3><i class="fas fa-bullseye"></i> Ambition</h3>
        <p>${student.ambition || 'No ambition specified yet.'}</p>
      </div>
      
      <div class="detail-group">
        <h3><i class="fas fa-address-card"></i> Contact Information</h3>
        <div class="contact-info">
          <div>
            <p><strong>Email:</strong><br>${student.email || 'Not provided'}</p>
          </div>
          <div>
            <p><strong>Phone:</strong><br>${student.phone || 'Not provided'}</p>
          </div>
          <div>
            <p><strong>Address:</strong><br>${student.address || 'Not provided'}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function showError(message) {
  const studentProfile = document.getElementById('studentProfile');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-triangle"></i>
    <p>${message}</p>
    <a href="software.html" class="back-button" style="margin-top: 1rem;">
      <i class="fas fa-arrow-left"></i> Back to Students
    </a>
  `;
  studentProfile.appendChild(errorDiv);
}