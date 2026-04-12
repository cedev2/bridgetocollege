<?php
require_once 'db.php';

// Check Authentication
$auth = check_auth();
$id = $auth['id'];

$full_name = $_POST['full_name'] ?? null;
$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;

if (!$full_name || !$email) {
    json_response(['error' => 'Name and email are required.'], 400);
}

try {
    // Handle Profile Picture Upload
    $profile_picture = null;
    if (isset($_FILES['profile_picture']) && $_FILES['profile_picture']['error'] === UPLOAD_ERR_OK) {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $fileType = mime_content_type($_FILES['profile_picture']['tmp_name']);
        
        if (!in_array($fileType, $allowedTypes)) {
            json_response(['error' => 'Invalid file type. Only JPG, PNG, GIF and WEBP are allowed.'], 400);
        }

        // Validate File Size (max 5MB)
        if ($_FILES['profile_picture']['size'] > 5 * 1024 * 1024) {
            json_response(['error' => 'File size exceeds 5MB limit.'], 400);
        }

        $extension = pathinfo($_FILES['profile_picture']['name'], PATHINFO_EXTENSION);
        $fileName = 'user_' . $id . '_' . time() . '.' . $extension;
        $uploadDir = 'uploads/profiles/';
        $targetPath = $uploadDir . $fileName;
        
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        if (move_uploaded_file($_FILES['profile_picture']['tmp_name'], $targetPath)) {
            // Path to store in DB
            $profile_picture = 'uploads/profiles/' . $fileName;
        } else {
             json_response(['error' => 'Failed to move uploaded file.'], 500);
        }
    }

    // Prepare Update Query
    $query = "UPDATE users SET full_name = ?, email = ?";
    $params = [$full_name, $email];

    if (!empty($password)) {
        $query .= ", password = ?, requires_password_change = FALSE";
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

    // Get updated user data
    $stmt = $pdo->prepare("SELECT id, full_name, email, role, profile_picture, requires_password_change FROM users WHERE id = ?");
    $stmt->execute([$id]);
    $updatedUser = $stmt->fetch();

    json_response([
        'message' => 'Profile updated successfully.',
        'user' => $updatedUser
    ]);

} catch (Exception $e) {
    json_response(['error' => 'Database error: ' . $e->getMessage()], 500);
}
?>
