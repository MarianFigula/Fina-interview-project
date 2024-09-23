<?php

require_once '../../classes/Investment.php';
header('Content-Type: application/json');

// Read the incoming JSON data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['id'])){
    echo json_encode(['success' => false,
        'message' => 'ID not provided.']);
    exit();
}


$investmentId = $data['id'];
$investment = new Investment();

$investments = $investment->getInvestments();

if (empty($investments)){
    echo json_encode(['success' => false,
        'message' => 'No investments found.']);
    exit();
}

$investment->deleteInvestment($investmentId);

$investments = $investment->getInvestments();

echo json_encode([
    'success' => true,
    'message' => 'Investment successfully deleted',
    'investments' => $investments
]);


