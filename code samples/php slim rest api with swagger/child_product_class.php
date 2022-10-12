<?php

/**
 * temp cclicks child product class that extends the locker base. file for ravi's functions
 */
class cclicks extends locker_base {

    /**
     * set_multiple_cclicks_assignments
     *
     * Create/Update cclicks assignments.
     *
     * @author  potluri
     * @access  public 
     * @return array - Assignment ID Array by [Teacher ID][Student ID][Assignment Type][Assignment Component Type] = Assignment ID
     * 
     */
    public function set_multiple_cclicks_assignments() {
        try {
            $function_name = 'set_multiple_cclicks_assignments';
            $postobjs = $this->getPostData();
            $assignment_id_array = array();
            if (!empty($postobjs)) {
                foreach ($postobjs as $postobj) {
                    $teacher_profile_id = (isset($postobj['teacher_profile_id']) && $postobj['teacher_profile_id'] != '') ? $postobj['teacher_profile_id'] : "";
                    $assignment_id = (isset($postobj['assignment_id']) && $postobj['assignment_id'] != '') ? $postobj['assignment_id'] : "";
                    $student_profile_id = (isset($postobj['student_profile_id']) && $postobj['student_profile_id'] != '') ? $postobj['student_profile_id'] : "";
                    $assignment_type = (isset($postobj['assignment_type']) && $postobj['assignment_type'] != '') ? $postobj['assignment_type'] : "";
                    $teacher_profile_id = (isset($postobj['teacher_profile_id']) && $postobj['teacher_profile_id'] != '') ? $postobj['teacher_profile_id'] : "";
                    $assignment_component_type = (isset($postobj['assignment_component_type']) && $postobj['assignment_component_type'] != '') ? $postobj['assignment_component_type'] : "";

                    $assignment_id_array[$teacher_profile_id][$student_profile_id][$assignment_type][$assignment_component_type] = $this->set_one_cclicks_assignment($postobj);
                }
            }
            echo $this->setReturnStatus($this->_jsonSuccess, 'set_multiple_cclicks_assignments successful.', json_encode($assignment_id_array));
        } catch (Exception $ex) {
            echo $this->setReturnStatus($this->_jsonFailure, $ex->getMessage());
        }
    }

