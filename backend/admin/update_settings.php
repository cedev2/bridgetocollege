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

$id = $auth['id'];
$full_name = $_POST['full_name'] ?? null;
$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;

if (!$full_name || !$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and email are required.']);
    exit;
}

try {
    // Handle Profile Picture Upload
    $profile_picture = null;
    if (isset($_FILES['profile_picture']) && $_FILES['profile_picture']['error'] === UPLOAD_ERR_OK) {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        $fileType = mime_content_type($_FILES['profile_picture']['tmp_name']);
        
        if (!in_array($fileType, $allowedTypes)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid file type. Only JPG, PNG, and GIF are allowed.']);
            exit;
        }

        // Validate File Size (max 5MB)
        if ($_FILES['profile_picture']['size'] > 5 * 1024 * 1024) {
            http_response_code(400);
            echo json_encode(['error' => 'File size exceeds 5MB limit.']);
            exit;
        }

        $extension = pathinfo($_FILES['profile_picture']['name'], PATHINFO_EXTENSION);
        $fileName = 'admin_' . $id . '_' . time() . '.' . $extension;
        $uploadDir = '../uploads/profiles/';
        $targetPath = $uploadDir . $fileName;
        
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        if (move_uploaded_file($_FILES['profile_picture']['tmp_name'], $targetPath)) {
            // Path to store in DB
            $profile_picture = 'http://localhost/brigdetocollege/backend/uploads/profiles/' . $fileName;
        } else {
             http_response_code(500);
             echo json_encode(['error' => 'Failed to move uploaded file.']);
             exit;
        }
    }

    // Prepare Update Query
    $query = "UPDATE users SET full_name = ?, email = ?";
    $params = [$full_name, $email];

    if (!empty($password)) {
        $query .= ", password = ?";
        $params[] = password_hash($password, PASSWORD_BCRYPT);
    }

    if ($profile_picture !== null) {
        $query .= ", profile_picture = ?";
        $params[] = $profile_picture;
    }

    $query .= " WHERE id = ?";
    $params[] = $id;

    $stmt = $pdo->prepare($query);
    $stmt->execute($params);

    // Provide updated data back to client to update local storage
    $auth['full_name'] = $full_name;
    $auth['email'] = $email;
    if ($profile_picture !== null) {
        $auth['profile_picture'] = $profile_picture;
    }

    echo json_encode([
        'message' => 'Settings updated successfully.',
        'user' => $auth
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
