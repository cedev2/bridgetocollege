<?php
// backend/admin/get_messages.php
require_once '../db.php';

$user = check_auth();
if ($user['role'] !== 'admin') {
    json_response(['error' => 'Unauthorized'], 403);
}

try {
    $stmt = $pdo->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
    $messages = $stmt->fetchAll();
    
    json_response(['messages' => $messages]);
} catch (PDOException $e) {
    json_response(['error' => 'Database error: ' . $e->getMessage()], 500);
}
?>
