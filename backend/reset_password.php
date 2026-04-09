<?php
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['email']) || empty($data['code']) || empty($data['new_password'])) {
    json_response(['error' => 'Missing required fields.'], 400);
}

try {
    // 1. Verify code and expiration
    $stmt = $pdo->prepare('SELECT id, reset_code_expires FROM users WHERE email = ? AND reset_code = ?');
    $stmt->execute([$data['email'], $data['code']]);
    $user = $stmt->fetch();

    if (!$user) {
        json_response(['error' => 'Invalid or incorrect reset code.'], 400);
    }

    $expires = strtotime($user['reset_code_expires']);
    if (time() > $expires) {
        json_response(['error' => 'This reset code has expired. Please request a new one.'], 400);
    }

    // 2. Hash new password
    if (strlen($data['new_password']) < 8) {
        json_response(['error' => 'Password must be at least 8 characters long.'], 400);
    }
    $hashed_password = password_hash($data['new_password'], PASSWORD_BCRYPT);

    // 3. Update password and clear reset code
    $update = $pdo->prepare('UPDATE users SET password = ?, reset_code = NULL, reset_code_expires = NULL, requires_password_change = FALSE WHERE id = ?');
    $update->execute([$hashed_password, $user['id']]);

    json_response(['success' => true, 'message' => 'Password has been reset successfully. You can now log in.']);

} catch (Exception $e) {
    json_response(['error' => 'A server error occurred: ' . $e->getMessage()], 500);
}
?>
