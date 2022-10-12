<?php
class InfoBase {

    protected $_isError = false;
    protected $_errorMessage = '';


    public function isError() {
        return $this->_isError;
    }

    public function getErrorMessage() {
        return $this->_errorMessage;
    }

}
?>
