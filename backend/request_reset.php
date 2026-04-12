<?php
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['email'])) {
    json_response(['error' => 'Email address is required.'], 400);
}

try {
    // 1. Verify user exists — fetch role too for security check
    $stmt = $pdo->prepare('SELECT id, full_name, role FROM users WHERE email = ?');
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch();

    if (!$user) {
        // Log the search attempt for debugging
        file_put_contents('mail_log.txt', date('[Y-m-d H:i:s] ') . "ATTEMPT: Reset requested for UNKNOWN email: " . $data['email'] . "\n", FILE_APPEND);
        json_response(['success' => true, 'message' => 'If your email is registered, a reset code has been sent.']);
    }

    // 2. SECURITY: Block admin accounts from using the public reset form
    // Admins must reset passwords via PHPMyAdmin or the internal admin panel only.
    if ($user['role'] === 'admin') {
        file_put_contents('mail_log.txt', date('[Y-m-d H:i:s] ') . "BLOCKED: Admin password reset attempt for: " . $data['email'] . "\n", FILE_APPEND);
        // Return generic message to avoid exposing that this is an admin account
        json_response(['success' => true, 'message' => 'If your email is registered, a reset code has been sent.']);
    }

    // 2. Generate a 6-digit code and expiration (15 mins)
    $code = sprintf("%06d", mt_rand(1, 999999));
    $expires = date('Y-m-d H:i:s', strtotime('+15 minutes'));

    // 3. Save to database
    $update = $pdo->prepare('UPDATE users SET reset_code = ?, reset_code_expires = ? WHERE email = ?');
    $update->execute([$code, $expires, $data['email']]);

    // 4. Send Email
    $to = $data['email'];
    $subject = "Password Reset Code - Bridge to College";
    $message = "Hello " . $user['full_name'] . ",\n\n";
    $message .= "You requested a password reset. Here is your 6-digit code:\n\n";
    $message .= $code . "\n\n";
    $message .= "This code will expire in 15 minutes.\n";
    $message .= "If you did not request this, please ignore this email.";
    
    $headers = "From: noreply@bridgetocollege.com";

    // Attempt to send via mail(). In XAMPP, this may fail if sendmail isn't configured.
    // For development fallback, we'll log it to a text file in the backend folder.
    if (@mail($to, $subject, $message, $headers)) {
        // Mail sent
    } else {
        // Log to file for local testing
        file_put_contents('mail_log.txt', date('[Y-m-d H:i:s] ') . "To: $to | Code: $code\n", FILE_APPEND);
    }

    // Explicitly return success (for local testing dev environments, we'll secretly pass the code. Remove this in prod if sensitive!)
    // json_response(['success' => true, 'message' => 'If your email is registered, a reset code has been sent.', 'dev_code' => $code]);
    json_response(['success' => true, 'message' => 'If your email is registered, a reset code has been sent.', '_dev_code' => $code]);

} catch (Exception $e) {
    json_response(['error' => 'A server error occurred: ' . $e->getMessage()], 500);
}
?>
