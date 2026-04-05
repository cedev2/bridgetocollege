<?php
// jwt_helper.php - Lightweight JWT Implementation for XAMPP
define('JWT_SECRET', 'bridge_to_college_secure_secret_2026_@_#_!'); // In production, move this to env

function base64UrlEncode($data) {
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
}

function base64UrlDecode($data) {
    $remainder = strlen($data) % 4;
    if ($remainder) {
        $data .= str_repeat('=', 4 - $remainder);
    }
    return base64_decode(str_replace(['-', '_'], ['+', '/'], $data));
}

function generate_jwt($payload) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    
    // Add 1-month expiry
    $payload['iat'] = time();
    $payload['exp'] = time() + (30 * 24 * 60 * 60); // 30 days
    
    $base64UrlHeader = base64UrlEncode($header);
    $base64UrlPayload = base64UrlEncode(json_encode($payload));
    
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
    $base64UrlSignature = base64UrlEncode($signature);
    
    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

function verify_jwt($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return false;
    
    list($header, $payload, $signature) = $parts;
    
    $validSignature = hash_hmac('sha256', $header . "." . $payload, JWT_SECRET, true);
    if (!hash_equals($validSignature, base64UrlDecode($signature))) return false;
    
    $payloadData = json_decode(base64UrlDecode($payload), true);
    if (!$payloadData || (isset($payloadData['exp']) && $payloadData['exp'] < time())) return false;
    
    return $payloadData;
}
?>
