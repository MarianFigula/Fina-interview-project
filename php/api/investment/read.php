<?php

require_once 'php/classes/Investment.php';
header('Content-Type: application/json');

$investment = new Investment();

$investments = $investment->getInvestments();

echo json_encode($investments);