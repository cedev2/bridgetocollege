<?php
require_once 'backend/db.php';
try {
    $pdo->exec('ALTER TABLE users ADD COLUMN reset_code VARCHAR(10) NULL');
    $pdo->exec('ALTER TABLE users ADD COLUMN reset_code_expires DATETIME NULL');
    echo 'Added reset code columns.';
} catch (Exception $e) {
    if (strpos($e->getMessage(), 'Duplicate column name') !== false) {
        echo 'Columns already exist.';
    } else {
        echo 'Error: '. $e->getMessage();
    }
}
?>
