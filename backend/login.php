<?php
require_once 'db.php';


$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['email']) || empty($data['password'])) {
    json_response(['error' => 'Missing email or password'], 400);
}

// Find user
$stmt = $pdo->prepare('SELECT id, full_name, email, password, role, profile_picture, requires_password_change FROM users WHERE email = ?');
$stmt->execute([$data['email']]);
$user = $stmt->fetch();

if ($user && password_verify($data['password'], $user['password'])) {
    unset($user['password']);
    
    // Generate Token
    $token = generate_jwt([
        'id' => $user['id'],
        'email' => $user['email'],
        'role' => $user['role']
    ]);

    log_action($user['id'], 'Login', 'User ' . $user['email'] . ' logged in.');

    json_response([
        'message' => 'Login successful', 
        'user' => $user,
        'token' => $token
    ]);
} else {
    json_response(['error' => 'Invalid email or password'], 401);
}
?>
