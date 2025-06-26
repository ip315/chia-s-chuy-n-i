function handleLogout(e) {
  if (e) e.preventDefault();
  var modal = document.getElementById("logoutModal");
  if (modal) modal.style.display = "flex";
}
function closeLogoutModal() {
  var modal = document.getElementById("logoutModal");
  if (modal) modal.style.display = "none";
}
function confirmLogout() {
  window.location.href = "login.html";
}
window.handleLogout = handleLogout;
window.closeLogoutModal = closeLogoutModal;
window.confirmLogout = confirmLogout;
window.confirmLogout = confirmLogout;
