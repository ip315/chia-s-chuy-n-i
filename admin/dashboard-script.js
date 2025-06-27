// Sample data for dashboard
const dashboardData = {
  totalUsers: 1245,
  totalPosts: 876,
  totalComments: 3241,
  recentActivities: [
    {
      type: 'new_user',
      text: 'Người dùng mới "tuananh" đã đăng ký',
      time: '10 phút trước'
    },
    {
      type: 'new_post',
      text: 'Bài viết "Cảnh đẹp Phú Yên" đã được đăng bởi minhquan',
      time: '25 phút trước'
    },
    {
      type: 'comment',
      text: 'Nhật đã bình luận về bài viết "Du lịch biển"',
      time: '1 giờ trước'
    },
    {
      type: 'update',
      text: 'Hệ thống đã được cập nhật phiên bản 2.1.0',
      time: '2 giờ trước'
    }
  ]
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  // Update stats with animation
  animateValue('totalUsers', 0, dashboardData.totalUsers, 1000);
  animateValue('totalPosts', 0, dashboardData.totalPosts, 1000);
  animateValue('totalComments', 0, dashboardData.totalComments, 1000);
  
  // Render recent activities
  renderActivities(dashboardData.recentActivities);
  
  // Highlight current page in navigation
  highlightCurrentPage();
});

// Animate number counting up
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Render activities list
function renderActivities(activities) {
  const activityList = document.getElementById('activityList');
  activityList.innerHTML = activities.map(activity => `
    <div class="activity-item">
      <div class="activity-icon">
        <img src="public/${activity.type}-icon.png" alt="${activity.type}">
      </div>
      <div class="activity-text">${activity.text}</div>
      <div class="activity-time">${activity.time}</div>
    </div>
  `).join('');
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