
-- Tạo CSDL TravelShare
CREATE DATABASE IF NOT EXISTS travelshare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE travelshare;

-- Bảng người dùng
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bảng bài viết
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    content TEXT,
    image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng bình luận
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng lượt thích
CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng thông báo
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- View thống kê bài viết theo ngày
CREATE VIEW post_statistics_by_date AS
SELECT DATE(created_at) AS post_date, COUNT(*) AS total_posts
FROM posts
GROUP BY DATE(created_at);

-- Dữ liệu mẫu người dùng
INSERT INTO users (username, email, password, role) VALUES
('admin1', 'admin@example.com', 'hashedpassword1', 'admin'),
('user1', 'user1@example.com', 'hashedpassword2', 'user'),
('user2', 'user2@example.com', 'hashedpassword3', 'user');

-- Dữ liệu mẫu bài viết
INSERT INTO posts (user_id, title, address, content, image_url) VALUES
(2, 'Chuyến đi Đà Lạt', 'Đà Lạt, Lâm Đồng', 'Không khí trong lành và hoa đẹp.', 'dalat.jpg'),
(3, 'Khám phá Hội An', 'Hội An, Quảng Nam', 'Phố cổ tuyệt vời và đồ ăn ngon.', 'hoian.jpg');

-- Dữ liệu mẫu bình luận
INSERT INTO comments (post_id, user_id, content) VALUES
(1, 3, 'Mình cũng mới đi Đà Lạt, tuyệt vời thật!'),
(2, 2, 'Hội An rất chill, mình mê quá.');

-- Dữ liệu mẫu lượt thích
INSERT INTO likes (post_id, user_id) VALUES
(1, 3),
(2, 2);

-- Dữ liệu mẫu thông báo
INSERT INTO notifications (user_id, message) VALUES
(2, 'Bài viết của bạn đã được duyệt.'),
(3, 'Có người bình luận bài viết của bạn.');
