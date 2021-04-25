<?php

class Snap {

    public $suits;
    public $faces;
    public $deck;
    public $hands = array(1 => array(), 2 => array());
    public $num_of_cards_in_deck;

    public function __construct() {
        
    }

    public function set_suits($suits) {
        $this->suits = $suits;
    }

    public function get_suits() {
        return $this->suits;
    }

    public function set_faces($faces) {
        $this->faces = $faces;
    }

    public function get_faces() {
        return $this->faces;
    }

    public function set_deck() {
        $this->deck = [];
        foreach ($this->suits as $suit) {
            foreach ($this->faces as $face) {
                $this->deck[] = $face;
            }
            
        }


        shuffle($this->deck);
       // echo "<pre>" . print_r($this->deck, true);
        $this->num_of_cards_in_deck = count($this->deck);
    }

    public function set_hands() {
        for ($i = 0; $i < floor($this->num_of_cards_in_deck / 2); $i++) {
            //print_r($hands);
            $this->hands[1][] = array_shift($this->deck); //implode(" of ",
            $this->hands[2][] = array_shift($this->deck); //implode(" of ",;
        }
    }

    public function play() {
//        echo 'here' . count($this->deck);
        $i = 0;
        $prevcard = '';
        while (count($this->hands[1]) != 0 && count($this->hands[2]) != 0) {
            $hand1_card = array_shift($this->hands[1]);

            $hand2_card = array_shift($this->hands[2]);

            if ($prevcard == $hand1_card) {
                //hand1 got a hit. hand1 put a card that matched hand 2 's previous round card number
                $this->deck[] = $hand1_card;
                $this->deck[] = $hand2_card;
                while (count($this->deck) != 0)
                    $this->hands[1][] = array_shift($this->deck);
            } else if ($hand1_card == $hand2_card) {
                //hand2 got a hit. hand2 put a similar card to hand1 in number
//                echo "hand1 " . $hand1_card . ' hand2 ' . $hand2_card;
                $this->deck[] = $hand1_card;
                $this->deck[] = $hand2_card;
                while (count($this->deck) != 0)
                    $this->hands[2][] = array_shift($this->deck);

//                echo "<pre>" . print_r($this->hands, true);
//                echo "<pre>" . print_r($this->deck, true);
            } else {
                $this->deck[] = $hand1_card;
                $this->deck[] = $hand2_card;
            }
            $prevcard = $hand2_card;
//            echo "i is " . $i . ' ';
            $i++;
        }
        if (count($this->deck) == 0) {
            if (count($this->hands[1]) != 0) {
                echo "Hand1 won the game. also deck is empty.<br>";
            } else if (count($this->hands[2]) != 0) {
                echo "Hand2 won the game. also deck is empty.<br>";
            }
        } else {
            if (count($this->hands[1]) != 0) {
                echo "Hand1 won the game. but deck is not empty, meaning hand2 cards got over.<br>";
            } else if (count($this->hands[2]) != 0) {
                echo "Hand2 won the game. but deck is not empty, meaning hand1 cards got over.<br>";
            }
        }
        echo "Hands are here <pre>" . print_r($this->hands, true);
        echo "Deck is here <pre>" . print_r($this->deck, true);
    }

    public function get_deck() {
        return $this->deck;
    }

}

//controller is below
$snap = new Snap();
//i have set face only 2,3 for clarity. if we remove the comment below to include all number
//it will play real game.
$snap->set_faces(array(
    "2", "3"//"4", "5", "6", "7", "8",
    //"9", "10", "J", "Q", "K", "A"
));
$snap->set_suits(array(
    "S", "H", "C", "D"
));
$snap->set_deck();
$snap->set_hands();
$snap->play();

