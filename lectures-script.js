document.addEventListener('DOMContentLoaded', function() {
  console.log('Loading lecturers...');
  loadLecturers();
});

async function loadLecturers() {
  const lecturersContainer = document.getElementById('lecturersContainer');
  const loadingElement = document.getElementById('loading');
  
  try {
    console.log('Loading lectures-data.json...');
    
    const response = await fetch('lectures-data.json?' + new Date().getTime());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('JSON loaded successfully! Found', data.lecturers.length, 'lecturers');

    loadingElement.style.display = 'none';
    lecturersContainer.innerHTML = '';
    
    data.lecturers.forEach(lecturer => {
      createLecturerCard(lecturer);
    });
    
  } catch (error) {
    console.error('Error loading JSON:', error);
    showError('Failed to load lecturers: ' + error.message);
    loadingElement.style.display = 'none';
  }
}

function createLecturerCard(lecturer) {
  const lecturersContainer = document.getElementById('lecturersContainer');
  
  const lecturerCard = document.createElement('button');
  lecturerCard.className = 'lecturer-card';
  lecturerCard.onclick = () => viewLecturer(lecturer.id);
  
  // Create avatar with fallback to initial
  const avatarContent = createLecturerAvatar(lecturer);
  
  lecturerCard.innerHTML = `
    ${avatarContent}
    <div class="lecturer-info">
      <div class="lecturer-name">${lecturer.name}</div>
      <div class="lecturer-title">${lecturer.title}</div>
    </div>
  `;
  
  lecturersContainer.appendChild(lecturerCard);
}

function createLecturerAvatar(lecturer) {
  // If avatar path exists, try to use image
  if (lecturer.avatar) {
    return `
      <div class="lecturer-avatar-container">
        <img src="${lecturer.avatar}" alt="${lecturer.name}" class="lecturer-avatar"
             onerror="this.remove(); this.parentElement.textContent='${lecturer.name.charAt(0)}'">
      </div>
    `;
  }
  
  // Fallback to initial
  return `
    <div class="lecturer-avatar-container">
      ${lecturer.name.charAt(0)}
    </div>
  `;
}

function viewLecturer(lecturerId) {
  console.log('Viewing lecturer:', lecturerId);
  window.location.href = `lecturer-details.html?id=${lecturerId}`;
}

function showError(message) {
  const lecturersContainer = document.getElementById('lecturersContainer');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-triangle"></i>
    <p>${message}</p>
    <small>Check browser console for details</small>
  `;
  lecturersContainer.appendChild(errorDiv);

}