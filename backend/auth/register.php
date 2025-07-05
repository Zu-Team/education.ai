<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
header('Content-Type: application/json');
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$auth_provider = 'manual';
$country_id = $data['country_id'] ?? null;
$educational_stage = $data['educational_stage'] ?? null;
$study_field = $data['study_field'] ?? null;
$birth_date = $data['birth_date'] ?? null;

if (!$name || !$email || !$password || !$country_id || !$educational_stage || !$birth_date) {
    echo json_encode(['success' => false, 'message' => 'يرجى تعبئة جميع الحقول المطلوبة']);
    exit;
}

// تحقق من وجود المستخدم مسبقًا
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
$stmt->execute(['email' => $email]);
if ($stmt->fetch()) {
    echo json_encode(['success' => false, 'message' => 'البريد الإلكتروني مستخدم بالفعل']);
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO users (name, email, password, auth_provider, country_id, educational_stage, study_field, created_at, updated_at, birth_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)");
$stmt->execute([
    $name, $email, $hash, $auth_provider, $country_id, $educational_stage, $study_field, $birth_date
]);
$user_id = $pdo->lastInsertId();

// إنشاء صف في security_settings
$stmt = $pdo->prepare("INSERT INTO security_settings (user_id, two_factor_enabled) VALUES (?, 0)");
$stmt->execute([$user_id]);

// إنشاء صف في roles
$stmt = $pdo->prepare("INSERT INTO roles (user_id, role) VALUES (?, 'user')");
$stmt->execute([$user_id]);

// إنشاء صف في privacy_settings
$stmt = $pdo->prepare("INSERT INTO privacy_settings (user_id, profile_visibility, activity_visibility) VALUES (?, 1, 1)");
$stmt->execute([$user_id]);

// إنشاء صف في experience_settings
$stmt = $pdo->prepare("INSERT INTO experience_settings (user_id, theme, font, language, notifications_enabled) VALUES (?, 'dark', 'default', 'ar', 1)");
$stmt->execute([$user_id]);

// بدء session وتسجيل الجلسة في auth_sessions
session_start();
session_regenerate_id(true);
$token = session_id();
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
$ip_address = $_SERVER['REMOTE_ADDR'] ?? '';
$pdo->prepare("INSERT INTO auth_sessions (user_id, session_token, user_agent, ip_address, is_valid, created_at) VALUES (?, ?, ?, ?, 1, NOW())")
    ->execute([$user_id, $token, $user_agent, $ip_address]);

// جلب الدور
$role = 'user';

echo json_encode([
    'success' => true,
    'user' => [
        'id' => $user_id,
        'name' => $name,
        'level' => $educational_stage,
        'theme' => 'dark',
        'role' => $role
    ],
    'token' => $token
]); 