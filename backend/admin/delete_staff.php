<?php
require_once '../db.php';

// CORS Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Check Authentication
$auth = check_auth();
if ($auth['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Access denied. Administrator privileges required.']);
    exit;
}

$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'ID is required.']);
    exit;
}

try {
    // Delete from staff table
    $stmt = $pdo->prepare("DELETE FROM staff WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode([
        'success' => true,
        'message' => 'Staff member deleted successfully.'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
