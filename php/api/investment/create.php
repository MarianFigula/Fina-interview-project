<?php

require_once '../../classes/Investment.php';
header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (empty($data['title']) ||
    empty($data['value']) ||
    empty($data['percentage']) ||
    empty($data['type'])) {

    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit();
}

$investment = new Investment();

$investments = $investment->getInvestments();

$newId = count($investments) > 0 ?
    max(array_column($investments, 'id')) + 1 : 1;

$newInvestment = [
    'id' => $newId,
    'title' => $data['title'],
    'value' => (float)$data['value'],
    'percentage' => (float)$data['percentage'],
    'type' => $data['type'],
    'date_of_creation' => date('Y-m-d H:i:s')
];

$investment->createInvestment($newInvestment);

$investments = $investment->getInvestments();

echo json_encode([
    'success' => true,
    'message' => 'Investment successfully added.',
    'newInvestment' => $newInvestment,
    'investments' => $investments
]);