<?php
/**
 * temp locker_base parent class file for ravi's functions
 */
require_once( $_SERVER['PHP_INCLUDE_API'] . 'product_classes/locker_base1.php');
class locker_base 


    
    /**
     * reset_lockerdbConn
     * Reset locker db connection.
     * @author  potluri
     * @access  public
    
     * @return 1
     */
    public function reset_lockerdbConn() {
        if ($this->_lockerdbConn != null && is_object($this->_lockerdbConn)) {
            $this->_lockerdbConn->close();
        }
        $this->_lockerdbConn = null;
        return 1;
    }

    /**
     * Function to get teacher list for admin
     * @param admin_profile_id, customer_id, product_id
     * @return list on success
     * @throws Exception if all fields are empty
     * @author potluri
     *
    */
    
    public function get_teacher_list_for_admin() {
        $function_name = 'get_teacher_list_for_admin';
        $profile_id = '';
        $profile_parent_id = '';
        $valid_profile_object = null;
        $default_source_id = 0;
        //SQL Variables
        $sql_statement = '';
        $sql_parameter_array = array();
        $statement_return_obj = false;
        $student_result_array = array();
        try {
            $postobj = $this->getPostData();
            $admin_profile_id = (isset($postobj[0]) && $postobj[0] != '') ? $postobj[0] : "";
            $customer_id = (isset($postobj[1]) && $postobj[1] != '') ? $postobj[1] : "";
            $product_id = (isset($postobj[2]) && $postobj[2] != '') ? $postobj[2] : "";
            //if all fields are mssing throw error 
            if ($admin_profile_id == "" || $customer_id == "") {
                throw new Exception($function_name . " - cclicks Error: Missing required fields:" . json_encode($postobj));
                return -1;
            }
            //init profileParams to get class id from getDLProfileId
            $profileParams = array();
            $profileParams['profile_string'] = $admin_profile_id; // string
            $profileParams['id_type'] = 1; //one means first id of pattern id1.id2
            $profileid = $this->getDLProfileId($profileParams);
            $profileParams['id_type'] = 2; //one means first id of pattern id1.id2
            $schoolid = $this->getDLProfileId($profileParams);
            $url = $this->_scs_url . "/composite/staff/" . $profileid . "/organizations/" . $schoolid . "/teachers";
            $dp_data_json = $this->get_digital_platform_data($url, false);
            $dp_data_array = json_decode($dp_data_json);
            if (empty($dp_data_array)) {
                echo $this->setReturnStatus($this->_jsonFailure, $function_name . ' - No Records Available');
                exit;
            }
            $retval = array();
            if (!isset($dp_data_array->status)) {
                for ($i = 0; $i < count($dp_data_array); $i++) {

                    $profileobj = new stdClass;
                    foreach ($dp_data_array[$i] as $key => $val) {
                        switch ($key) {
                            case 'identifiers':
                                break;
                            default:
                                $profileobj->{$key} = $val;
                        }
                    }
                    $retval[] = $profileobj;
                }
                echo $this->setReturnStatus($this->_jsonSuccess, $function_name.' successful.', $retval);
            } else {
                echo json_encode($dp_data_array);
            }
        } catch (Exception $ex) {
            echo $this->setReturnStatus($this->_jsonFailure, $ex->getMessage());
        }
    }
    
    /**
     * Function to get school list for admin
     * @param admin_profile_id, admin_type, product_id
     * @return list on success
     * @throws Exception if all fields are empty
     * @author potluri
     * 
    */
    
    public function get_school_list_for_admin() {
        /*IMPORTANT:: $admin_type check not added as of now as there is no option 
        * currently available from DP/SDM to get school list based on school_admin
        * or district_admin and now it expects profile_id string.
        */
        $function_name = 'get_school_list_for_admin';
        try{
            $postobj = $this->getPostData();
            $admin_profile_id = (isset($postobj[0]) && $postobj[0] != '') ? $postobj[0] : "";
            $admin_type = (isset($postobj[1]) && $postobj[1] != '') ? $postobj[1] : "";
            $product_id = (isset($postobj[2]) && $postobj[2] != '') ? $postobj[2] : "";
            //if all fields are mssing throw error 
            if ($admin_profile_id == "" || $admin_type == "") {
                throw new Exception($function_name . " - cclicks Error: Missing required fields:" . json_encode($postobj));
                return -1;
            }
            //init profileParams to get class id from getDLProfileId
            $profileParams = array();
            $profileParams['profile_string'] = $admin_profile_id; // string
            $profileParams['id_type'] = 1; //one means first id of pattern id1.id2
            $profileid = $this->getDLProfileId($profileParams);
            $url = $this->_scs_url . "/composite/staff/" . $profileid . "/org-roles";
            $dp_data_json = $this->get_digital_platform_data($url, false);
            $dp_data_array = json_decode($dp_data_json);
            if (empty($dp_data_array)) {
                echo $this->setReturnStatus($this->_jsonFailure, $function_name . ' - No Records Available');
                exit;
            }
            $retval = array();
            if (!isset($dp_data_array->status)) {
                for ($i = 0; $i < count($dp_data_array); $i++) {
                    $profileobj = new stdClass;
                    foreach ($dp_data_array[$i] as $key => $val) {
                        $profileobj->{$key} = $val;
                    }
                    $retval[] = $profileobj;
                }
                echo $this->setReturnStatus($this->_jsonSuccess, $function_name.' successful.', $retval);
            } else {
                echo json_encode($dp_data_array);
            }
        } catch (Exception $ex) {
            echo $this->setReturnStatus($this->_jsonFailure, $ex->getMessage());
        }
    }
    
    /**
     * Function to get_product_grades
     * @param product_id
     * @return list on success
     * @throws Exception if all fields are empty
     * @author potluri
     * 
    */
    
    public function get_product_grades() {
        $result = array();
        $function_name = 'get_product_grades';
        try {
            $postobj = $this->getPostData();
            $product_id = (isset($postobj['product_id']) && $postobj['product_id'] != '') ? $postobj['product_id'] : "";
            //if all fields are mssing throw error 
            if ($product_id == "") {
                throw new Exception($function_name . " - cclicks Error: Missing required fields:" . json_encode($postobj));
                return -1;
            }
            $product_db_class = 'support';
            $profile_id = $this->createDbConnection(1.1, $product_db_class);
            $query = "CALL " . GET_PRODUCT_GRADES . "(?)";
            $bind_arr = array();
            $bind_arr[] = "s";
            $bind_arr[] = &$product_id;
            $statementobj = $this->executeQuery($this->_lockerdbConn, $query, $bind_arr);
            if (!$statementobj) {
                echo $this->setReturnStatus($this->_jsonFailure, $function_name.' - Not able to assign student to group.');
                exit;
            }
            $result = $this->getresult($statementobj);
            if (empty($result)) {
                echo $this->setReturnStatus($this->_jsonFailure, $function_name . ' - No Records Available');
                exit;
            }
            echo $this->setReturnStatus($this->_jsonSuccess, $function_name.' successful.',$result);
        } catch (Exception $ex) {
            echo $this->setReturnStatus($this->_jsonFailure, $ex->getMessage());
        }
    }
    
    /**
     * Function to Get Grades By Band
     * @param band_code, product_id
     * @return list on success
     * @throws Exception if all fields are empty
     * @author potluri
     * 
    */
    
    function get_grades_by_band() {
        try {
            $function_name = 'get_grades_by_band';
            $postobj = $this->getPostData();
            $band_code = (isset($postobj['band_code']) && $postobj['band_code'] != '') ? $postobj['band_code'] : "";
            $product_id = (isset($postobj['product_id']) && $postobj['product_id'] != '') ? $postobj['product_id'] : "";
            //if all fields are mssing throw error 
            if ($product_id == "" || $band_code == "") {
                throw new Exception($function_name . " - cclicks Error: Missing required fields:" . json_encode($postobj));
                return -1;
            }
            $product_db_class = 'support';
            $profile_id = $this->createDbConnection(1.1, $product_db_class);
            $query = "CALL " . GET_GRADES_BY_BANDS . "(?,?)";
            $bind_arr = array();
            $bind_arr[] = "ss";
            $bind_arr[] = &$band_code;
            $bind_arr[] = &$product_id;
            $statementobj = $this->executeQuery($this->_lockerdbConn, $query, $bind_arr);
            if (!$statementobj) {
                echo $this->setReturnStatus($this->_jsonFailure, $function_name . ' - Not able to get grades by band.');
                exit;
            }
            $row = $this->getresult($statementobj, 'object');
            if (empty($row)) {
                echo $this->setReturnStatus($this->_jsonFailure, $function_name . ' - No Records Available');
                exit;
            }
            echo $this->setReturnStatus($this->_jsonSuccess, $function_name . ' successful.', $row);
        } catch (Exception $ex) {
            echo $this->setReturnStatus($this->_jsonFailure, $ex->getMessage());
        }
    }
    
    /**
     * Function to Get Timeperiod
     * @param product_id
     * @return list on success
     * @throws Exception if all fields are empty
     * @author potluri
     * 
    */
    
    function get_timeperiod() {
        try {
            $function_name = 'get_timeperiod';
            $postobj = $this->getPostData();
            $product_id = (isset($postobj['product_id']) && $postobj['product_id'] != '') ? $postobj['product_id'] : "";
            //if all fields are mssing throw error 
            if ($product_id == "") {
                throw new Exception($function_name . " - cclicks Error: Missing required fields:" . json_encode($postobj));
                return -1;
            }
            $product_db_class = 'support';
            $profile_id = $this->createDbConnection(1.1, $product_db_class);
            $query = "CALL " . GET_TIMEPERIOD . "(?)";
            $bind_arr = array();
            $bind_arr[] = "s";
            $bind_arr[] = &$product_id;
            $statementobj = $this->executeQuery($this->_lockerdbConn, $query, $bind_arr);
            if (!$statementobj) {
                echo $this->setReturnStatus($this->_jsonFailure, $function_name . ' - Not able to get time period.');
                exit;
            }
            $row = $this->getresult($statementobj, 'object');
            if (empty($row)) {
                echo $this->setReturnStatus($this->_jsonFailure, $function_name . ' - No Records Available');
                exit;
            }
            echo $this->setReturnStatus($this->_jsonSuccess, $function_name . ' successful.', $row);
        } catch (Exception $ex) {
            echo $this->setReturnStatus($this->_jsonFailure, $ex->getMessage());
        }
    }

}
