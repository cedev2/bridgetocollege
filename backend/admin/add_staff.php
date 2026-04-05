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

$full_name = $_POST['full_name'] ?? null;
$role = $_POST['role'] ?? null;
$description = $_POST['description'] ?? '';
$phone = $_POST['phone'] ?? '';
$tags = $_POST['tags'] ?? ''; // Expecting comma-separated string

if (!$full_name || !$role) {
    http_response_code(400);
    echo json_encode(['error' => 'Full name and role are required.']);
    exit;
}

try {
    $image_path = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $fileType = mime_content_type($_FILES['image']['tmp_name']);
        
        if (!in_array($fileType, $allowedTypes)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid file type. Only JPG, PNG, WEBP, and GIF are allowed.']);
            exit;
        }

        if ($_FILES['image']['size'] > 5 * 1024 * 1024) {
            http_response_code(400);
            echo json_encode(['error' => 'File size exceeds 5MB limit.']);
            exit;
        }

        $extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $fileName = 'staff_' . time() . '_' . uniqid() . '.' . $extension;
        $uploadDir = '../uploads/staff/';
        
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $targetPath = $uploadDir . $fileName;
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            $image_path = 'http://localhost/brigdetocollege/backend/uploads/staff/' . $fileName;
        } else {
             http_response_code(500);
             echo json_encode(['error' => 'Failed to move uploaded file.']);
             exit;
        }
    }

    $stmt = $pdo->prepare("INSERT INTO staff (full_name, role, description, phone, tags, image_path) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$full_name, $role, $description, $phone, $tags, $image_path]);

    echo json_encode([
        'success' => true,
        'message' => 'Staff member added successfully.'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
