// Sample post data
const posts = [
  {
    id: 1,
    title: 'Cảnh đẹp Phú Yên',
    author: 'minhquan',
    date: '15/06/2023',
    status: 'published',
    content: 'Nội dung bài viết về cảnh đẹp Phú Yên...'
  },
  {
    id: 2,
    title: 'Ẩm thực miền Trung',
    author: 'tai',
    date: '10/06/2023',
    status: 'published',
    content: 'Bài viết về các món ăn đặc sản miền Trung...'
  },
  {
    id: 3,
    title: 'Kinh nghiệm du lịch bụi',
    author: 'nhu',
    date: '05/06/2023',
    status: 'draft',
    content: 'Chia sẻ kinh nghiệm du lịch bụi...'
  },
  {
    id: 4,
    title: 'Review khách sạn 5 sao',
    author: 'khoa',
    date: '01/06/2023',
    status: 'pending',
    content: 'Đánh giá về các khách sạn 5 sao tại Đà Nẵng...'
  }
];

// Sample authors
const authors = [
  { id: 'minhquan', name: 'Minh Quân' },
  { id: 'tai', name: 'Văn Tài' },
  { id: 'nhu', name: 'Thị Nhu' },
  { id: 'khoa', name: 'Minh Khoa' },
  { id: 'nhat', name: 'Hoàng Nhật' }
];

// Initialize post management
document.addEventListener('DOMContentLoaded', function() {
  renderPosts(posts);
  setupEventListeners();
  highlightCurrentPage();
});

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

// Render posts table
function renderPosts(postsToRender) {
  const tableBody = document.getElementById('postsTableBody');
  
  if (postsToRender.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-state">
          <h3>Không tìm thấy bài viết</h3>
          <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </td>
      </tr>
    `;
    return;
  }
  
  tableBody.innerHTML = postsToRender.map(post => `
    <tr class="table-row" data-post-id="${post.id}">
      <td class="table-cell">${post.title}</td>
      <td class="table-cell">${getAuthorName(post.author)}</td>
      <td class="table-cell">${post.date}</td>
      <td class="table-cell">
        <span class="status-badge ${post.status}">
          ${getStatusText(post.status)}
        </span>
        <span class="options-menu" onclick="showPostOptions(event, ${post.id})">...</span>
      </td>
    </tr>
  `).join('');
}

// Get author name by ID
function getAuthorName(authorId) {
  const author = authors.find(a => a.id === authorId);
  return author ? author.name : authorId;
}

// Get status text
function getStatusText(status) {
  const statusMap = {
    published: 'Đã xuất bản',
    draft: 'Bản nháp',
    pending: 'Chờ duyệt'
  };
  return statusMap[status] || status;
}

// Setup event listeners
function setupEventListeners() {
  // Search input
  document.getElementById('postSearchInput').addEventListener('input', function(e) {
    filterPosts();
  });
  
  // Filter select
  document.getElementById('postFilter').addEventListener('change', function() {
    filterPosts();
  });
  
  // Form submission
  document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addNewPost();
  });
}

// Filter posts based on search and filter
function filterPosts() {
  const searchTerm = document.getElementById('postSearchInput').value.toLowerCase();
  const filterValue = document.getElementById('postFilter').value;
  
  let filtered = posts;
  
  // Apply filter
  if (filterValue !== 'all') {
    filtered = filtered.filter(post => post.status === filterValue);
  }
  
  // Apply search
  if (searchTerm) {
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.author.toLowerCase().includes(searchTerm)
    );
  }
  
  renderPosts(filtered);
}

// Show post options menu
function showPostOptions(event, postId) {
  event.stopPropagation();
  
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  
  const options = [
    'Xem chi tiết',
    'Chỉnh sửa',
    post.status === 'published' ? 'Gỡ xuống' : 'Xuất bản',
    'Xóa bài viết'
  ];
  
  // Create context menu
  const existingMenu = document.querySelector('.context-menu');
  if (existingMenu) existingMenu.remove();
  
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
      handlePostAction(option, post);
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

// Handle post actions
function handlePostAction(action, post) {
  switch(action) {
    case 'Xem chi tiết':
      viewPostDetails(post);
      break;
    case 'Chỉnh sửa':
      editPost(post);
      break;
    case 'Xuất bản':
    case 'Gỡ xuống':
      togglePostStatus(post);
      break;
    case 'Xóa bài viết':
      deletePost(post);
      break;
  }
}

// View post details
function viewPostDetails(post) {
  alert(`Xem chi tiết bài viết: ${post.title}\nTác giả: ${getAuthorName(post.author)}\nNgày đăng: ${post.date}\nTrạng thái: ${getStatusText(post.status)}`);
}

// Edit post
function editPost(post) {
  alert(`Chỉnh sửa bài viết: ${post.title}`);
  // In a real app, this would open the edit modal with the post data
}

// Toggle post status
function togglePostStatus(post) {
  const newStatus = post.status === 'published' ? 'draft' : 'published';
  post.status = newStatus;
  renderPosts(posts);
  showNotification(`Đã cập nhật trạng thái bài viết "${post.title}" thành "${getStatusText(newStatus)}"`, 'success');
}

// Delete post
function deletePost(post) {
  if (confirm(`Bạn có chắc chắn muốn xóa bài viết "${post.title}"?`)) {
    const index = posts.findIndex(p => p.id === post.id);
    if (index > -1) {
      posts.splice(index, 1);
      renderPosts(posts);
      showNotification(`Đã xóa bài viết "${post.title}"`, 'success');
    }
  }
}

// Show add post modal
function showAddPostModal() {
  const modal = document.getElementById('addPostModal');
  const authorSelect = document.getElementById('postAuthor');
  
  // Populate authors dropdown
  authorSelect.innerHTML = authors.map(author => 
    `<option value="${author.id}">${author.name}</option>`
  ).join('');
  
  // Reset form
  document.getElementById('postForm').reset();
  
  // Show modal
  modal.style.display = 'block';
}

// Close modal
function closeModal() {
  document.getElementById('addPostModal').style.display = 'none';
}

// Add new post
function addNewPost() {
  const title = document.getElementById('postTitle').value;
  const author = document.getElementById('postAuthor').value;
  const content = document.getElementById('postContent').value;
  const status = document.getElementById('postStatus').value;
  
  const newPost = {
    id: posts.length + 1,
    title,
    author,
    date: new Date().toLocaleDateString('vi-VN'),
    status,
    content
  };
  
  posts.unshift(newPost);
  renderPosts(posts);
  closeModal();
  showNotification(`Đã thêm bài viết mới "${title}"`, 'success');
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