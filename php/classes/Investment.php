<?php

class Investment
{
    private $id;
    private string $title;
    private $value;
    private $percentage;
    private $date_of_creation;
    private $type;

    // Constructor
    public function __construct($id, $title, $value, $percentage, $date_of_creation) {
        $this->id = $id;
        $this->title = $title;
        $this->value = $value;
        $this->percentage = $percentage;
        $this->date_of_creation = $date_of_creation;
    }

    // Getters
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

    // Setters
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

    // READ
    public function getInvestments() {
        if (!file_exists('investments.json')) {
            return [];
        }
        $json = file_get_contents('investments.json');
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
        $this->saveInvestments($investments);
    }

    public function saveInvestments($investments) {
        file_put_contents('investments.json', json_encode($investments, JSON_PRETTY_PRINT));
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
        $this->saveInvestments(array_values($investments)); // Reindex array
    }

}