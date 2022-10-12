<?php

/**
	* Controller.php
	*
	* This file is a controller for csv reports. 
	* DO NOT change it. We call various reports and pass them parameters as an object
	* get_data is an abstract function implemented in the class being called. 
	*
	* @author ravi
	*
	*/
$GI_STATS3_PARAMETERS = array(
		1=>'report',    // Feature
		3=>'pfe'  // Service
		);

		require_once($_SERVER['PHP_INCLUDE_HOME'].'common/statistics/recordstatisticshit.php');
$classid = $_REQUEST['classid'];
$studentid = $_REQUEST['studentid'];
$file = $_REQUEST['file'];
$timecode = $_REQUEST['timecode'];
$text_type = $_REQUEST['texttype'];

$teacherid = '';
$schoolid = '';
function __autoload($class) {
	include "$class.php";
}

$csv_export = new $file();

$properties = new stdClass();
$properties->classid = $classid;
$properties->studentid = $studentid;
$properties->timecode = $timecode;
$properties->text_type = $text_type;
$data = $csv_export->get_data($properties);

if($csv_export->set_data($data)){//u have already called get_data by this time.
	
	$csv_export->download_send_headers();
}

echo $csv_export->array2csv();
