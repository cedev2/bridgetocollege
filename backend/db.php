<?php
// db.php - Database connection helper
$host = 'localhost';
$dbname = 'bridge_to_college';
$user = 'root'; // Default XAMPP user
$pass = ''; // Default XAMPP password

require_once 'jwt_helper.php';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Global Auth Middleware
function check_auth() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? null;
    $token = null;

    if ($authHeader && preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $token = $matches[1];
    }

    if (!$token) {
        json_response(['error' => 'No token provided'], 401);
    }

    $userData = verify_jwt($token);
    if (!$userData) {
        json_response(['error' => 'Invalid or expired token'], 401);
    }

    return $userData;
}

// Helper for CORS and JSON response
function json_response($data, $code = 200) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json');
    http_response_code($code);
    echo json_encode($data);
    exit;
}

// Handle preflight requests
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit;
}
?>
