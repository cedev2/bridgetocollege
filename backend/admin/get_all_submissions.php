<?php
require_once '../db.php';

// Verify token and check if user is an admin
$auth = check_auth();

if ($auth['role'] !== 'admin') {
    json_response(['error' => 'Access denied. Administrator privileges required.'], 403);
}

try {
    $stmt = $pdo->query('SELECT s.*, u.full_name as applicant_name FROM submissions s JOIN users u ON s.user_id = u.id ORDER BY s.created_at DESC');
    $submissions = $stmt->fetchAll();
    json_response(['success' => true, 'submissions' => $submissions]);
} catch (Exception $e) {
    json_response(['error' => 'Failed to fetch submissions: ' . $e->getMessage()], 500);
}
?>