    /**
     * set_one_cclicks_assignment
     *
     * inserts 1 cclicks assignment
     *
     * @author  potluri 
     * @access  public 
     * @return string - an assignment id
     */
    public function set_one_cclicks_assignment($postobj) {

        try {
            $function_name = 'set_one_cclicks_assignment';
            $teacher_profile_id = '';
            $teacher_parent_id = '';
            $assignment_id = '';

            $teacher_profile_id = (isset($postobj['teacher_profile_id']) && $postobj['teacher_profile_id'] != '') ? $postobj['teacher_profile_id'] : "";
            $assignment_id = (isset($postobj['assignment_id']) && $postobj['assignment_id'] != '') ? $postobj['assignment_id'] : "";
            $student_profile_id = (isset($postobj['student_profile_id']) && $postobj['student_profile_id'] != '') ? $postobj['student_profile_id'] : "";
            $class_id = (isset($postobj['class_id']) && $postobj['class_id'] != '') ? $postobj['class_id'] : "";
            $school_customer_id = (isset($postobj['school_customer_id']) && $postobj['school_customer_id'] != '') ? $postobj['school_customer_id'] : "";
            $product_id = (isset($postobj['product_id']) && $postobj['product_id'] != '') ? $postobj['product_id'] : "";
            $assignment_type = (isset($postobj['assignment_type']) && $postobj['assignment_type'] != '') ? $postobj['assignment_type'] : "";
            $assignment_component_type = (isset($postobj['assignment_component_type']) && $postobj['assignment_component_type'] != '') ? $postobj['assignment_component_type'] : "";
            $title = (isset($postobj['title']) && $postobj['title'] != '') ? $postobj['title'] : "";
            $date_assigned = (isset($postobj['date_assigned']) && $postobj['date_assigned'] != '') ? $postobj['date_assigned'] : "";
            $creation_date = (isset($postobj['creation_date']) && $postobj['creation_date'] != '') ? $postobj['creation_date'] : "";
            $modified_date = (isset($postobj['modified_date']) && $postobj['modified_date'] != '') ? $postobj['modified_date'] : "";
            $date_due = (isset($postobj['date_due']) && $postobj['date_due'] != '') ? $postobj['date_due'] : "";
            $active = (isset($postobj['active']) && $postobj['active'] != '') ? $postobj['active'] : "";
            $status = (isset($postobj['status']) && $postobj['status'] != '') ? $postobj['status'] : "";
            $asset_id = (isset($postobj['asset_id']) && $postobj['asset_id'] != '') ? $postobj['asset_id'] : "";
            $date_complete = (isset($postobj['date_complete']) && $postobj['date_complete'] != '') ? $postobj['date_complete'] : "";
            $total_score = (isset($postobj['total_score']) && $postobj['total_score'] != '') ? $postobj['total_score'] : "";
            $audio = (isset($postobj['audio']) && $postobj['audio'] != '') ? $postobj['audio'] : "";
            $lexile = (isset($postobj['lexile']) && $postobj['lexile'] != '') ? $postobj['lexile'] : "";
            $grl = (isset($postobj['grl']) && $postobj['grl'] != '') ? $postobj['grl'] : "";
            $text_complexity = (isset($postobj['text_complexity']) && $postobj['text_complexity'] != '') ? $postobj['text_complexity'] : "";
            $grade = (isset($postobj['grade']) && $postobj['grade'] != '') ? $postobj['grade'] : "";
            $year = (isset($postobj['year']) && $postobj['year'] != '') ? $postobj['year'] : "";

            if ($teacher_profile_id == "" || $student_profile_id == "" || $class_id == "" || $product_id == "" || $assignment_type == "") {
                throw new Exception("set_one_cclicks_assignment - cclicks Error: Missing required fields:" . json_encode($postobj));
                return -1;
            }

            $product_db_class = $this->_product_db_class;
            $profile_id = $this->createDbConnection($teacher_profile_id, $product_db_class);
            //insert into assignments table...
            $sql_statement = "SELECT " . CCLICKS_SET_ASSIGNMENT . "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) as assignment_id";
            $sql_parameter_array = array();
            $sql_parameter_array[] = "siissssssssssssssissssss";
            $sql_parameter_array[] = &$assignment_id;
            $sql_parameter_array[] = &$teacher_profile_id;
            $sql_parameter_array[] = &$student_profile_id;
            $sql_parameter_array[] = &$class_id;
            $sql_parameter_array[] = &$school_customer_id;
            $sql_parameter_array[] = &$product_id;
            $sql_parameter_array[] = &$assignment_type;
            $sql_parameter_array[] = &$assignment_component_type;
            $sql_parameter_array[] = &$title;
            $sql_parameter_array[] = &$date_assigned;
            $sql_parameter_array[] = &$creation_date;
            $sql_parameter_array[] = &$modified_date;
            $sql_parameter_array[] = &$date_due;
            $sql_parameter_array[] = &$active;
            $sql_parameter_array[] = &$status;
            $sql_parameter_array[] = &$asset_id;
            $sql_parameter_array[] = &$date_complete;
            $sql_parameter_array[] = &$total_score;
            $sql_parameter_array[] = &$audio;
            $sql_parameter_array[] = &$lexile;
            $sql_parameter_array[] = &$grl;
            $sql_parameter_array[] = &$text_complexity;
            $sql_parameter_array[] = &$grade;
            $sql_parameter_array[] = &$year;

            $statement_return_obj = $this->executeQuery($this->_lockerdbConn, $sql_statement, $sql_parameter_array);
            if ($statement_return_obj == false) {
                $error_message = "DB Error - Inserting an Assignment - $function_name.";
                $this->write_locker_error_log($error_message);
                echo $this->setReturnStatus($this->_jsonFailure, $error_message);
                exit;
            }

            $assignment_result_obj = $this->getresult($statement_return_obj);
            $first_position_in_array = 0;
            if (!empty($assignment_result_obj[$first_position_in_array])) {
                $assignment_id = $assignment_result_obj[$first_position_in_array]['assignment_id'];
            } else {
                $error_message = "NO assignment_id returned - $function_name.";
                $this->write_locker_error_log($error_message);
                echo $this->setReturnStatus($this->_jsonFailure, $error_message);
                exit;
            }
            $this->reset_lockerdbConn();
            return $assignment_id;
        } catch (Exception $ex) {
            echo $this->setReturnStatus($this->_jsonFailure, $ex->getMessage());
        }
    }
    
