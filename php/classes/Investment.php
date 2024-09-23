<?php

class Investment
{
    private $id;
    private string $title;
    private $value;
    private $percentage;
    private $date_of_creation;
    private $type;

    public function __construct() {}

    public function getId() {
        return $this->id;
    }

    public function getTitle() {
        return $this->title;
    }

    public function getValue() {
        return $this->value;
    }

    public function getPercentage() {
        return $this->percentage;
    }

    public function getDateOfCreation() {
        return $this->date_of_creation;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setTitle($title) {
        $this->title = $title;
    }

    public function setValue($value) {
        $this->value = $value;
    }

    public function getType() {
        return $this->type;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function setPercentage($percentage) {
        $this->percentage = $percentage;
    }

    public function setDateOfCreation($date_of_creation) {
        $this->date_of_creation = $date_of_creation;
    }

    public function calculatePercentages(&$investments) {
        $totalValue = 0;

        // First, calculate the total value of all investments
        foreach ($investments as $investment) {
            $totalValue += $investment['value'];
        }

        // Then, calculate the percentage for each investment
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

    public function getInvestmentById($id) {
        $investments = $this->getInvestments();
        foreach ($investments as $investment) {
            if ($investment['id'] == $id) {
                return $investment;
            }
        }
        return null;
    }

    // CREATE
    public function createInvestment($investment) {
        $investments = $this->getInvestments();
        $investments[] = $investment;
        $this->calculatePercentages($investments);
        $this->saveInvestments($investments);
    }

    public function saveInvestments($investments) {
        $filePath = __DIR__ . '/../../data/investments.json';
        file_put_contents($filePath,
            json_encode($investments, JSON_PRETTY_PRINT));
    }

    // UPDATE
    public function updateInvestment($updatedInvestment) {
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
    function deleteInvestment($id) {
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