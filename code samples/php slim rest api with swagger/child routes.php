<?php

//Only routes unique to cclicks need to be defined here, there is no need to define the one's already definded in locker_base
/*ravi start*/
$app->post('/api/'.$product.'/get_cclicks_assignments_for_a_class', '\\'.$product.':get_cclicks_assignments_for_a_class');
$app->post('/api/'.$product.'/get_students_with_no_cclicks_assignments_by_class', '\\'.$product.':get_students_with_no_cclicks_assignments_by_class');
$app->post('/api/'.$product.'/update_cclicks_assignment_date_due', '\\'.$product.':update_cclicks_assignment_date_due');
$app->post('/api/'.$product.'/delete_multiple_cclicks_assignments', '\\'.$product.':delete_multiple_cclicks_assignments');
$app->post('/api/'.$product.'/get_cclicks_assignments_for_a_student', '\\'.$product.':get_cclicks_assignments_for_a_student');
$app->post('/api/'.$product.'/get_cclicks_all_rc_assignment_quiz_results_for_a_class', '\\'.$product.':get_cclicks_all_rc_assignment_quiz_results_for_a_class');
$app->post('/api/'.$product.'/get_cclicks_all_qq_assignment_quiz_results_for_a_class', '\\'.$product.':get_cclicks_all_qq_assignment_quiz_results_for_a_class');
$app->post('/api/'.$product.'/get_cclicks_assignments_for_a_class_by_assignment_type', '\\'.$product.':get_cclicks_assignments_for_a_class_by_assignment_type');


$app->post('/api/'.$product.'/set_multiple_cclicks_assignments', '\\'.$product.':set_multiple_cclicks_assignments');
$app->post('/api/'.$product.'/set_cclicks_assignment_quiz_result', '\\'.$product.':set_cclicks_assignment_quiz_result');
$app->post('/api/'.$product.'/update_cclicks_assignment_date_completed', '\\'.$product.':update_cclicks_assignment_date_completed');
$app->post('/api/'.$product.'/update_cclicks_assignment_status', '\\'.$product.':update_cclicks_assignment_status');

$app->post('/api/'.$product.'/get_cclicks_current_class_year', '\\'.$product.':get_cclicks_current_class_year');
$app->post('/api/'.$product.'/get_profile_grouplist', '\\'.$product.':get_profile_grouplist');
$app->post('/api/'.$product.'/assign_group_to_student', '\\'.$product.':assign_group_to_student');
$app->post('/api/'.$product.'/create_profile_group', '\\'.$product.':create_profile_group');
$app->post('/api/'.$product.'/delete_profile_group', '\\'.$product.':delete_profile_group');
$app->post('/api/'.$product.'/get_class_group_for_a_student', '\\'.$product.':get_class_group_for_a_student');
$app->post('/api/'.$product.'/get_cclicks_assignment_for_a_student', '\\'.$product.':get_cclicks_assignment_for_a_student');
$app->post('/api/'.$product.'/get_cclicks_assignment_quiz_results_for_a_student', '\\'.$product.':get_cclicks_assignment_quiz_results_for_a_student');
$app->post('/api/'.$product.'/update_cclicks_assignment_quiz_results_score', '\\'.$product.':update_cclicks_assignment_quiz_results_score');
$app->post('/api/'.$product.'/get_cclicks_assignment', '\\'.$product.':get_cclicks_assignment');
$app->post('/api/'.$product.'/update_cclicks_assignment_quiz_results_is_correct', '\\'.$product.':update_cclicks_assignment_quiz_results_is_correct');
$app->post('/api/'.$product.'/update_cclicks_assignment_total_score', '\\'.$product.':update_cclicks_assignment_total_score');
$app->post('/api/'.$product.'/get_ebook_json_page', '\\'.$product.':get_ebook_json_page');
$app->post('/api/'.$product.'/get_cclicks_ts_sv_assignments_for_a_student', '\\'.$product.':get_cclicks_ts_sv_assignments_for_a_student');
$app->post('/api/'.$product.'/get_cclicks_rc_assignments_for_a_student', '\\'.$product.':get_cclicks_rc_assignments_for_a_student');
$app->post('/api/'.$product.'/get_cclicks_all_rc_assignments_quiz_results_for_a_student', '\\'.$product.':get_cclicks_all_rc_assignments_quiz_results_for_a_student');
$app->post('/api/'.$product.'/get_teacher_list_for_admin', '\\'.$product.':get_teacher_list_for_admin');
$app->post('/api/'.$product.'/get_school_list_for_admin', '\\'.$product.':get_school_list_for_admin');
$app->post('/api/'.$product.'/get_product_grades', '\\'.$product.':get_product_grades');


//include temp locker_base files to be merged and deleted later
require_once($_SERVER['PHP_INCLUDE_API'].'product_classes/cclicks0.php');
require_once($_SERVER['PHP_INCLUDE_API'].'product_classes/cclicks1.php');
require_once($_SERVER['PHP_INCLUDE_API'].'product_classes/cclicks2.php');

//include cclicks class
require_once($_SERVER['PHP_INCLUDE_API'].'product_classes/cclicks.php');