<?php
require_once 'backend/db.php';
try {
    $stmt = $pdo->query("SELECT * FROM contact_messages");
    $all = $stmt->fetchAll();
    echo "Total Messages: " . count($all) . "\n";
    foreach($all as $m) {
        echo "ID: {$m['id']}, Name: {$m['full_name']}, Subject: {$m['subject']}\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
