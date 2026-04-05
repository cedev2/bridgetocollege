<?php
require_once '../db.php';

$userData = check_auth();
if ($userData['role'] !== 'admin') {
    json_response(['error' => 'Unauthorized access'], 403);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM site_stats ORDER BY id ASC");
            $stats = $stmt->fetchAll();
            json_response(['stats' => $stats]);
        } catch (Exception $e) {
            json_response(['error' => $e->getMessage()], 500);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['id']) || empty($data['label']) || empty($data['value'])) {
            json_response(['error' => 'ID, label, and value are required'], 400);
        }

        try {
            $stmt = $pdo->prepare("UPDATE site_stats SET label = ?, value = ?, icon = ? WHERE id = ?");
            $stmt->execute([$data['label'], $data['value'], $data['icon'] ?? 'Users', $data['id']]);
            json_response(['message' => 'Statistic updated successfully']);
        } catch (Exception $e) {
            json_response(['error' => $e->getMessage()], 500);
        }
        break;

    default:
        json_response(['error' => 'Method not allowed'], 405);
        break;
}
?>
