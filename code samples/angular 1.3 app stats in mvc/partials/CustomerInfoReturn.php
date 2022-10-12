<?php
    require_once($_SERVER["PHP_INCLUDE_HOME"]."stats3/common/statsrep5.0/Returns.php");

class CustomerInfoReturn extends ReturnBase{
    public function __Construct($inParameters){
        parent::__construct();
        if (!$this->_verifyParameters($inParameters)) {
            return;
        }

        include_once($_SERVER["PHP_INCLUDE_HOME"]."stats3/common/statsrep5.0/CustomerInfo.php");

        if (array_key_exists('p1', $inParameters) && array_key_exists('p2', $inParameters)) {

            $myCustomerInfo = new CustomerInfo($inParameters['p1'], $inParameters['p2']);

        }
        else if (array_key_exists('cuid', $inParameters)) {

            $myCustomerInfo = new CustomerInfo($inParameters['cuid']);

        }


        if ($myCustomerInfo->isError()) {
            $this->_resultCode = RETURN_SERVER_ERROR;
            $this->_resultData = array(
                                    'message' => $myCustomerInfo->getErrorMessage()
                                    );
        }
        else if ($myCustomerInfo->isValid()) {
            $this->_resultData['customerid'] = $myCustomerInfo->getCustomerID();
            $this->_resultData['customername'] = $myCustomerInfo->getCustomerName();
            $this->_resultData['aggcode'] = $myCustomerInfo->getAggCode();
            $this->_resultData['haschildren'] = $myCustomerInfo->hasChildren();
            $this->_resultData['hasinstitutionalchildren'] = $myCustomerInfo->hasInstitutionalChildren();
            $this->_resultData['hasmidtier'] = $myCustomerInfo->hasMidTier();
            $this->_resultData['children'] = $myCustomerInfo->getChildren();
        }


    }


    protected function _verifyParameters($inParameters) {

        // requires:
        //  p1: username
        //  p2: password
        // OR
        //  cuid

        if ((array_key_exists('p1', $inParameters) && array_key_exists('p2', $inParameters)) || (array_key_exists('cuid', $inParameters))) {
            return true;
        }

        $this->_resultCode = RETURN_CLIENT_ERROR;
        $this->_resultData= array(
                                'message' => "Incorrect parameters for 'getCustomerInfo' request."
                            );
        return $false;
    }

}

?>
