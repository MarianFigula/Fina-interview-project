<?php

require_once '../../classes/Investment.php';
header('Content-Type: application/json');

try {
    $investmentObj = new Investment();

    $investments = $investmentObj->getInvestments();
    http_response_code(200);
    echo json_encode($investments);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}