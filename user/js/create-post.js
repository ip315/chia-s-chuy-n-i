// Auto-resize textarea
function adjustTextareaHeight(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";

  // Enable/disable post button
  const postBtn = document.getElementById("postBtn");
  const content = textarea.value.trim();
  const hasImages = document.getElementById("imagePreview").children.length > 0;

  postBtn.disabled = !content && !hasImages;
}

// Toggle privacy menu
function togglePrivacyMenu() {
  const menu = document.getElementById("privacyMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Select privacy option
function selectPrivacy(type) {
  const btn = document.querySelector(".fb-privacy-btn");
  const icons = {
    public:
      '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
    friends:
      '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.996 2.996 0 0 0 17.06 7H16c-.8 0-1.54.37-2.01.99L12 10l-1.99-2.01A2.99 2.99 0 0 0 8 7H6.94c-1.4 0-2.59.93-2.9 2.37L1.5 16H4v6h2v-6h2.5l2.5-3 2.5 3H16v6h4z"/></svg>',
    private:
      '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>',
  };
  const labels = {
    public: "Công khai",
    friends: "Bạn bè",
    private: "Chỉ mình tôi",
  };

  btn.innerHTML = `${icons[type]} ${labels[type]} <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>`;
  document.getElementById("privacyMenu").style.display = "none";
}

// Toggle location input
function toggleLocationInput() {
  const locationInput = document.getElementById("locationInput");
  locationInput.style.display =
    locationInput.style.display === "none" ? "flex" : "none";
  if (locationInput.style.display === "flex") {
    document.getElementById("locationText").focus();
  }
}

// Remove location
function removeLocation() {
  document.getElementById("locationInput").style.display = "none";
  document.getElementById("locationText").value = "";
}

// Toggle feeling/activity
function toggleFeelingActivity() {
  const menu = document.getElementById("feelingMenu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    // Hiển thị menu ở vị trí nút
    const btn = document.querySelector(
      "button[onclick^='toggleFeelingActivity']"
    );
    const rect = btn.getBoundingClientRect();
    menu.style.display = "block";
    menu.style.top = rect.bottom + window.scrollY + 8 + "px";
    menu.style.left = rect.left + window.scrollX + "px";
  }
}

function selectFeeling(icon, text) {
  document.getElementById("feelingIcon").textContent = icon;
  document.getElementById("feelingText").textContent = text;
  document.getElementById("feelingActivity").style.display = "flex";
  document.getElementById("feelingMenu").style.display = "none";
}

function removeFeelingActivity() {
  document.getElementById("feelingActivity").style.display = "none";
}

// Handle file selection
function handleFileSelect(event) {
  const files = event.target.files;
  const preview = document.getElementById("imagePreview");

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function (e) {
      const mediaContainer = document.createElement("div");
      mediaContainer.className = "fb-media-item";

      if (file.type.startsWith("image/")) {
        mediaContainer.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button class="fb-remove-media" onclick="removeMedia(this)">
                            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    `;
      } else if (file.type.startsWith("video/")) {
        mediaContainer.innerHTML = `
                        <video controls>
                            <source src="${e.target.result}" type="${file.type}">
                        </video>
                        <button class="fb-remove-media" onclick="removeMedia(this)">
                            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    `;
      }

      preview.appendChild(mediaContainer);

      // Enable post button if there are images
      const postBtn = document.getElementById("postBtn");
      const content = document.getElementById("postContent").value.trim();
      postBtn.disabled = !content && preview.children.length === 0;
    };

    reader.readAsDataURL(file);
  }
}

// Remove media item
function removeMedia(button) {
  const mediaItem = button.parentElement;
  mediaItem.remove();

  // Check if post button should be disabled
  const postBtn = document.getElementById("postBtn");
  const content = document.getElementById("postContent").value.trim();
  const hasImages = document.getElementById("imagePreview").children.length > 0;
  postBtn.disabled = !content && !hasImages;
}

// Publish post (gửi cả ảnh lên backend)
function publishPost() {
  const content = document.getElementById("postContent").value.trim();
  const location = document.getElementById("locationText").value.trim();
  const hasFeelingActivity =
    document.getElementById("feelingActivity").style.display !== "none";
  const feeling = hasFeelingActivity
    ? document.getElementById("feelingText").textContent
    : "";

  if (!content) {
    alert("Vui lòng nhập nội dung!");
    return;
  }

  const postBtn = document.getElementById("postBtn");
  postBtn.disabled = true;
  postBtn.textContent = "Đang đăng...";

  // Gửi JSON thay vì FormData
  fetch("http://127.0.0.1:3000/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, location, feeling }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Lỗi khi đăng bài");
      return res.json();
    })
    .then(() => {
      window.location.href = "blog.html";
    })
    .catch((err) => {
      alert("Đăng bài thất bại!");
      postBtn.disabled = false;
      postBtn.textContent = "Đăng";
    });
}

// Close privacy menu when clicking outside
document.addEventListener("click", function (event) {
  const privacyMenu = document.getElementById("privacyMenu");
  const privacyBtn = document.querySelector(".fb-privacy-btn");

  if (
    !privacyBtn.contains(event.target) &&
    !privacyMenu.contains(event.target)
  ) {
    privacyMenu.style.display = "none";
  }
});

// Auto-focus on textarea when page loads
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("postContent").focus();
});

// Menu chọn GIF
function toggleGifMenu() {
  const menu = document.getElementById("gifMenu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    // Hiển thị menu ở vị trí nút GIF
    const btn = document.querySelector("button[title='GIF']");
    const rect = btn.getBoundingClientRect();
    menu.style.display = "block";
    menu.style.top = rect.bottom + window.scrollY + 8 + "px";
    menu.style.left = rect.left + window.scrollX + "px";
  }
}
function selectGif(src) {
  const preview = document.getElementById("imagePreview");
  const mediaContainer = document.createElement("div");
  mediaContainer.className = "fb-media-item";
  mediaContainer.innerHTML = `
    <img src="${src}" alt="GIF" style="object-fit:cover; width:100%; height:200px;">
    <button class="fb-remove-media" onclick="removeMedia(this)">
      <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>
  `;
  preview.appendChild(mediaContainer);
  document.getElementById("gifMenu").style.display = "none";
  // Enable post button if needed
  const postBtn = document.getElementById("postBtn");
  const content = document.getElementById("postContent").value.trim();
  postBtn.disabled = !content && preview.children.length === 0;
}
// Đóng menu GIF khi click ngoài
window.addEventListener("click", function (e) {
  const menu = document.getElementById("gifMenu");
  const btn = document.querySelector("button[title='GIF']");
  if (
    menu &&
    menu.style.display === "block" &&
    !menu.contains(e.target) &&
    e.target !== btn
  ) {
    menu.style.display = "none";
  }
});
// Đóng menu GIF khi click ngoài
window.addEventListener("click", function (e) {
  const menu = document.getElementById("gifMenu");
  const btn = document.querySelector("button[title='GIF']");
  if (
    menu &&
    menu.style.display === "block" &&
    !menu.contains(e.target) &&
    e.target !== btn
  ) {
    menu.style.display = "none";
  }
});
