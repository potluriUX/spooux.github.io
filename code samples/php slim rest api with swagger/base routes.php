<?php

//Add routes here
$app->get('/api/'.$product.'/getcurrentdate', '\\'.$product.':getcurrentdate');
$app->post('/api/'.$product.'/getclasslist', '\\'.$product.':getclasslist');
$app->post('/api/'.$product.'/getclassstudentlist', '\\'.$product.':getclassstudentlist');
$app->post('/api/'.$product.'/updateprofilelastlogindate', '\\'.$product.':updateprofilelastlogindate');
$app->post('/api/'.$product.'/getprofile', '\\'.$product.':getprofile');
$app->post('/api/'.$product.'/insertassessment', '\\'.$product.':insertassessment');
$app->post('/api/'.$product.'/insertbookassessment', '\\'.$product.':insertbookassessment');
$app->post('/api/'.$product.'/updatebookassessment', '\\'.$product.':updatebookassessment');
$app->post('/api/'.$product.'/insertquestionassessment', '\\'.$product.':insertquestionassessment');
$app->post('/api/'.$product.'/updatequestionsassessment', '\\'.$product.':updatequestionsassessment');
$app->post('/api/'.$product.'/insertifthenassessment', '\\'.$product.':insertifthenassessment');
$app->post('/api/'.$product.'/deleteifthenassessment', '\\'.$product.':deleteifthenassessment');
$app->post('/api/'.$product.'/deletebookassessment', '\\'.$product.':deletebookassessment');
$app->post('/api/'.$product.'/getassessmentpage', '\\'.$product.':getassessmentpage');
$app->post('/api/'.$product.'/getbookassessment', '\\'.$product.':getbookassessment');
$app->post('/api/'.$product.'/getbookassessmentlist', '\\'.$product.':getbookassessmentlist');
$app->post('/api/'.$product.'/getquestionsassessmentlist', '\\'.$product.':getquestionsassessmentlist');
$app->post('/api/'.$product.'/getifthenassessmentlist', '\\'.$product.':getifthenassessmentlist');
$app->post('/api/'.$product.'/getgoalsassessmentlist', '\\'.$product.':getgoalsassessmentlist');
$app->post('/api/'.$product.'/deletegoalsassessment', '\\'.$product.':deletegoalsassessment');
$app->post('/api/'.$product.'/insertgoalsassessment', '\\'.$product.':insertgoalsassessment');
$app->post('/api/'.$product.'/getprofiledetails', '\\'.$product.':getprofiledetails');
$app->post('/api/'.$product.'/getclass', '\\'.$product.':getclass');
$app->post('/api/'.$product.'/getanecdotalrecordlist', '\\'.$product.':getanecdotalrecordlist');
$app->post('/api/'.$product.'/insertanecdotalrecord', '\\'.$product.':insertanecdotalrecord');
$app->post('/api/'.$product.'/deleteanecdotalrecord', '\\'.$product.':deleteanecdotalrecord');
$app->post('/api/'.$product.'/updateprofiledetails', '\\'.$product.':updateprofiledetails');
$app->post('/api/'.$product.'/getclassstudentgrouplist', '\\'.$product.':getclassstudentgrouplist');
$app->post('/api/'.$product.'/get_parent_info', '\\'.$product.':get_parent_info');
$app->post('/api/'.$product.'/get_grades_by_band', '\\'.$product.':get_grades_by_band');
$app->post('/api/'.$product.'/get_timeperiod', '\\'.$product.':get_timeperiod');

//include temp locker_base files to be merged and deleted later
require_once($_SERVER['PHP_INCLUDE_API'].'product_classes/locker_base0.php');
require_once($_SERVER['PHP_INCLUDE_API'].'product_classes/locker_base1.php');
require_once($_SERVER['PHP_INCLUDE_API'].'product_classes/locker_base2.php');


require_once($_SERVER['PHP_INCLUDE_API'].'product_classes/locker_base.php');
