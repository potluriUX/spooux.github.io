<?php

/**
	* CSV_Core.php
	*
	* This file is a core class for csv reports. 
	* DO NOT change it. 
	* 
	* the class is abstract core class to generate csv reports.
	* extend the class implement both the headers(to give headers) and get_data to pass data array back
	* Then this class generates a csv. Checkout the controller.php file also.
	*
	* @author ravi
	*
	*/
include_once($_SERVER["PHP_INCLUDE_HOME"]."nsgra1/assessments/GI_Assessments.php");
require_once($_SERVER['PHP_INCLUDE_HOME'].'/' . 'nsgra1' . '/assessments/GI_AssessmentsDisplayStep3.php');
require_once($_SERVER['PHP_INCLUDE_HOME'].'/' . 'nsgra1' . '/assessments/GI_AssessmentsDisplayStep2.php');
require_once($_SERVER['PHP_INCLUDE_HOME'].'/nsgra1/GI_MyClass.php');
abstract class CSV_Core{
	/**
	* Constructor
	*
	* This method just initializes the member variables for
	* the class. 
	*
	* @author ravi
	* @access  public 
	*/
	public function __construct(){
		$this->_cookieReader  = new Cookie_Reader($_SERVER['AUTH_PCODE']);
		$this->_lockerclient = new Locker_Client();
		$this->_assessments  = new GI_Assessments();
		$this->_profileID = $this->_cookieReader->getprofileid();
		$this->_recepientID = $this->_cookieReader->getrecipientid();
		$this->data = array();
		$this->time_periods = $this->_assessments->getTimePeriod();
		$this->product_band = $this->_cookieReader->getproductband();
		$this->flag = true;

		
	}
	abstract function headers();
	abstract function get_data($properties);
	abstract function get_filename();
	function set_data($data){
		
		
		if(count($this->headers()) != count($data[1])){
			echo 'Headers and Data count doesnt match!';
		}

		else{
			if(empty($data[0])){
				$data[0] = $this->headers();
				$this->data = $data;
				ksort($this->data);
				return true;//only then generate csv
			}
			else{
				echo '$data array should start with index 1 not zero. print data array and check';
			}
		}
	}

	/**
	 * get profile info
	 */
	public function getProfile($profileid)
	{
		$productGroup = $_SERVER['AUTH_PCODE'];
		$action  = 'getprofile';
		$action_parameters = array($profileid);
		$profileobj = $this->_lockerclient->call_server($productGroup, $action, $action_parameters);
		//$profileobj = $this->_client->getprofile($profileid);

		return $profileobj;

	}
	public function get_schools(){

	}
	public function get_teachers(){

	}

	public function get_classes($teacherid){


		$this->print_r($this->_assessments->getClassList());

	}
	public function get_students($classid){
		$action = 'getclassstudentlist';
		$productGroup = $_SERVER['AUTH_PCODE'];
		$action_parameters = array($this->_profileID, $classid, $productGroup, '1');//0 returns both active, non active students
		$classlist = $this->_lockerclient->call_server($productGroup, $action, $action_parameters);
		return $classlist;

	}
	public function print_r($array){
		echo "<pre>" . print_r($array, true) . "</pre>" ;
	}
	public function process_date_to_get_year($year){
		return substr($classobj->_sessionenddate,0,4);
	}



