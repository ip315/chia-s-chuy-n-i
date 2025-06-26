const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Thêm dòng này để phục vụ file tĩnh trong thư mục uploads/

// Cấu hình multer để lưu file upload vào thư mục uploads/
const upload = multer({ dest: "uploads/" }); // Lưu file vào thư mục uploads

// Lưu bài đăng tạm thời trong RAM
let posts = [];

// API tạo bài đăng (hỗ trợ nhận file ảnh)
app.post("/api/posts", upload.single("image"), (req, res) => {
  const { content, location, feeling } = req.body;
  // Nếu có file, lưu đường dẫn file
  const imageUrl = req.file ? req.file.path : null;
  const post = {
    id: Date.now(),
    content,
    location,
    feeling,
    imageUrl,
    createdAt: new Date().toISOString(),
  };
  posts.unshift(post); // Thêm bài mới lên đầu
  res.json({ success: true, post });
});

// API lấy danh sách bài đăng
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Backend server running at http://127.0.0.1:${PORT}`);
});
