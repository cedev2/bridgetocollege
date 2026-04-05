<?php
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['full_name']) || empty($data['email']) || empty($data['password'])) {
    json_response(['error' => 'Missing required fields'], 400);
}

// Check for existing user
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$data['email']]);
if ($stmt->fetch()) {
    json_response(['error' => 'Email already registered'], 409);
}

// Create new user
$hashed_password = password_hash($data['password'], PASSWORD_BCRYPT);
try {
    $stmt = $pdo->prepare('INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)');
    $stmt->execute([$data['full_name'], $data['email'], $hashed_password]);
    $user_id = $pdo->lastInsertId();
    json_response(['message' => 'User registered successfully', 'user_id' => $user_id]);
} catch (Exception $e) {
    json_response(['error' => 'Database error: ' . $e->getMessage()], 500);
}
?>
