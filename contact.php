<?php
$host = 'localhost';
$dbname = 'ussama_portfolio';
$username = 'root'; // اسم المستخدم الخاص بقاعدة البيانات لديك
$password = '';     // كلمة المرور

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    // ضبط وضع الأخطاء في PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e.getMessage());
}
?>