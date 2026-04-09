<?php
require_once 'db.php';

$user = check_auth();

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['new_password'])) {
    json_response(['error' => 'New password is required.'], 400);
}

try {
    $hashed_password = password_hash($data['new_password'], PASSWORD_BCRYPT);
    
    $stmt = $pdo->prepare('UPDATE users SET password = ?, requires_password_change = FALSE WHERE id = ?');
    $stmt->execute([$hashed_password, $user['id']]);
    
    json_response(['success' => true, 'message' => 'Password updated successfully.']);
} catch (Exception $e) {
    json_response(['error' => 'Failed to update password: ' . $e->getMessage()], 500);
}
?>
