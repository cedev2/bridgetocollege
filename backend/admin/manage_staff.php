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
            $stmt = $pdo->query("SELECT * FROM staff ORDER BY created_at DESC");
            $staff = $stmt->fetchAll();
            json_response(['staff' => $staff]);
        } catch (Exception $e) {
            json_response(['error' => $e->getMessage()], 500);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        // If data is empty, check for multipart/form-data (photo upload)
        if (!$data && isset($_POST['full_name'])) {
            $data = $_POST;
        }

        if (empty($data['full_name']) || empty($data['role'])) {
            json_response(['error' => 'Full name and role are required'], 400);
        }

        $image_path = $data['image_path'] ?? null;

        // Handle Image Upload
        if (!empty($_FILES['photo']['name'])) {
            $target_dir = "../uploads/team/";
            if (!file_exists($target_dir)) {
                mkdir($target_dir, 0777, true);
            }
            $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            $fileType = mime_content_type($_FILES['photo']['tmp_name']);
            if (!in_array($fileType, $allowedTypes)) {
                json_response(['error' => 'Invalid file type. Only JPG, PNG, GIF, and WEBP are allowed.'], 400);
            }

            $file_extension = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
            // Additional security check to prevent double extensions or bypassing mime checks
            if (!in_array($file_extension, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                json_response(['error' => 'Invalid file extension.'], 400);
            }

            $file_name = uniqid() . '.' . $file_extension;
            $target_file = $target_dir . $file_name;

            if (move_uploaded_file($_FILES['photo']['tmp_name'], $target_file)) {
                $image_path = "uploads/team/" . $file_name;
            }
        }

        try {
            if (isset($data['id'])) {
                // Update
                $stmt = $pdo->prepare("UPDATE staff SET full_name = ?, role = ?, description = ?, phone = ?, tags = ?, image_path = IFNULL(?, image_path) WHERE id = ?");
                $stmt->execute([$data['full_name'], $data['role'], $data['description'], $data['phone'], $data['tags'], $image_path, $data['id']]);
                json_response(['message' => 'Staff member updated successfully']);
            } else {
                // Insert
                $stmt = $pdo->prepare("INSERT INTO staff (full_name, role, description, phone, tags, image_path) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([$data['full_name'], $data['role'], $data['description'], $data['phone'], $data['tags'], $image_path]);
                json_response(['message' => 'Staff member added successfully']);
            }
        } catch (Exception $e) {
            json_response(['error' => $e->getMessage()], 500);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['id'])) {
            json_response(['error' => 'Staff ID is required'], 400);
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM staff WHERE id = ?");
            $stmt->execute([$data['id']]);
            json_response(['message' => 'Staff member deleted successfully']);
        } catch (Exception $e) {
            json_response(['error' => $e->getMessage()], 500);
        }
        break;

    default:
        json_response(['error' => 'Method not allowed'], 405);
        break;
}
?>
