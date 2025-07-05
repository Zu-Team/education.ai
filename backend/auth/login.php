<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
header('Content-Type: application/json');
session_start();
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$auth_provider = $data['auth_provider'] ?? 'manual'; // manual أو google أو microsoft

// سجل كل البيانات المستقبلة
file_put_contents(__DIR__ . '/login_debug.log', date('Y-m-d H:i:s') . " | POST: " . json_encode($data) . "\n", FILE_APPEND);

// تحقق من وجود المستخدم
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email AND auth_provider = :auth_provider LIMIT 1");
$stmt->execute(['email' => $email, 'auth_provider' => $auth_provider]);
$user = $stmt->fetch();

// بعد الاستعلام عن المستخدم
file_put_contents(__DIR__ . '/login_debug.log', date('Y-m-d H:i:s') . " | user: " . json_encode($user) . "\n", FILE_APPEND);

if (!$user) {
    echo json_encode(['success' => false, 'message' => 'المستخدم غير موجود أو مزود الدخول غير صحيح']);
    exit;
}

// تحقق من حالة الحساب
if (isset($user['is_active']) && !$user['is_active']) {
    echo json_encode(['success' => false, 'message' => 'الحساب غير مفعل']);
    exit;
}

// تحقق من كلمة المرور إذا كان يدوي
if ($auth_provider === 'manual') {
    if (!password_verify($password, $user['password'])) {
        file_put_contents(__DIR__ . '/login_debug.log', date('Y-m-d H:i:s') . " | كلمة المرور غير صحيحة\n", FILE_APPEND);
        $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
        $ip_address = $_SERVER['REMOTE_ADDR'] ?? '';
        $pdo->prepare("INSERT INTO login_logs (user_id, ip_address, user_agent, success) VALUES (?, ?, ?, 0)")
            ->execute([$user['id'], $ip_address, $user_agent]);
        $resp = ['success' => false, 'message' => 'كلمة المرور غير صحيحة'];
        file_put_contents(__DIR__ . '/login_debug.log', date('Y-m-d H:i:s') . " | response: " . json_encode($resp) . "\n", FILE_APPEND);
        echo json_encode($resp);
        exit;
    } else {
        file_put_contents(__DIR__ . '/login_debug.log', date('Y-m-d H:i:s') . " | كلمة المرور صحيحة\n", FILE_APPEND);
    }
}

// فحص إذا كانت كلمة المرور مطلوبة في تسجيل الدخول اليدوي
if ($auth_provider === 'manual' && !$password) {
    echo json_encode(['success' => false, 'message' => 'يرجى إدخال كلمة المرور']);
    exit;
}

// سجل بيانات الطلب في ملف مؤقت (للتتبع)
file_put_contents(__DIR__ . '/login_debug.log', date('Y-m-d H:i:s') . " | email: $email | provider: $auth_provider\n", FILE_APPEND);

// تحقق من two_factor_enabled
$stmt2 = $pdo->prepare("SELECT two_factor_enabled FROM security_settings WHERE user_id = ?");
$stmt2->execute([$user['id']]);
$sec = $stmt2->fetch();
if ($sec && $sec['two_factor_enabled']) {
    echo json_encode(['success' => false, 'requires_2fa' => true, 'user_id' => $user['id']]);
    exit;
}

// جلب الدور من جدول roles
$stmtRole = $pdo->prepare("SELECT role FROM roles WHERE user_id = ? LIMIT 1");
$stmtRole->execute([$user['id']]);
$roleRow = $stmtRole->fetch();
$role = $roleRow ? $roleRow['role'] : 'user';

// تسجيل الجلسة
session_regenerate_id(true);
$_SESSION['user_id'] = $user['id'];
$token = session_id();

$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
$ip_address = $_SERVER['REMOTE_ADDR'] ?? '';
$pdo->prepare("INSERT INTO auth_sessions (user_id, session_token, user_agent, ip_address, is_valid, created_at) VALUES (?, ?, ?, ?, 1, NOW())")
    ->execute([$user['id'], $token, $user_agent, $ip_address]);

// سجل الدخول
$pdo->prepare("INSERT INTO login_logs (user_id, ip_address, user_agent, success) VALUES (?, ?, ?, 1)")
    ->execute([$user['id'], $ip_address, $user_agent]);

// قبل إرسال الاستجابة النهائية
$response = [
    'success' => true,
    'user' => [
        'id' => $user['id'],
        'name' => $user['name'],
        'level' => $user['educational_stage'] ?? null,
        'theme' => $user['theme'] ?? 'dark',
        'role' => $role
    ],
    'token' => $token
];
file_put_contents(__DIR__ . '/login_debug.log', date('Y-m-d H:i:s') . " | response: " . json_encode($response) . "\n", FILE_APPEND);
echo json_encode($response);

// في نهاية الملف، أضف catch لأي خطأ غير متوقع
set_exception_handler(function($e) {
    echo json_encode(['success' => false, 'message' => 'حدث خطأ غير متوقع في السيرفر', 'error' => $e->getMessage()]);
    exit;
}); 