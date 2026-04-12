<?php
// backend/send_contact.php - Handle contact form submissions
require_once 'db.php';

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    json_response(['error' => 'No data provided'], 400);
}

// Extract and sanitize
$full_name = filter_var($data['full_name'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = filter_var($data['phone'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$subject = filter_var($data['subject'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$message = filter_var($data['message'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);

// Basic validation
if (empty($full_name) || empty($email) || empty($subject) || empty($message)) {
    json_response(['error' => 'Please fill in all required fields'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['error' => 'Invalid email address'], 400);
}

try {
    // 1. Save to Database
    $stmt = $pdo->prepare("INSERT INTO contact_messages (full_name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$full_name, $email, $phone, $subject, $message]);
    
    // Log the contact submission
    log_action(null, 'Contact Message', "New message from $full_name ($email) regarding $subject");

    // 2. Prepare Email
    $to = "bridgetocollege.rwanda@gmail.com";
    $email_subject = "New Contact Form Submission: $subject";
    
    $email_body = "You have received a new message from your website contact form.\n\n".
                 "Details:\n".
                 "--------------------------\n".
                 "Name: $full_name\n".
                 "Email: $email\n".
                 "Phone: " . ($phone ?: 'Not provided') . "\n".
                 "Subject: $subject\n".
                 "Message:\n$message\n".
                 "--------------------------\n\n".
                 "You can reply directly to this email to contact the student.";

    $headers = "From: noreply@bridgetocollege.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // 3. Send Email
    // NOTE: This will only work if the server has mail() configured (like in production).
    // In local XAMPP, this may return success but not actually deliver unless SMTP is configured.
    $mail_sent = @mail($to, $email_subject, $email_body, $headers);

    json_response([
        'success' => true, 
        'message' => 'Message sent successfully!',
        'email_sent' => $mail_sent
    ]);

} catch (PDOException $e) {
    json_response(['error' => 'Database error: ' . $e->getMessage()], 500);
}
?>
