<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
header('Content-Type: application/json');
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(['success' => false, 'message' => 'user_id required']);
    exit;
}

$stmt = $pdo->prepare("SELECT theme FROM experience_settings WHERE user_id = ?");
$stmt->execute([$user_id]);
$row = $stmt->fetch();

if ($row) {
    echo json_encode(['success' => true, 'theme' => $row['theme']]);
} else {
    echo json_encode(['success' => false, 'message' => 'not found']);
} 