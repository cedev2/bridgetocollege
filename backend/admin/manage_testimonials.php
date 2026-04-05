<?php
require_once '../db.php';

$userData = check_auth();
if ($userData['role'] !== 'admin') {
    json_response(['error' => 'Unauthorized access'], 403);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Fetch all testimonials
        $stmt = $pdo->query("SELECT * FROM testimonials");
        json_response(['testimonials' => $stmt->fetchAll()]);
        break;

    case 'POST':
        // Create or Update testimonial
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'] ?? null;
        $name = $data['name'] ?? '';
        $location = $data['location'] ?? '';
        $university = $data['university'] ?? '';
        $content = $data['content'] ?? '';
        $rating = $data['rating'] ?? 5;
        $year = $data['year'] ?? '';
        $is_featured = $data['is_featured'] ?? 0;
        $image_path = $data['image_path'] ?? '';

        if (empty($name) || empty($content)) {
            json_response(['error' => 'Name and content are required'], 400);
        }

        if ($id) {
            // Update
            $stmt = $pdo->prepare("UPDATE testimonials SET name=?, location=?, university=?, content=?, rating=?, year=?, is_featured=?, image_path=? WHERE id=?");
            $stmt->execute([$name, $location, $university, $content, $rating, $year, $is_featured, $image_path, $id]);
            json_response(['message' => 'Testimonial updated successfully']);
        } else {
            // Create
            $stmt = $pdo->prepare("INSERT INTO testimonials (name, location, university, content, rating, year, is_featured, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $location, $university, $content, $rating, $year, $is_featured, $image_path]);
            json_response(['message' => 'Testimonial created successfully', 'id' => $pdo->lastInsertId()]);
        }
        break;

    case 'DELETE':
        // Delete testimonial
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'] ?? null;
        if (!$id) {
            json_response(['error' => 'ID is required'], 400);
        }
        $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id=?");
        $stmt->execute([$id]);
        json_response(['message' => 'Testimonial deleted successfully']);
        break;

    default:
        json_response(['error' => 'Method not allowed'], 405);
}
?>
