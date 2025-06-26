// Lấy bài đăng từ backend và render ra giao diện
function renderPosts(posts) {
  const grid = document.getElementById("postsGrid");
  if (!grid) return;
  if (!posts.length) {
    grid.innerHTML = "<p>Chưa có bài đăng nào.</p>";
    return;
  }
  grid.innerHTML = posts
    .map(
      (post) => `
    <div class="post-item">
      <img src="${
        post.imageUrl
          ? "http://127.0.0.1:3000/" + post.imageUrl.replace(/\\/g, "/")
          : "images/image-75.png"
      }" alt="avatar" style="width:100px;height:100px;border-radius:8px;margin-bottom:8px;object-fit:cover;" />
      <h3>${post.content ? post.content : "(Không có tiêu đề)"}</h3>
      ${post.location ? `<p>Địa điểm: ${post.location}</p>` : ""}
      ${post.feeling ? `<p>${post.feeling}</p>` : ""}
      <small>${new Date(post.createdAt).toLocaleString("vi-VN")}</small>
    </div>
  `
    )
    .join("");
}

fetch("http://127.0.0.1:3000/api/posts")
  .then((res) => res.json())
  .then(renderPosts)
  .catch(() => {
    document.getElementById("postsGrid").innerHTML = "<p>Lỗi tải bài đăng!</p>";
  });
