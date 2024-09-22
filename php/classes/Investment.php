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
}