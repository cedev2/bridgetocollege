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
            $stmt = $pdo->query("SELECT id, full_name, email, role, profile_picture, created_at FROM users ORDER BY created_at DESC");
            $users = $stmt->fetchAll();
            json_response(['users' => $users]);
        } catch (Exception $e) {
            json_response(['error' => $e->getMessage()], 500);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['id'])) {
            json_response(['error' => 'User ID is required'], 400);
        }

        // Prevent admin from deleting themselves
        if ($data['id'] == $userData['id']) {
            json_response(['error' => 'You cannot delete yourself'], 403);
        }

        try {
            // Delete associated submissions first to prevent orphans
            $stmtSub = $pdo->prepare("DELETE FROM submissions WHERE user_id = ?");
            $stmtSub->execute([$data['id']]);

            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$data['id']]);
            json_response(['message' => 'User deleted successfully']);
        } catch (Exception $e) {
            json_response(['error' => $e->getMessage()], 500);
        }
        break;

    case 'POST':
        // For updating user role
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['id']) || empty($data['role'])) {
            json_response(['error' => 'User ID and role are required'], 400);
        }

        try {
            $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id = ?");
            $stmt->execute([$data['role'], $data['id']]);
            json_response(['success' => true, 'message' => 'User role updated successfully']);
        } catch (Exception $e) {
            json_response(['error' => $e->getMessage()], 500);
        }
        break;

    default:
        json_response(['error' => 'Method not allowed'], 405);
        break;
}
?>
