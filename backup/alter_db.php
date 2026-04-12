<?php
require_once 'backend/db.php';
try {
    $pdo->exec('ALTER TABLE users ADD COLUMN requires_password_change BOOLEAN DEFAULT FALSE');
    echo 'Added column requires_password_change.';
} catch (Exception $e) {
    if (strpos($e->getMessage(), 'Duplicate column name') !== false) {
        echo 'Column already exists.';
    } else {
        echo 'Error: '. $e->getMessage();
    }
}
?>
