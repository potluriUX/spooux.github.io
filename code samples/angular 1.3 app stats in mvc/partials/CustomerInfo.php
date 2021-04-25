<?php
    require_once('DB.php');
    require_once($_SERVER["PHP_INCLUDE_HOME"]."stats3/common/statsrep5.0/InfoBase.php");

class CustomerInfo extends InfoBase {

    private $_CUID = NULL;
    private $_customername = '';
    private $_aggcode = '';
    private $_hasChildren=false;
    private $_hasInstitutionalChildren = false;
    private $_hasMidTier = false;
    private $_childArray = array();
    private $_db = NULL;

    // 'Valid' means is actually found a customer, not merely that there was no error.
    private $_valid = false;

    function __Construct($inUIDCUID, $inPassword=NULL) {

        // TODO: we should use GI_ProductConfig maybe?
        $this->_db = DB::connect($_SERVER['STATS_CONNECT_STRING']);


        // The first parameter may be a customer ID, or a username
        // if the second parameter is supplied, assume the first parameter
        // is a username, and the second parameter is a password.
        //
        // Otherwise, assume the first parameter is a customerid
        if (!DB::isError($this->_db)) {
            if ($inPassword) {
                $result = $this->_lookupCUID($inUIDCUID, $inPassword);
                if ($result) {
                    $this->_CUID = $result;
                }
            }
            else {
                $this->_CUID = $inUIDCUID;
            }

            $this->_lookupCustomerInfo();
            $this->_db->disconnect();

            if ($this->_CUID && $this->_customername) {
                $this->_valid = true;
            }
        }
        else {
            $this->_isError = true;
            $this->_errorMessage .= $this->_db->getMessage();
        }


    }

    public function isValid(){
        return $this->_valid;
    }

    public function getCustomerID() {
        if ($this->_valid) {
            return $this->_CUID;
        }
        return '';
    }

    public function getCustomerName() {
        if ($this->_valid) {
            return $this->_customername;
        }
        return '';
    }

    public function getAggCode() {
        if ($this->_valid) {
            return $this->_aggcode;
        }
        return '';
    }

    public function hasChildren() {
        if ($this->_valid) {
            return $this->_hasChildren;
        }
        return '';
    }


    public function getChildren() {
        if ($this->_valid) {
            return $this->_childArray;
        }
        return array();
    }

    public function hasInstitutionalChildren() {
        if ($this->_valid) {
            return $this->_hasInstitutionalChildren;
        }
        return '';
    }

    public function hasMidTier() {
        if ($this->_valid) {
            return $this->_hasMidTier;
        }
        return '';
    }

    private function _lookupCUID($inUsername, $inPassword) {
        $outResult = NULL;

        # a filter to reduce risk of mysql injection
        $pregpat = '/^[0-9a-zA-Z.@]+$/';

        if (!preg_match($pregpat, $inUsername) || !preg_match($pregpat, $inPassword)) {
            return $outResult;
        }

        if (trim($inUsername) != "" && trim($inPassword) != "") {

            $qString = "select customer_id from auth.customer where admin_id='$inUsername' and admin_pass='$inPassword'";
            $result = $this->_db->getOne($qString);
            if (!DB::isError($result)) {
                $outResult = $result;
            }
            else {
                $this->_isError = true;
                $this->_errorMessage .= $result->getMessage();
            }

        }

        return $outResult;
    }

    private function _lookupCustomerInfo() {
        # a filter to reduce risk of mysql injection
        $pregpat = '/^[0-9a-zA-Z.@]+$/';

        if (!preg_match($pregpat, $this->_CUID)) {
            return;
        }

        if (trim($this->_CUID) != "") {
            $cuid = trim($this->_CUID);
            $this->_lookupCustomerName($cuid);
            $this->_lookupCustomerAggCode($cuid);
            $this->_recurseChildren($cuid, $this->_aggcode);
            $this->_identifyChildrenTypes();
            $this->_fetchMidTier();
        }
    }

    private function _lookupCustomerName($incuid) {
        $qString = "select name from auth.customer where customer_id='{$incuid}'";
        $result = $this->_db->getOne($qString);
        if (!DB::isError($result)) {
            $this->_customername = $result;
        }
        else {
            $this->_isError = true;
            $this->_errorMessage .= $result->getMessage();
        }
    }

    private function _lookupCustomerAggCode($incuid) {
        $qString = "select aggregate from auth.customer where customer_id='{$incuid}'";
        $result = $this->_db->getOne($qString);
        if (!DB::isError($result)) {
            $this->_aggcode = $result;
        }
        else {
            $this->_isError = true;
            $this->_errorMessage .= $result->getMessage();
        }

    }

    private function _recurseChildren($inPID, $inAGG){

        if (!array_key_exists($inPID, $this->_childArray)) {
            $this->_childArray[$inPID] = $inAGG;
        }

        $qString = "select distinct t.cid CID, c.aggregate AGG from customer_tree t join auth.customer c on t.cid=c.customer_id where t.pid='{$inPID}'";
        $dataSet =& $this->_db->query($qString);
        if (!DB::isError($dataSet)) {
            while ($dbrow =& $dataSet->fetchRow(DB_FETCHMODE_ASSOC)) {
                $cid = $dbrow['CID'];
                $agg = $dbrow['AGG'];
                if (!array_key_exists($cid, $this->_childArray)) {
                    $this->_recurseChildren($cid, $agg);
                }
            }
            $dataSet->free();
        } else {
            $this->_isError = true;
            $this->_errorMessage .= $result->getMessage();
        }
    }

    private function _identifyChildrenTypes() {
        if (count($this->_childArray) > 1) {
            $this->_hasChildren = true;
            // Ok, we know we have some children.  Are any of them non-iAuth?
            $this->_hasInstitutionalChildren = false;
            foreach ($this->_childArray as $child => $agg) {
                if (strpos($child, 'iauth') === false){
                    if ($child != $inCUID) {
                        $this->_hasInstitutionalChildren = true;
                        break;
                    }
                }
            }
        }
    }

    private function _fetchMidTier() {
        $qString = "select count(*) from auth.mid_tier where pid='" . $this->_CUID . "'";
        $rowCount = $this->_db->getOne($qString);
        if ($rowCount) {
            $this->_hasMidTier = true;
        }
    }

}



?>

