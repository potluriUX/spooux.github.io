<?php

define('SWG_BASE_URL', 'http://tg-dlapi3-d.digital.scholastic.com'); //change it to Amazon AWS cloud workstation IP address
//using unit testing. key pair login to the amazon aws machine
define('SWG_API_CCLICKS_PATH', '/api/cclicks/');

class UnitTestCClicks extends PHPUnit_Framework_TestCase {

    protected $client;

    protected function setUp() {
    	//guzzle rest client that calls the api and passes the parameters and assserts the output. 
        $this->client = new GuzzleHttp\Client();
    }

    /**
     * Test added for get_cclicks_current_class_year API call
     * created by: potluri
     * 
     */
    public function testCclicksCurrentClassYear() {
        $current_class_year = "2015-01-01";
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_cclicks_current_class_year', [
            'json' => [['profile_id' => '104.120']]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $resp_data = (isset($data['current_class_year']) && $data['current_class_year'] != "") ? $data['current_class_year'] : "";
            $this->assertEquals($current_class_year, $resp_data);
        }
    }

    /**
     * Test added for get_cclicks_current_class_year API call
     * created by: potluri 
     * 
     */
    public function testGetProfileGrouplist() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_profile_grouplist', [
            'json' => [[
            'profile_id' => '104.120',
            'class_id' => '2582',
            'product_id' => 'cclicks'
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data); //checking whether response is not empty
        }
    }

    /**
     * Test added for assign_group_to_student API call
     * created by: potluri 
     * 
     */
    public function testAssignGroupToStudent() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'assign_group_to_student', [
            'json' => [[
            'profile_id' => '104.120',
            'group_id' => '194146.44'
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = json_decode($data['data'], true);
            $this->assertEquals(1, $data);
        }
    }

    /**
     * Test added for create_profile_group API call
     * created by: potluri 
     * 
     */
    public function testCreateProfileGroup() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'create_profile_group', [
            'json' => [
                [
                    "profile_id" => "104.120",
                    "product_id" => "cclicks",
                    "class_id" => "2582"
                ], "test2", ""]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = json_decode($data['data'], true);
            $this->assertNotEmpty($data);
        }
    }

    /**
     * Test added for create_profile_group API call
     * created by: potluri 
     * 
     */
    public function testDeleteProfileGroup() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'delete_profile_group', [
            'json' => [[
            'profile_id' => '104.120',
            'group_id' => '104.220',
            'delete_type' => 'deletegroup',
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = json_decode($data['data'], true);
            $this->assertEquals(1, $data);
        }
    }

    /**
     * Test added for get_class_group_for_a_student API call
     * created by: potluri 
     * 
     */
    public function testGetClassGroupForAStudent() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_class_group_for_a_student', [
            'json' => [[
            'student_profile_id' => '5128.120',
            'class_id' => '2582',
            'product_id' => 'cclicks',
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data['groupname']);
        }
    }

    /**
     * Test added for get_cclicks_assignment_quiz_results_for_a_student API call
     * created by: potluri 
     * 
     */
    public function testGetCclicksAssignmentQuizResultsForAStudent() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_cclicks_assignment_quiz_results_for_a_student', [
            'json' => [[
            'student_profile_id' => '5128.120',
            'assignment_id' => '194146.1321',
            'product_id' => 'cclicks',
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }

    /**
     * Test added for update_cclicks_assignment_quiz_results_score API call
     * created by: potluri 
     * 
     */
    public function testUpdateCclicksAssignmentQuizResultsScore() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'update_cclicks_assignment_quiz_results_score', [
            'json' => [[
            "profile_id" => "5128.120",
            "quiz_results_id" => "194643.37",
            "score" => "5"
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = json_decode($data['data'], true);
            $this->assertEquals(1, $data);
        }
    }

    /**
     * Test added for update_cclicks_assignment_quiz_results_is_correct API call
     * created by: potluri 
     * 
     */
    public function testUpdateCclicksAssignmentQuizResultsIsCorrect() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'update_cclicks_assignment_quiz_results_is_correct', [
            'json' => [[
            "profile_id" => "5128.120",
            "quiz_results_id" => "194643.37",
            "is_correct" => "p"
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = json_decode($data['data'], true);
            $this->assertEquals(1, $data);
        }
    }

    /**
     * Test added for update_cclicks_assignment_total_score API call
     * created by: potluri 
     * 
     */
    public function testUpdateCclicksAssignmentTotalScore() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'update_cclicks_assignment_total_score', [
            'json' => [[
            "profile_id" => "140.120",
            "assignment_id" => "194146.1321",
            "total_score" => "35"
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = json_decode($data['data'], true);
            $this->assertEquals(1, $data);
        }
    }

    /**
     * Test added for get_ebook_json_page API call
     * created by: potluri  
     * 
     */
    public function testGetEbookJsonPage() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_ebook_json_page', [
            'json' => [[
            "profileid" => "5128.120",
            "grandparentid" => "ccts0066",
            "productid" => "cclicks"
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }
    
    /**
     * Test added for get_cclicks_ts_sv_assignments_for_a_student API call
     * created by: potluri  
     * 
     */
    public function testGetCclicksTsSvAssignmentsForAStudent() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_cclicks_ts_sv_assignments_for_a_student', [
            'json' => [[
            "student_profile_id" => "5128.120",
            "product_id" => "cclicks",
            "class_id" => "2582"
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }
    
    /**
     * Test added for get_cclicks_rc_assignments_for_a_student API call
     * created by: potluri  
     * 
     */
    public function testGetCclicksRcAssignmentsForAStudent() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_cclicks_rc_assignments_for_a_student', [
            'json' => [[
            "student_profile_id" => "5128.120",
            "product_id" => "cclicks",
            "class_id" => "2582"
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }
    
    /**
     * Test added for get_teacher_list_for_admin API call
     * created by: potluri  
     * 
     */
    public function testGetTeacherListForAdmin() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_teacher_list_for_admin', [
            'json' => [["1013.120","194146","cclicks"]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }
    
    /**
     * Test added for get_school_list_for_admin API call
     * created by: potluri  
     * 
     */
    public function testGetSchoolListForAdmin() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_school_list_for_admin', [
            'json' => [["1013.120","194146","cclicks"]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }
    
    /**
     * Test added for get_product_grades API call
     * created by: potluri  
     * 
     */
    public function testGetProductGrades() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_product_grades', [
            'json' => [[
                "product_id" => "cclicks"
            ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }

    /**
     * Test added for set_multiple_cclicks_assignments API call
     * created by: potluri  
     */
    public function testSetMultipleCClicksAssignments() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'set_multiple_cclicks_assignments', [
            'json' => [[
            'assignment_id' => '',
            'teacher_profile_id' => '194146.800088563',
            'student_profile_id' => '274117',
            'class_id' => '194146.2203',
            'school_customer_id' => '800088563',
            'product_id' => 'cclicks',
            'assignment_component_type' => 'read',
            'assignment_type' => 't_study',
            'title' => '',
            'date_assigned' => '2016-04-26 14=>41=>40',
            'creationdate' => '2016-04-26 14=>41=>40',
            'date_due' => '2016-04-05 00=>00=>00',
            'active' => '1',
            'status' => '3',
            'asset_id' => 'ccts0005_read',
            'date_complete' => '',
            'total_score' => null,
            'audio' => 'Y',
            'lexile' => '',
            'grl' => '',
            'text_complexity' => '',
            'grade' => 'K',
            'year' => '2015_2016'
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = json_decode($data['data'], true);
            $this->assertEquals("set_multiple_cclicks_assignments successful.", $data['message']);
        }
    }

    /**
     * Test added for set_cclicks_assignment_quiz_result API call
     * created by: potluri  
     */
    public function testSetCClicksAssignmentQuizResult() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'set_cclicks_assignment_quiz_result', [
            'json' => [[
            'student_profile_id' => '5128.120',
            'product_id' => 'cclicks',
            'question_id' => 'ccts0011_qq1',
            'parent_slp_id' => 'ccts0011_quest',
            'assignment_id' => '194146.166696',
            'answer' => 'A',
            'is_correct' => 'false',
            'score' => '0',
            'question_type' => 'mc',
            'spotlight_skill_id' => null,
            'school_customer_id' => '120',
            'question_data' => '{"IsCorrect":"false", "QID":"ccts0011_qq1", "pageid":"1", "question_type":"singleselect", "sectionid":"questionquest", "users_response":"A"}'
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = json_decode($data['data'], true);
            $this->assertNotEmpty($data);
        }
    }

    /**
     * Test added for update_cclicks_assignment_date_completed API call
     * created by: potluri  
     */
    public function testUpdateCClicksAssignmentDateCompleted() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'update_cclicks_assignment_date_completed', [
            'json' => [[
            'profile_id' => '5128.120',
            'assignment_id' => '194146.105074',
            'date_completed' => ''
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = json_decode($data['data'], true);
            $this->assertNotEmpty($data);
            $this->assertEquals(1, $data);
        }
    }
    
    
     /**
     * Test added for update_cclicks_assignment_status API call
     * created by: potluri  
     */
    public function testUpdateCClicksAssignmentStatus() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'update_cclicks_assignment_status', [
            'json' => [[
            'profile_id' => '5128.120',
            'assignment_id' => '194146.105074',
            'status' => '2'
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = json_decode($data['data'], true);
            $this->assertNotEmpty($data);
            $this->assertEquals(1, $data);
        }
    }

    
            /**
     * Test added for get_cclicks_rc_assignments_for_a_student API call
     * created by: potluri  
     * 
     */
    public function testGet_cclicks_assignments_for_a_class() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_cclicks_assignments_for_a_class', [
            'json' => [["teacher_profile_id"=>"104.120","product_id"=>"cclicks","class_id"=>"2582","view_by"=>"assignment"]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }
    
    
     /**
     * Test added for get_students_with_no_cclicks_assignments_by_class API call
     * created by: potluri  
     * 
     */
    public function testGet_students_with_no_cclicks_assignments_by_class() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_students_with_no_cclicks_assignments_by_class', [
            'json' => [["profile_id"=>"104.120","class_id"=>"2582"]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }
    
    /**
     * Test added for update_cclicks_assignment_date_due API call
     * created by: potluri  
     * 
     */
    public function testUpdate_cclicks_assignment_date_due() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'update_cclicks_assignment_date_due', [
            'json' => [["profile_id"=>"104.120","assignment_id"=>"194146.105062","date_due"=>"2016-04-04 00=>00=>00"]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $this->assertEquals(1, $data['status']);
            $this->assertEquals("update_cclicks_assignment_date_due updated successfully.", $data['message']);
        }
    }
    
    public function testDelete_multiple_cclicks_assignments() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'delete_multiple_cclicks_assignments', [
            'json' => [[["profile_id"=>"194146.800088563","assignment_id"=>"194146.245120","assignment_component_id"=>"194146.245120"]]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $this->assertEquals(1, $data['status']);
            $this->assertEquals("delete_multiple_cclicks_assignments successful.", $data['message']);
        }
    }
    
    
                /**
     * Test added for get_cclicks_assignments_for_a_student API call
     *  
     * 
     */
    public function testGet_cclicks_assignments_for_a_student() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_cclicks_assignments_for_a_student', [
            'json' => [["student_profile_id"=>"5128.120","product_id"=>"cclicks"]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }
    /*
    * Test added for get_cclicks_all_qq_assignment_quiz_results_for_a_class API call
     *  
     * 
     */
        public function testGet_cclicks_all_qq_assignment_quiz_results_for_a_class() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_cclicks_all_qq_assignment_quiz_results_for_a_class', [
            'json' => [["teacher_profile_id"=>"104.120","product_id"=>"cclicks","class_id"=>"2582"]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }
    
    /*
    * Test added for get_cclicks_all_rc_assignment_quiz_results_for_a_class API call
     *  
     * 
     */
    public function testGet_cclicks_all_rc_assignment_quiz_results_for_a_class() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_cclicks_all_rc_assignment_quiz_results_for_a_class', [
            'json' => [["teacher_profile_id"=>"104.120","product_id"=>"cclicks","class_id"=>"2582"]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }
    
    /*
     *  Test added for get_cclicks_assignments_for_a_class_by_assignment_type API call
     *  
     * 
     */
    public function testGet_cclicks_assignments_for_a_class_by_assignment_type() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_cclicks_assignments_for_a_class_by_assignment_type', [
            'json' => [["teacher_profile_id"=>"104.120","product_id"=>"cclicks","class_id"=>"2582","assignment_type"=>"chkpt","view_by"=>""]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }
    
    /**
     * Test added for update_cclicks_assignment_status API call
     * created by: potluri  
     */
    public function testParentInfo() {
        $data = array();
        $response = $this->client->post(SWG_BASE_URL . SWG_API_CCLICKS_PATH . 'get_parent_info', [
            'json' => [[
            'profile_id' => '1018.123',
            'role' => '1',
                ]]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        if (isset($data) && !empty($data)) {
            $data = $data['data'];
            $this->assertNotEmpty($data);
        }
    }
    
}

?>