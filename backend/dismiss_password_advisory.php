<?php
require_once 'db.php';

$userData = check_auth();
$userId = $userData['id'];

try {
    $stmt = $pdo->prepare('UPDATE users SET requires_password_change = FALSE WHERE id = ?');
    $stmt->execute([$userId]);
    
    json_response(['success' => true, 'message' => 'Password advisory dismissed.']);
} catch (Exception $e) {
    json_response(['error' => $e->getMessage()], 500);
}
?>
