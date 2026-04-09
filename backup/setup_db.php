<?php
$host = 'localhost';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS bridge_to_college");
    $pdo->exec("USE bridge_to_college");
    
    // Create tables
    $sql = file_get_contents('../db/bridge_to_college.sql');
    $pdo->exec($sql);
    
    echo "Database and Tables setup successfully!";
} catch (PDOException $e) {
    die("Setup failed: " . $e->getMessage());
}
?>