    /**
     * set_cclicks_assignment_quiz_result
     *
     * inserts or updates a cclicks assignment quiz result
     *
     * @author  potluri
     * @return string - an assignment quiz results id
     */
    public function set_cclicks_assignment_quiz_result() {
        try {
            $function_name = 'set_cclicks_assignment_quiz_result';
            $assignment_quiz_result_id = '';
            $postobj = $this->getPostData();
            $quiz_results_id = (isset($postobj['quiz_results_id']) && $postobj['quiz_results_id'] != '') ? $postobj['quiz_results_id'] : "";
            $student_profile_id = (isset($postobj['student_profile_id']) && $postobj['student_profile_id'] != '') ? $postobj['student_profile_id'] : "";
            $product_id = (isset($postobj['product_id']) && $postobj['product_id'] != '') ? $postobj['product_id'] : "";
            $question_id = (isset($postobj['question_id']) && $postobj['question_id'] != '') ? $postobj['question_id'] : "";
            $parent_slp_id = (isset($postobj['parent_slp_id']) && $postobj['parent_slp_id'] != '') ? $postobj['parent_slp_id'] : "";
            $assignment_id = (isset($postobj['assignment_id']) && $postobj['assignment_id'] != '') ? $postobj['assignment_id'] : "";
            $answer = (isset($postobj['answer']) && $postobj['answer'] != '') ? $postobj['answer'] : "";
            $is_correct = (isset($postobj['is_correct']) && $postobj['is_correct'] != '') ? $postobj['is_correct'] : "";
            $score = (isset($postobj['score']) && $postobj['score'] != '') ? $postobj['score'] : "";
            $creation_date = (isset($postobj['creation_date']) && $postobj['creation_date'] != '') ? $postobj['creation_date'] : "";
            $modified_date = (isset($postobj['modified_date']) && $postobj['modified_date'] != '') ? $postobj['modified_date'] : "";
            $question_data = json_encode((isset($postobj['question_data']) && $postobj['question_data'] != '') ? $postobj['question_data'] : "");
            $question_type = (isset($postobj['question_type']) && $postobj['question_type'] != '') ? $postobj['question_type'] : "";
            $spotlight_skill_id = (isset($postobj['spotlight_skill_id']) && $postobj['spotlight_skill_id'] != '') ? $postobj['spotlight_skill_id'] : "";
            $school_customer_id = (isset($postobj['school_customer_id']) && $postobj['school_customer_id'] != '') ? $postobj['school_customer_id'] : "";
            if ($student_profile_id == "" || $product_id == "" || $question_id == "") {
                throw new Exception("set_cclicks_assignment_quiz_result - cclicks Error: Missing required fields:" . json_encode($postobj));
                return -1;
            }
            $product_db_class = $this->_product_db_class;
            $student_profile_id = $this->createDbConnection($student_profile_id, $product_db_class);
            //insert into assignments table...
            $sql_statement = "SELECT " . CCLICKS_SET_ASSIGNMENT_QUIZ_RESULT . "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) as quiz_results_id";
            $sql_parameter_array = array();
            $sql_parameter_array[] = "sisssssssssssss";
            $sql_parameter_array[] = &$quiz_results_id;
            $sql_parameter_array[] = &$student_profile_id;
            $sql_parameter_array[] = &$product_id;
            $sql_parameter_array[] = &$question_id;
            $sql_parameter_array[] = &$parent_slp_id;
            $sql_parameter_array[] = &$assignment_id;
            $sql_parameter_array[] = &$answer;
            $sql_parameter_array[] = &$is_correct;
            $sql_parameter_array[] = &$score;
            $sql_parameter_array[] = &$creation_date;
            $sql_parameter_array[] = &$modified_date;
            $sql_parameter_array[] = &$question_data;
            $sql_parameter_array[] = &$question_type;
            $sql_parameter_array[] = &$spotlight_skill_id;
            $sql_parameter_array[] = &$school_customer_id;

            $statement_return_obj = $this->executeQuery($this->_lockerdbConn, $sql_statement, $sql_parameter_array);
            if ($statement_return_obj == false) {
                $error_message = "DB Error - Inserting an Assignment Quiz Result - $function_name.";
                echo $this->setReturnStatus($this->_jsonFailure, $error_message);
                exit;
            }

            $assignment_quiz_result_obj = $this->getresult($statement_return_obj);
            $first_position_in_array = 0;
            if (!empty($assignment_quiz_result_obj[$first_position_in_array])) {
                $assignment_quiz_result_id = $assignment_quiz_result_obj[$first_position_in_array]['quiz_results_id'];
            } else {
                $error_message = "NO quiz_result_id returned - $function_name.";
                echo $this->setReturnStatus($this->_jsonFailure, $error_message);
                exit;
            }

            echo $this->setReturnStatus($this->_jsonSuccess, 'set_cclicks_assignment_quiz_result successful.', json_encode($assignment_quiz_result_id));
        } catch (Exception $ex) {
            echo $this->setReturnStatus($this->_jsonFailure, $ex->getMessage());
        }

    }