	/**
	* download_send_headers
	*
	* 
	*
	* @author  Ravi
	* @access  public 
	* 
	* @return  Array
	* 
	* @param   
	* 
	* 
	*/
	function download_send_headers() {
		if($this->flag){
			// disable caching
			$now = gmdate("D, d M Y H:i:s");
			header("Expires: Tue, 03 Jul 2001 06:00:00 GMT");
			header("Cache-Control: max-age=0, no-cache, must-revalidate, proxy-revalidate");
			header("Last-Modified: {$now} GMT");

			// force download
		/*	header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");*/
			
			$filename = $this->get_filename();
			// disposition / encoding on response body
			header("content-type:application/csv;charset=UTF-8");
			header("Content-Disposition: attachment;filename={$filename}");
			
		}

	}
	function array2csv()
	{
		if (count($this->data) == 0) {
			return null;
		}
		if($this->flag)
		ob_get_clean();
		ob_start();
		$df = fopen("php://output", 'w');

		foreach ($this->data as $row) {
			//$temp = htmlspecialchars($row);
		
			fputcsv($df,str_replace('&#x2019;', "'", $row));
		}
		fclose($df);
		return ob_get_clean();
	}
	/**
	* getassessmentdetails
	*
	* This function returns assessment details.
	*
	* @author  Ravi
	* @access  public 
	* 
	* @return  Array
	* 
	* @param   
	* 
	* 
	*/
	public function getassessmentdetails($studentprofileid, $grade, $time_period, $assessment_type)
	{
		$assessmentdetail = array();

		$assessmentdetailgetobj = new stdClass;
		$assessmentdetailgetobj->_profile_id = $studentprofileid;
		$assessmentdetailgetobj->_grade_code = $grade;
		$assessmentdetailgetobj->_time_period_code = $time_period;
		$assessmentdetailgetobj->_assessment_type_code = $assessment_type;
		$action_parameters = array($assessmentdetailgetobj);
		//$this->print_r($action_parameters);
		$assessmentdetail = $this->_lockerclient->call_server($_SERVER['AUTH_PCODE'], 'get_assessment_detail', $action_parameters);

		return $assessmentdetail;
	}
	public function getdwkidata($classid)
	{

		$assessmentsDisplay = new GI_AssessmentsDisplayStep2();
		//print_r($assessmentsDisplay->step2progress_all_assessment_data ($classid));
		$step3SummaryArray=$assessmentsDisplay->step2progress_all_assessment_data ($classid);
		return $step3SummaryArray;
	}
	public function getlcadata($classid, $textType='')
	{
		//print $textType;
		//$productband = $this->_cookiereader->getproductband();

		$assessmentsDisplay = new GI_AssessmentsDisplay3();

		$step3SummaryArray = array();
		foreach ($this->time_periods as $time) {
			$step3SummaryArray[$time->_time_period_code] = $assessmentsDisplay->showStudnetGroupSummaryReportStep3($classid, $time->_time_period_code, $textType);
		}
		return $step3SummaryArray;
	}
	public function getracdata($classstudentlist, $teacherprofileid, $classid)
	{
		$racData = array();

		foreach($this->time_periods as $time_period)
		{
			$racassessmentgetobj = new stdClass;
			$racassessmentgetobj->_profile_id = $teacherprofileid;
			$racassessmentgetobj->_class_id = $classid;
			$racassessmentgetobj->_time_period_code = $time_period->_time_period_code;

			$action_parameters = array($racassessmentgetobj);

			$racassessment = $this->_lockerclient->call_server($_SERVER['AUTH_PCODE'], 'get_rac_assessments', $action_parameters);

			$racData[$time_period->_time_period_code] = array();

			foreach($classstudentlist as $student)
			{
				$book_details = $this->_assessments->getBook($racassessment[$student->_profileid]->_resource_slp_id);

				$racData[$time_period->_time_period_code][$student->_profileid]['type'] = $book_details[0]['type'];
                                if($racassessment[$student->_profileid]->_assessmentType == 1){
                                    $racData[$time_period->_time_period_code][$student->_profileid]['book_level'] = "PreA";
                                }elseif($racassessment[$student->_profileid]->_assessmentType == 2){
                                    $racData[$time_period->_time_period_code][$student->_profileid]['book_level'] = $book_details[0]['text_level']."*";
                                }else{
                                    $racData[$time_period->_time_period_code][$student->_profileid]['book_level'] = $book_details[0]['text_level'];
                                }
				
				$racData[$time_period->_time_period_code][$student->_profileid]['reading_level'] = $racassessment[$student->_profileid]->_reading_level ;

			}
		}
		return $racData;
	}

	public function get_class_properties($classid){
		$class = new GI_MyClass();
		$class_properties = $class->get_class_properties($classid);

		//echo $Classid."Ravi";
		return $class_properties;
		/*
		$responseArray['p'] = 'School Year ' . substr($class_properties->_sessionstartdate,0,4) . ' - ' . substr($class_properties->_sessionenddate,0,4);
		$responseArray['h3'] =  'Grade ' . $class_properties->_grade;
		*/
	}
	public function get_rac_data_for_one_timeperiod($time_period_code, $classid, $teacherprofileid){
		$racassessmentgetobj = new stdClass;
		$racassessmentgetobj->_profile_id = $teacherprofileid;
		$racassessmentgetobj->_class_id = $classid;
		$racassessmentgetobj->_time_period_code = $time_period_code;

		$action_parameters = array($racassessmentgetobj);

		$racassessment = $this->_lockerclient->call_server($_SERVER['AUTH_PCODE'], 'get_rac_assessments', $action_parameters);
		return $racassessment;
	}
}



