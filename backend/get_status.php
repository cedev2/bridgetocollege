<?php
require_once 'db.php';

$auth = check_auth();
$userId = $auth['id'];

$stmt = $pdo->prepare('SELECT id, status, created_at FROM submissions WHERE user_id = ? ORDER BY created_at DESC');
$stmt->execute([$userId]);
$submissions = $stmt->fetchAll();

if (count($submissions) > 0) {
    json_response(['submissions' => $submissions]);
} else {
    json_response(['message' => 'No submission found', 'status' => 'None', 'submissions' => []]);
}
?>
