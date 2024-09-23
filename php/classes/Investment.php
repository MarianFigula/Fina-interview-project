<?php

class Investment
{

    public function __construct() {}

    public function calculatePercentages(&$investments): void
    {
        $totalValue = 0;

        foreach ($investments as $investment) {
            $totalValue += $investment['value'];
        }

        foreach ($investments as &$investment) {
            $investment['percentage'] =
                round(($investment['value'] / $totalValue) * 100, 2);

        }
    }

    // READ
    public function getInvestments() {
        $filePath = __DIR__ . '/../../data/investments.json';
        if (!file_exists($filePath)) {
            return [];
        }
        $json = file_get_contents($filePath);
        return json_decode($json, true);
    }

    // CREATE
    public function createInvestment($investment): void
    {
        $investments = $this->getInvestments();
        $investments[] = $investment;
        $this->calculatePercentages($investments);
        $this->saveInvestments($investments);
    }

    public function saveInvestments($investments): void
    {
        $filePath = __DIR__ . '/../../data/investments.json';
        file_put_contents($filePath,
            json_encode($investments, JSON_PRETTY_PRINT));
    }

    // UPDATE
    public function updateInvestment($updatedInvestment): void
    {
        $investments = $this->getInvestments();
        foreach ($investments as $key => $investment) {
            if ($investment['id'] == $updatedInvestment['id']) {
                $investments[$key] = $updatedInvestment;
                break;
            }
        }
        $this->calculatePercentages($investments);
        $this->saveInvestments($investments);
    }

    // DELETE
    function deleteInvestment($id): void
    {
        $investments = $this->getInvestments();
        foreach ($investments as $key => $investment) {
            if ($investment['id'] == $id) {
                unset($investments[$key]);
                break;
            }
        }
        $investments = array_values($investments);
        $this->calculatePercentages($investments);
        $this->saveInvestments($investments);
    }

}