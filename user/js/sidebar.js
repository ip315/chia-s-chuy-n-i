fetch("sidebar.html")
  .then((res) => {
    if (!res.ok) throw new Error("Sidebar fetch failed");
    return res.text();
  })
  .then((html) => {
    document.getElementById("sidebar-container").innerHTML = html;
    var path = window.location.pathname.split("/").pop();
    var items = document.querySelectorAll(".sidebar-nav .nav-item");
    items.forEach(function (item) {
      var href = item.getAttribute("href");
      if (href && path && href === path) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
    var sidebar = document.getElementById("sidebar");
    var toggleBtn = document.getElementById("sidebar-toggle");
    if (sidebar && toggleBtn) {
      toggleBtn.onclick = function () {
        sidebar.classList.toggle("active");
      };
    }
    // Đảm bảo js/logout.js được load sau khi sidebar render
    var script = document.createElement("script");
    script.src = "js/logout.js";
    document.body.appendChild(script);
  })
  .catch((err) => {
    // Fallback: show a message if sidebar cannot be loaded
    document.getElementById("sidebar-container").innerHTML =
      "<div style='padding:16px;color:red;'>Không thể tải sidebar. Hãy chạy trang web qua máy chủ (http://127.0.0.1:3000) thay vì mở file trực tiếp.</div>";
    // Optionally log error for debugging
    console.error("Sidebar load error:", err);
  });
