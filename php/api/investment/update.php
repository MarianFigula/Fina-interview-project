<?php

require_once '../../classes/Investment.php';
header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (empty($data['id']) || empty($data['title']) || empty($data['value']) || empty($data['type'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit();
}

$investment = new Investment();
$investmentData = [
    'id' => (int)$data['id'],
    'title' => $data['title'],
    'value' => (float)$data['value'],
    'percentage' => (float)$data['percentage'],
    'type' => $data['type'],
    'date_of_creation' => date('Y-m-d H:i:s')
];

$investment->updateInvestment($investmentData);

$investments = $investment->getInvestments();

echo json_encode(['success' => true, 'investments' => $investments]);
