<?php
require_once '../db.php';

// Verify token and check if user is an admin
$auth = check_auth();

if ($auth['role'] !== 'admin') {
    json_response(['error' => 'Access denied. Administrator privileges required.'], 403);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['full_name']) || empty($data['email'])) {
    json_response(['error' => 'Missing required fields (Name or Email)'], 400);
}

try {
    $pdo->beginTransaction();

    // 1. Check if user exists, if not create one
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch();

    if ($user) {
        $userId = $user['id'];
        
        // Prevent duplicate application
        $checkSub = $pdo->prepare('SELECT id FROM submissions WHERE user_id = ?');
        $checkSub->execute([$userId]);
        if ($checkSub->fetch()) {
            json_response(['error' => 'This user already has an active application.'], 400);
        }
    } else {
        // Create new user with a default password and require change
        $defaultPassword = password_hash('password123', PASSWORD_BCRYPT);
        $stmt = $pdo->prepare('INSERT INTO users (full_name, email, password, requires_password_change) VALUES (?, ?, ?, TRUE)');
        $stmt->execute([$data['full_name'], $data['email'], $defaultPassword]);
        $userId = $pdo->lastInsertId();
    }

    // 2. Create the submission with all provided data
    $columns = [
        'user_id', 'full_name', 'email', 'phone', 'contact_method', 
        'applicant_type', 'application_timing', 'major_highschool', 'gpa', 
        'target_countries', 'interested_universities', 'package', 
        'started_application', 'intended_field', 'start_year', 'goals', 
        'has_transcripts', 'status'
    ];

    $placeholders = array_fill(0, count($columns), '?');
    $sql = 'INSERT INTO submissions (' . implode(', ', $columns) . ') VALUES (' . implode(', ', $placeholders) . ')';

    $stmt = $pdo->prepare($sql);
    $values = [
        $userId,
        $data['full_name'],
        $data['email'],
        $data['phone'] ?? '',
        $data['contact_method'] ?? 'Email',
        $data['applicant_type'] ?? 'High school graduate (first-year/freshman) applicant',
        $data['application_timing'] ?? 'Regular decision applicant',
        $data['major_highschool'] ?? '',
        $data['gpa'] ?? '',
        $data['target_countries'] ?? 'United States',
        $data['interested_universities'] ?? '', // Admin can provide comma-separated string
        $data['package'] ?? 'Essential',
        $data['started_application'] ?? 'No',
        $data['intended_field'] ?? '',
        $data['start_year'] ?? date('Y'),
        $data['goals'] ?? 'Manually registered by Admin',
        $data['has_transcripts'] ?? 'No',
        'Pending'
    ];

    $stmt->execute($values);
    $pdo->commit();

    json_response(['success' => true, 'message' => 'Student registration and application complete!']);
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    json_response(['error' => 'Full registration failed: ' . $e->getMessage()], 500);
}
?>
