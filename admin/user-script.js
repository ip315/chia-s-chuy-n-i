// User data
const users = [
  { name: "ADMIN", role: "Quản trị viên", hasOptions: false },
  { name: "minhquan", role: "Người dùng", hasOptions: true },
  { name: "Tai", role: "Người dùng", hasOptions: true },
  { name: "Nhuu", role: "Người dùng", hasOptions: true },
  { name: "Khoa", role: "Người dùng", hasOptions: true },
  { name: "Nhat", role: "Người dùng", hasOptions: true },
];

// Store original users data for search functionality
let originalUsers = [...users];
let filteredUsers = [...users];

// DOM elements
const searchInput = document.getElementById('searchInput');
const usersTableBody = document.getElementById('usersTableBody');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  renderUsers(filteredUsers);
  setupEventListeners();
  highlightCurrentPage();
});

// Setup event listeners
function setupEventListeners() {
  // Search input event listener
  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    filterUsers(searchTerm);
  });

  // Enter key search
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchUsers();
    }
  });
}

// Highlight current page in navigation
function highlightCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (currentPage === linkPage) {
      link.classList.add('active');
    }
  });
}

// Render users in the table
function renderUsers(usersToRender) {
  if (usersToRender.length === 0) {
    usersTableBody.innerHTML = `
      <tr>
        <td colspan="2" class="empty-state">
          <h3>Không tìm thấy người dùng</h3>
          <p>Thử tìm kiếm với từ khóa khác</p>
        </td>
      </tr>
    `;
    return;
  }

  usersTableBody.innerHTML = usersToRender.map((user, index) => `
    <tr class="table-row" data-user-index="${index}">
      <td class="table-cell">${escapeHtml(user.name)}</td>
      <td class="table-cell">
        ${escapeHtml(user.role)}
        ${user.hasOptions ? '<span class="options-menu" onclick="showOptionsMenu(event, ' + index + ')">...</span>' : ''}
      </td>
    </tr>
  `).join('');

  // Add animation delay for each row
  const rows = usersTableBody.querySelectorAll('.table-row');
  rows.forEach((row, index) => {
    row.style.animationDelay = `${index * 0.1}s`;
  });
}

// Filter users based on search term
function filterUsers(searchTerm) {
  if (!searchTerm) {
    filteredUsers = [...originalUsers];
  } else {
    filteredUsers = originalUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    );
  }
  renderUsers(filteredUsers);
}

// Search users function (called by search button)
function searchUsers() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  filterUsers(searchTerm);
  
  // Add visual feedback
  const searchButton = document.querySelector('.search-button');
  searchButton.style.transform = 'scale(0.95)';
  setTimeout(() => {
    searchButton.style.transform = 'scale(1)';
  }, 150);
}

// Show options menu
function showOptionsMenu(event, userIndex) {
  event.stopPropagation();
  
  const user = filteredUsers[userIndex];
  const options = [
    'Xem chi tiết',
    'Chỉnh sửa',
    'Xóa người dùng'
  ];
  
  // Create a simple context menu
  const existingMenu = document.querySelector('.context-menu');
  if (existingMenu) {
    existingMenu.remove();
  }
  
  const menu = document.createElement('div');
  menu.className = 'context-menu';
  menu.style.cssText = `
    position: fixed;
    top: ${event.clientY}px;
    left: ${event.clientX}px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    min-width: 150px;
    padding: 8px 0;
  `;
  
  options.forEach(option => {
    const item = document.createElement('div');
    item.textContent = option;
    item.style.cssText = `
      padding: 12px 16px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s ease;
    `;
    
    item.addEventListener('mouseenter', () => {
      item.style.backgroundColor = '#f3f4f6';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.backgroundColor = 'transparent';
    });
    
    item.addEventListener('click', () => {
      handleMenuAction(option, user);
      menu.remove();
    });
    
    menu.appendChild(item);
  });
  
  document.body.appendChild(menu);
  
  // Close menu when clicking outside
  setTimeout(() => {
    document.addEventListener('click', function closeMenu() {
      menu.remove();
      document.removeEventListener('click', closeMenu);
    });
  }, 0);
}

// Handle menu actions
function handleMenuAction(action, user) {
  switch(action) {
    case 'Xem chi tiết':
      alert(`Xem chi tiết người dùng: ${user.name}`);
      break;
    case 'Chỉnh sửa':
      alert(`Chỉnh sửa người dùng: ${user.name}`);
      break;
    case 'Xóa người dùng':
      if (confirm(`Bạn có chắc chắn muốn xóa người dùng ${user.name}?`)) {
        deleteUser(user);
      }
      break;
  }
}

// Delete user function
function deleteUser(userToDelete) {
  const index = originalUsers.findIndex(user => user.name === userToDelete.name);
  if (index > -1) {
    originalUsers.splice(index, 1);
    filterUsers(searchInput.value.toLowerCase().trim());
    
    // Show success message
    showNotification(`Đã xóa người dùng ${userToDelete.name}`, 'success');
  }
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 1001;
    animation: slideIn 0.3s ease-out;
    ${type === 'success' ? 'background-color: #10b981;' : 'background-color: #3b82f6;'}
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}