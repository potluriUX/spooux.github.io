<?php

    define("RETURN_SUCCESS", 0);
    define("RETURN_CLIENT_ERROR", 1);
    define("RETURN_SERVER_ERROR", 2);

class ReturnBase{

    protected $_resultCode;

    protected $_resultData = array();

    public function __Construct($inCode=RETURN_SUCCESS){
        $this->_resultCode = $inCode;
    }

    public function getReturnData(){
        return array(
                'resultcode'    => $this->_resultCode,
                'result'        => $this->_resultData
                    );
    }
}

class ServerErrorReturn extends ReturnBase{
    public function __Construct($inMessage){
        parent::__construct(RETURN_SERVER_ERROR);
        $this->_resultData= array(
                                'message' => $inMessage
                            );
    }
}

class ClientErrorReturn extends ReturnBase{
    public function __Construct($inMessage){
        parent::__construct(RETURN_CLIENT_ERROR);
        $this->_resultData= array(
                                'message' => $inMessage
                            );
    }
}

?>
