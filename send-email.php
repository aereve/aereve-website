<?php
// Enable CORS for cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['firstName', 'lastName', 'email', 'message'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit();
    }
}

// Sanitize input data
$firstName = htmlspecialchars(trim($input['firstName']));
$lastName = htmlspecialchars(trim($input['lastName']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$company = htmlspecialchars(trim($input['company'] ?? ''));
$phone = htmlspecialchars(trim($input['phone'] ?? ''));
$inquiry = htmlspecialchars(trim($input['inquiry'] ?? 'General Inquiry'));
$message = htmlspecialchars(trim($input['message']));

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit();
}

// Email configuration
$to = 'info@aereve.com';
$subject = 'New Contact Form Submission - ' . $inquiry;

// Create email content
$email_content = "
New contact form submission from Aereve website:

Name: $firstName $lastName
Email: $email
Company: " . ($company ?: 'Not provided') . "
Phone: " . ($phone ?: 'Not provided') . "
Inquiry Type: $inquiry

Message:
$message

---
Submitted from: " . $_SERVER['HTTP_HOST'] . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "
Timestamp: " . date('Y-m-d H:i:s T') . "
";

// Email headers
$headers = [
    'From: noreply@aereve.com',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email
$mail_sent = mail($to, $subject, $email_content, implode("\r\n", $headers));

if ($mail_sent) {
    // Log successful submission (optional)
    error_log("Contact form submission sent to $to from $email");
    
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you for your message! We will get back to you within 24 hours.'
    ]);
} else {
    // Log error (optional)
    error_log("Failed to send contact form email to $to from $email");
    
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly at info@aereve.com'
    ]);
}
?>
