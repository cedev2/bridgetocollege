<?php
// backend/admin/delete_message.php
require_once '../db.php';

$user = check_auth();
if ($user['role'] !== 'admin') {
    json_response(['error' => 'Unauthorized'], 403);
}

$data = json_decode(file_get_contents('php://input'), true);
$message_id = $data['id'] ?? null;

if (!$message_id) {
    json_response(['error' => 'Missing message ID'], 400);
}

try {
    $stmt = $pdo->prepare("DELETE FROM contact_messages WHERE id = ?");
    $stmt->execute([$message_id]);
    
    json_response(['success' => true]);
} catch (PDOException $e) {
    json_response(['error' => 'Database error: ' . $e->getMessage()], 500);
}
?>
