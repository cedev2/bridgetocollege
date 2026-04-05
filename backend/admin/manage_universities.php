<?php
require_once '../db.php';

$userData = check_auth();
if ($userData['role'] !== 'admin') {
    json_response(['error' => 'Unauthorized access'], 403);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Fetch all universities
        $stmt = $pdo->query("SELECT * FROM universities");
        json_response(['universities' => $stmt->fetchAll()]);
        break;

    case 'POST':
        // Create or Update university
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'] ?? null;
        $name = $data['name'] ?? '';
        $logo_path = $data['logo_path'] ?? '';

        if (empty($name)) {
            json_response(['error' => 'Name is required'], 400);
        }

        if ($id) {
            // Update
            $stmt = $pdo->prepare("UPDATE universities SET name=?, logo_path=? WHERE id=?");
            $stmt->execute([$name, $logo_path, $id]);
            json_response(['message' => 'University updated successfully']);
        } else {
            // Create
            $stmt = $pdo->prepare("INSERT INTO universities (name, logo_path) VALUES (?, ?)");
            $stmt->execute([$name, $logo_path]);
            json_response(['message' => 'University created successfully', 'id' => $pdo->lastInsertId()]);
        }
        break;

    case 'DELETE':
        // Delete university
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'] ?? null;
        if (!$id) {
            json_response(['error' => 'ID is required'], 400);
        }
        $stmt = $pdo->prepare("DELETE FROM universities WHERE id=?");
        $stmt->execute([$id]);
        json_response(['message' => 'University deleted successfully']);
        break;

    default:
        json_response(['error' => 'Method not allowed'], 405);
}
?>
