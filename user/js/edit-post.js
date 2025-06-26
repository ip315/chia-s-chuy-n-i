// Hiển thị ảnh preview khi chọn file mới
const editImageInput = document.getElementById("edit-image");
editImageInput.addEventListener("change", function (e) {
  const preview = document.querySelector(".image-preview");
  preview.innerHTML = "";
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = function (ev) {
      const img = document.createElement("img");
      img.src = ev.target.result;
      img.className = "preview-image";
      preview.appendChild(img);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});

// Gửi form bằng JavaScript (chuẩn bị FormData)
document
  .getElementById("editPostForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    // TODO: Gửi formData lên backend bằng fetch (cần backend hỗ trợ upload file)
    alert(
      "Đã chuẩn bị dữ liệu gửi lên backend (cần backend hỗ trợ upload file)"
    );
    // Ví dụ gửi:
    // fetch('http://127.0.0.1:3000/api/posts/ID', { method: 'PUT', body: formData })
    //   .then(res => res.json()).then(...)
  });
