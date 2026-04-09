<?php
require_once '../db.php';

// Verify token and check if user is an admin
$auth = check_auth();

if ($auth['role'] !== 'admin') {
    json_response(['error' => 'Access denied.'], 403);
}

// Get data from JSON body
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;
$status = $data['status'] ?? null;

if (!$id || !$status) {
    json_response(['error' => 'Missing submission ID or status.'], 400);
}

try {
    $stmt = $pdo->prepare('UPDATE submissions SET status = ? WHERE id = ?');
    $stmt->execute([$status, $id]);
    json_response(['success' => true, 'message' => 'Status updated successfully!']);
} catch (Exception $e) {
    json_response(['error' => 'Update failed: ' . $e->getMessage()], 500);
}
?>
