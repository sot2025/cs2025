let allStudents = [];

document.addEventListener('DOMContentLoaded', function() {
  console.log('Loading software graduates...');
  initializeSearch();
  loadStudents();
});

function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  
  // Search as you type
  searchInput.addEventListener('input', function(e) {
    performSearch(e.target.value);
  });
  
  // Clear search
  clearSearch.addEventListener('click', function() {
    searchInput.value = '';
    performSearch('');
    searchInput.focus();
  });
  
  // Clear search with Escape key
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      searchInput.value = '';
      performSearch('');
    }
  });
}

async function loadStudents() {
  const studentsContainer = document.getElementById('studentsContainer');
  const loadingElement = document.getElementById('loading');
  
  try {
    console.log('Loading studentss-data.json...');
    
    const response = await fetch('studentss-data.json?' + new Date().getTime());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('JSON loaded successfully! Found', data.students.length, 'students');

    allStudents = data.students;
    loadingElement.style.display = 'none';
    
    displayStudents(allStudents);
    updateSearchStats(allStudents.length, allStudents.length);
    
  } catch (error) {
    console.error('Error loading JSON:', error);
    showError('Failed to load students: ' + error.message);
    loadingElement.style.display = 'none';
  }
}

function displayStudents(students) {
  const studentsContainer = document.getElementById('studentsContainer');
  const noResults = document.getElementById('noResults');
  
  studentsContainer.innerHTML = '';
  
  if (students.length === 0) {
    noResults.style.display = 'block';
    studentsContainer.style.display = 'none';
    return;
  }
  
  noResults.style.display = 'none';
  studentsContainer.style.display = 'grid';
  
  students.forEach(student => {
    createStudentButton(student);
  });
}

function createStudentButton(student) {
  const studentsContainer = document.getElementById('studentsContainer');
  
  const studentButton = document.createElement('button');
  studentButton.className = 'student-button';
  studentButton.onclick = () => viewStudent(student.id);
  
  // Use actual image with bigger size
  const avatarContent = `
    <div class="student-avatar-container">
      <img src="${student.avatar}" alt="${student.name}" class="student-avatar"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="student-avatar-initial" style="display: none;">
        ${student.name.charAt(0)}
      </div>
    </div>
  `;
  
  studentButton.innerHTML = `
    ${avatarContent}
    <div class="student-name">${student.name}</div>
  `;
  
  studentsContainer.appendChild(studentButton);
}

function performSearch(searchTerm) {
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  
  // Show/hide clear button based on search term
  if (searchTerm.trim() !== '') {
    clearSearch.style.display = 'flex';
  } else {
    clearSearch.style.display = 'none';
  }
  
  if (searchTerm.trim() === '') {
    // Show all students
    displayStudents(allStudents);
    updateSearchStats(allStudents.length, allStudents.length);
    return;
  }
  
  // Filter students based on search term
  const filteredStudents = allStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.fullName && student.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.nickname && student.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  displayStudents(filteredStudents);
  updateSearchStats(filteredStudents.length, allStudents.length);
  
  // Highlight search terms in student names
  highlightSearchTerms(searchTerm);
}

function highlightSearchTerms(searchTerm) {
  if (searchTerm.trim() === '') return;
  
  const studentNames = document.querySelectorAll('.student-name');
  const searchLower = searchTerm.toLowerCase();
  
  studentNames.forEach(nameElement => {
    const originalText = nameElement.textContent;
    const nameLower = originalText.toLowerCase();
    
    if (nameLower.includes(searchLower)) {
      const startIndex = nameLower.indexOf(searchLower);
      const endIndex = startIndex + searchTerm.length;
      
      const highlightedText = 
        originalText.substring(0, startIndex) +
        '<span class="highlight">' + originalText.substring(startIndex, endIndex) + '</span>' +
        originalText.substring(endIndex);
      
      nameElement.innerHTML = highlightedText;
    }
  });
}

function updateSearchStats(shown, total) {
  const searchResults = document.getElementById('searchResults');
  
  if (shown === total) {
    searchResults.textContent = `Showing all ${total} students`;
  } else {
    searchResults.textContent = `Showing ${shown} of ${total} students`;
  }
}

function viewStudent(studentId) {
  console.log('Viewing student:', studentId);
  window.location.href = `student-details.html?id=${studentId}`;
}

function showError(message) {
  const studentsContainer = document.getElementById('studentsContainer');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-triangle"></i>
    <p>${message}</p>
    <small>Check browser console for details</small>
  `;
  studentsContainer.appendChild(errorDiv);
}