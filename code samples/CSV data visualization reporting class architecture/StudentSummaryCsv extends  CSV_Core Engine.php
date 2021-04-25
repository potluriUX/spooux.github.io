<?php 


class StudentSummaryCsv extends  CSV_Core{
	
	public function headers(){
		
		if ($this->product_band=='nsgra36') {
			$reporttitle='Whole-Class Comp Score';
		} else if ($this->product_band=='nsgrak2') {
			$reporttitle='Listening Comp Score';
		}
		
		
		return array('Teacher', 'School Year',  'Class Name', 'Class Grade', 'Student ID','Student Grade', 'Student Name', 'Time Period', 'DWKI Spelling Stage',
		'Notes', $reporttitle, 'Notes'
		, 'Reading Assessment Conference Book Level', 'Notes');

	}
	public function get_data($properties){
		//$this->flag=false;//debug flag to check print statements. dialog box wont be shown if false.
		$classid = $properties->classid;
		$studprofid = $properties->studentid;
		$recipientid = $this->_recepientID;

		$studentprofileid = $studprofid . "." . $recipientid;

		$dwkiData = $this->getdwkidata($classid);
		//Get the LCA data to display
		$lcaData = $this->getlcadata($classid);

		$racData = $this->getracdata($this->get_students($classid),$this->_profileID, $classid);
		$i=1;//always one. zero is for headers.

		$class_properties = $this->get_class_properties($classid);
		//print_r($class_properties);
		$profile = $this->getProfile($studentprofileid);
		foreach($this->time_periods as $time_period)
		{
			//Get the notes for this user.
			$data[$i][] = $this->_cookieReader->getname();

			$data[$i][] = substr($class_properties->_sessionstartdate,0,4) . ' - ' . substr($class_properties->_sessionenddate,0,4);

			$data[$i][] = $class_properties->_classname;//classname
			$data[$i][]= $class_properties->_grade;//grade ikkada undi kada grade adi class di nee dash
			$data[$i][] = $profile->_studentid;
                        $data[$i][] = $profile->_grade;
			$data[$i][]= $profile->_lastname . ',' . $profile->_firstname ;//student name
			$data[$i][] = $time_period->_name;//timeperiod
			$data[$i][] = $dwkiData[$time_period->_time_period_code . '.' .$studprofid][1];//DWKI Spelling Stage

			$assessment_details = $this->getassessmentdetails($studentprofileid,$class_properties->_grade,$time_period->_time_period_code,'dwki');

			$data[$i][] = $assessment_details->_note;//notes

			$data[$i][] = ' ' . $lcaData[$time_period->_time_period_code][$studprofid]['correct']
			.'/'
			. $lcaData[$time_period->_time_period_code][$studprofid]['outof'] ;//Listening Comp Score
			$assessment_details = $this->getassessmentdetails($studentprofileid,$class_properties->_grade,$time_period->_time_period_code,'lca');
			$data[$i][] = $assessment_details->_note ;//Notes

			$data[$i][] = $racData[$time_period->_time_period_code][$studprofid]['book_level'];//Reading Assessment Conference Book Level
			$assessment_details = $this->getassessmentdetails($studentprofileid,$class_properties->_grade,$time_period->_time_period_code,'rac');
			$data[$i][] =$assessment_details->_note;//notes

			$i++;
		}




		//$this->print_r($this->headers());

		//$this->print_r($data);
		return $data;
	}
	public function get_filename(){
		return 'NSGRA-Summary-StudentProgress' . date("y-m-d") . '.csv';
	}

}