<?php
require_once 'db.php';

$auth = check_auth();
$userId = $auth['id'];

$stmt = $pdo->prepare('SELECT id, status, created_at FROM submissions WHERE user_id = ?');
$stmt->execute([$userId]);
$submission = $stmt->fetch();

if ($submission) {
    json_response(['submission' => $submission]);
} else {
    json_response(['message' => 'No submission found', 'status' => 'None']);
}
?>
