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
        
        // Handle multipart/form-data
        if (!$data && isset($_POST['name'])) {
            $data = $_POST;
        }

        $id = $data['id'] ?? null;
        $name = $data['name'] ?? '';
        $logo_path = $data['logo_path'] ?? '';

        if (empty($name)) {
            json_response(['error' => 'Name is required'], 400);
        }

        // Handle Logo Upload
        if (!empty($_FILES['logo']['name'])) {
            $target_dir = "../uploads/universities/";
            if (!file_exists($target_dir)) {
                mkdir($target_dir, 0777, true);
            }
            $file_extension = strtolower(pathinfo($_FILES['logo']['name'], PATHINFO_EXTENSION));
            $file_name = uniqid() . '.' . $file_extension;
            $target_file = $target_dir . $file_name;

            if (move_uploaded_file($_FILES['logo']['tmp_name'], $target_file)) {
                $logo_path = "uploads/universities/" . $file_name;
            }
        }

        try {
            if ($id) {
                // Update
                $stmt = $pdo->prepare("UPDATE universities SET name=?, logo_path=IFNULL(?, logo_path) WHERE id=?");
                $stmt->execute([$name, $logo_path, $id]);
                json_response(['message' => 'University updated successfully']);
            } else {
                // Create
                $stmt = $pdo->prepare("INSERT INTO universities (name, logo_path) VALUES (?, ?)");
                $stmt->execute([$name, $logo_path]);
                json_response(['message' => 'University created successfully', 'id' => $pdo->lastInsertId()]);
            }
        } catch (Exception $e) {
            json_response(['error' => $e->getMessage()], 500);
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
