<?php
require_once 'db.php';

// CORS Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM staff ORDER BY created_at DESC");
    $staff = $stmt->fetchAll();

    echo json_encode([
        'success' => true,
        'staff' => $staff
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
