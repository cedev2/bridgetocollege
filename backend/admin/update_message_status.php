<?php
// backend/admin/update_message_status.php
require_once '../db.php';

$user = check_auth();
if ($user['role'] !== 'admin') {
    json_response(['error' => 'Unauthorized'], 403);
}

$data = json_decode(file_get_contents('php://input'), true);
$message_id = $data['id'] ?? null;
$status = $data['status'] ?? null;

if (!$message_id || !$status) {
    json_response(['error' => 'Missing message ID or status'], 400);
}

try {
    $stmt = $pdo->prepare("UPDATE contact_messages SET status = ? WHERE id = ?");
    $stmt->execute([$status, $message_id]);
    
    json_response(['success' => true]);
} catch (PDOException $e) {
    json_response(['error' => 'Database error: ' . $e->getMessage()], 500);
}
?>