    /**
     * update_cclicks_assignment_date_completed
     *
     * This function updates the assignment date completed
     * 
     * @author  potluri
     * @access  public 
     * @param profile_id
     * @param assignment_id
     * @param date_completed
     * @return  1 / Error
     */
    public function update_cclicks_assignment_date_completed() {
        try {
            $function_name = 'update_cclicks_assignment_date_completed';
            $postobj = $this->getPostData();
            $profile_id = (isset($postobj['profile_id']) && $postobj['profile_id'] != '') ? $postobj['profile_id'] : "";
            $assignment_id = (isset($postobj['assignment_id']) && $postobj['assignment_id'] != '') ? $postobj['assignment_id'] : "";
            $date_completed = (isset($postobj['date_completed']) && $postobj['date_completed'] != '') ? $postobj['date_completed'] : "";

            if ($profile_id == "" || $assignment_id == "") {
                throw new Exception($function_name . " - cclicks Error: Missing required fields:" . json_encode($postobj));
                return -1;
            }
            $product_db_class = $this->_product_db_class;
            $profile_id = $this->createDbConnection($profile_id, $product_db_class);
            //insert into assignments table...
            $sql_statement = "CALL " . CCLICKS_UPDATE_ASSIGNMENT_PROFILE_DATE_COMPLETED . "(?,?)";
            $sql_parameter_array = array();
            $sql_parameter_array[] = "ss";
            $sql_parameter_array[] = &$assignment_id;
            $sql_parameter_array[] = &$date_completed;

            $statement_return_obj = $this->executeQuery($this->_lockerdbConn, $sql_statement, $sql_parameter_array);
            if ($statement_return_obj == false) {
                $error_message = "DB Error - Updating an Assignment Completion Date - $function_name.";
                echo $this->setReturnStatus($this->_jsonFailure, $error_message);
                exit;
            }
            echo $this->setReturnStatus($this->_jsonSuccess, $function_name . ' successful.', '1');
        } catch (Exception $ex) {
            echo $this->setReturnStatus($this->_jsonFailure, $ex->getMessage());
        }
    }

    /**
     * update_cclicks_assignment_status
     *
     * This function updates the assignment status (not started, in progress, completed)
     * 
     * @author  potluri
     * @params profile_id
     * @params assignment_id
     * @params status
     * @access  public 
     * @return  1 /  Error
     * 
     */
    public function update_cclicks_assignment_status() {
        try {
            $function_name = 'update_cclicks_assignment_status';
            $postobj = $this->getPostData();
            $profile_id = (isset($postobj['profile_id']) && $postobj['profile_id'] != '') ? $postobj['profile_id'] : "";
            $assignment_id = (isset($postobj['assignment_id']) && $postobj['assignment_id'] != '') ? $postobj['assignment_id'] : "";
            $status = (isset($postobj['status']) && $postobj['status'] != '') ? $postobj['status'] : "";

            if ($profile_id == "" || $assignment_id == "" || $status == "") {
                throw new Exception($function_name . " - cclicks Error: Missing required fields:" . json_encode($postobj));
                return -1;
            }
            $product_db_class = $this->_product_db_class;
            $profile_id = $this->createDbConnection($profile_id, $product_db_class);
            //insert into assignments table...
            $sql_statement = "CALL " . CCLICKS_UPDATE_ASSIGNMENT_PROFILE_STATUS . "(?,?)";
            $sql_parameter_array = array();
            $sql_parameter_array[] = "ss";
            $sql_parameter_array[] = &$assignment_id;
            $sql_parameter_array[] = &$status;

            $statement_return_obj = $this->executeQuery($this->_lockerdbConn, $sql_statement, $sql_parameter_array);
            if ($statement_return_obj == false) {
                $error_message = "DB Error - Updating an Assignment Status - $function_name.";
                echo $this->setReturnStatus($this->_jsonFailure, $error_message);
                exit;
            }
            echo $this->setReturnStatus($this->_jsonSuccess, $function_name . ' successful.', '1');
        } catch (Exception $ex) {
            echo $this->setReturnStatus($this->_jsonFailure, $ex->getMessage());
        }
    }

}
