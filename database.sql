- 1. إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS ussama_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. اختيار قاعدة البيانات للعمل عليها
USE ussama_portfolio;

-- 3. جدول رسائل الزوار (Contact Messages)
-- يُستخدم لحفظ الرسائل التي يرسلها لك الأشخاص من نموذج التواصل في الموقع
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. جدول المشاريع (Featured Projects -اختياري إذا أردت إدارتها لاحقاً عبر لوحة تحكم-)
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    technologies VARCHAR(250) NOT NULL,
    github_link VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدخال مشروع تجريبي أولي في الجدول
INSERT INTO projects (title, description, technologies, github_link) VALUES 
('Full-Stack Web App', 'Modern responsive web application built with HTML5, CSS3, JavaScript, and PHP/MySQL backend architecture.', 'PHP, MySQL, JavaScript', 'https://github.com/oussama2026dev'),
('Network & System Tools', 'Custom Python & Linux scripting project designed for automated network testing and system monitoring tasks.', 'Python, Linux, Networking', 'https://github.com/oussama2026dev');