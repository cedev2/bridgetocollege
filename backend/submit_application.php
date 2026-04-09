<?php
require_once 'db.php';

$auth = check_auth();
$userId = $auth['id'];

$data = json_decode(file_get_contents('php://input'), true);

// Single submission restriction removed by Admin request

$columns = [
    'user_id', 'full_name', 'email', 'phone', 'contact_method', 
    'applicant_type', 'application_timing', 'major_highschool', 'gpa', 
    'target_countries', 'interested_universities', 'package', 
    'started_application', 'intended_field', 'start_year', 'goals', 
    'has_transcripts'
];

$placeholders = array_fill(0, count($columns), '?');
$sql = 'INSERT INTO submissions (' . implode(', ', $columns) . ') VALUES (' . implode(', ', $placeholders) . ')';

try {
    $stmt = $pdo->prepare($sql);
    $values = [
        $userId,
        $data['full_name'] ?? '',
        $data['email'] ?? '',
        $data['phone'] ?? '',
        $data['contact_method'] ?? '',
        $data['applicant_type'] ?? '',
        $data['application_timing'] ?? '',
        $data['major_highschool'] ?? '',
        $data['gpa'] ?? '',
        $data['target_countries'] ?? '',
        $data['interested_universities'] ?? '',
        $data['package'] ?? '',
        $data['started_application'] ?? 'No',
        $data['intended_field'] ?? '',
        $data['start_year'] ?? '',
        $data['goals'] ?? '',
        $data['has_transcripts'] ?? 'No'
    ];
    $stmt->execute($values);
    json_response(['message' => 'Application submitted successfully!']);
} catch (Exception $e) {
    json_response(['error' => 'Submission failed: ' . $e->getMessage()], 500);
}
?>
