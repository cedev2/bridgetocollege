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
            $stmt = $pdo->query("SELECT * FROM partners ORDER BY created_at DESC");
            $partners = $stmt->fetchAll();
            json_response(['partners' => $partners]);
        } catch (Exception $e) {
            json_response(['error' => $e->getMessage()], 500);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Handle multipart/form-data
        if (!$data && isset($_POST['name'])) {
            $data = $_POST;
        }

        if (empty($data['name']) || empty($data['category'])) {
            json_response(['error' => 'Name and category are required'], 400);
        }

        $logo_path = $data['logo_path'] ?? null;

        // Handle Logo Upload
        if (!empty($_FILES['logo']['name'])) {
            $target_dir = "../uploads/partners/";
            if (!file_exists($target_dir)) {
                mkdir($target_dir, 0777, true);
            }
            $file_extension = strtolower(pathinfo($_FILES['logo']['name'], PATHINFO_EXTENSION));
            $file_name = uniqid() . '.' . $file_extension;
            $target_file = $target_dir . $file_name;

            if (move_uploaded_file($_FILES['logo']['tmp_name'], $target_file)) {
                $logo_path = "uploads/partners/" . $file_name;
            }
        }

        try {
            if (isset($data['id'])) {
                // Update
                $stmt = $pdo->prepare("UPDATE partners SET name = ?, category = ?, website_url = ?, logo_path = IFNULL(?, logo_path) WHERE id = ?");
                $stmt->execute([$data['name'], $data['category'], $data['website_url'] ?? null, $logo_path, $data['id']]);
                json_response(['message' => 'Partner updated successfully']);
            } else {
                // Insert
                $stmt = $pdo->prepare("INSERT INTO partners (name, category, website_url, logo_path) VALUES (?, ?, ?, ?)");
                $stmt->execute([$data['name'], $data['category'], $data['website_url'] ?? null, $logo_path]);
                json_response(['message' => 'Partner added successfully']);
            }
        } catch (Exception $e) {
            json_response(['error' => $e->getMessage()], 500);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['id'])) {
            json_response(['error' => 'Partner ID is required'], 400);
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM partners WHERE id = ?");
            $stmt->execute([$data['id']]);
            json_response(['message' => 'Partner deleted successfully']);
        } catch (Exception $e) {
            json_response(['error' => $e->getMessage()], 500);
        }
        break;

    default:
        json_response(['error' => 'Method not allowed'], 405);
        break;
}
?>
