<?php
use Swagger\Annotations as SWG;
/**
*
* @SWG\Post(
* path="/get_cclicks_current_class_year",
* tags={"G"},
* operationId="getCclicksCurrentClassYear",
* summary="Get The Current Class Year List",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""104.120""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""104.120""}]",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/get_profile_grouplist",
* tags={"G"},
* operationId="getProfileGrouplist",
* summary="Get Profile Group List",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""104.120"",""class_id"":""2582"",""product_id"":""cclicks""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""104.120"",""class_id"":""2582"",""product_id"":""cclicks""}]",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/assign_group_to_student",
* tags={"A"},
* operationId="assignGroupToStudent",
* summary="Assign Group To Student",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""5132.120"",""group_id"":""194146.44""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""5132.120"",""group_id"":""194146.44""}]",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/create_profile_group",
* tags={"C"},
* operationId="createProfileGroup",
* summary="Assign Group To Student",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""104.120"",""product_id"":""cclicks"",""class_id"":""2582""},""test2"",""""]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""104.120"",""product_id"":""cclicks"",""class_id"":""2582""},""test2"",""""]. If group_id is present it will update else it will insert.",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/delete_profile_group",
* tags={"D"},
* operationId="deleteProfileGroup",
* summary="Delete Profile Group",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""104.120"",""group_id"":"""",""delete_type"":""deletegroup""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""104.120"",""group_id"":"""",""delete_type"":""deletegroup""}]. Please mention the group_id which you want to delete. Deafult value for delete_type is ""deletegroup"", another option is ""deletegroupbyuser"".",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/get_class_group_for_a_student",
* tags={"G"},
* operationId="getClassGroupForAStudent",
* summary="Get Class Group For a Student",
* @SWG\Parameter(
*                   defaultValue="[{""student_profile_id"":""5128.120"",""class_id"":""2582"",""product_id"":""cclicks""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""student_profile_id"":""5128.120"",""class_id"":""2582"",""product_id"":""cclicks""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/get_cclicks_assignment_for_a_student",
* tags={"G"},
* operationId="getCclicksAssignmentForAStudent",
* summary="Get Assignments For a Student",
* @SWG\Parameter(
*                   defaultValue="[{""student_profile_id"":""5128.120"",""product_id"":""cclicks"",""assignment_id"":""194146.99472""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""student_profile_id"":""5128.120"",""product_id"":""cclicks"",""assignment_id"":""194146.99472""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/get_cclicks_assignment_quiz_results_for_a_student",
* tags={"G"},
* operationId="getCclicksAssignmentQuizResultsForAStudent",
* summary="Get Assignment Quiz Results For a Student",
* @SWG\Parameter(
*                   defaultValue="[{""student_profile_id"":""5128.120"",""product_id"":""cclicks"",""assignment_id"":""194146.1321""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""student_profile_id"":""5128.120"",""product_id"":""cclicks"",""assignment_id"":""194146.1321""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/update_cclicks_assignment_quiz_results_score",
* tags={"U"},
* operationId="updateCclicksAssignmentQuizResultsScore",
* summary="Update  Assignment Quiz Results Score For a Student",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""5128.120"",""quiz_results_id"":""194643.37"",""score"":""5""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""5128.120"",""quiz_results_id"":""194643.37"",""score"":""5""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/get_cclicks_assignment",
* tags={"G"},
* operationId="getCclicksAssignment",
* summary="Get Assignment For a Teacher",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""140.120"",""assignment_id"":""194146.1321""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""140.120"",""assignment_id"":""194146.1321""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/update_cclicks_assignment_quiz_results_is_correct",
* tags={"U"},
* operationId="updateCclicksAssignmentQuizResultsIsCorrect",
* summary="Update Assignment Quiz Results Is Correct",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""140.120"",""quiz_results_id"":""194643.37"",""is_correct"":""p""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""140.120"",""quiz_results_id"":""194643.37"",""is_correct"":""p""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/update_cclicks_assignment_total_score",
* tags={"U"},
* operationId="updateCclicksAssignmentTotalScore",
* summary="Update Assignment Total Score",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""140.120"",""assignment_id"":""194146.1321"",""total_score"":""35""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""140.120"",""assignment_id"":""194146.1321"",""total_score"":""35""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/get_ebook_json_page",
* tags={"G"},
* operationId="getEbookJsonPage",
* summary="Get Ebook Json Page",
* @SWG\Parameter(
*                   defaultValue="[{""profileid"":""5128.120"",""grandparentid"":""ccts0066"",""productid"":""cclicks""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profileid"":""5128.120"",""grandparentid"":""ccts0066"",""productid"":""cclicks""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/get_cclicks_ts_sv_assignments_for_a_student",
* tags={"G"},
* operationId="getCclicksTsSvAssignmentsForAStudent",
* summary="Get Text Study And Skill Videos Assignments For A Student",
* @SWG\Parameter(
*                   defaultValue="[{""student_profile_id"":""5128.120"",""product_id"":""cclicks"",""class_id"":""2582""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""student_profile_id"":""5128.120"",""product_id"":""cclicks"",""class_id"":""2582""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/


/**
*
* @SWG\Post(
* path="/get_cclicks_rc_assignments_for_a_student",
* tags={"G"},
* operationId="getCclicksRcAssignmentsForAStudent",
* summary="Get Reading Checkpoint Assignments",
* @SWG\Parameter(
*                   defaultValue="[{""student_profile_id"":""5128.120"",""product_id"":""cclicks"",""class_id"":""2582""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""student_profile_id"":""5128.120"",""product_id"":""cclicks"",""class_id"":""2582""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/get_cclicks_all_rc_assignments_quiz_results_for_a_student",
* tags={"G"},
* operationId="getCclicksAllRcAssignmentsQuizResultsForAStudent",
* summary="Get All Reading Checkpoint Assignments Quiz Results For A Student",
* @SWG\Parameter(
*                   defaultValue="[{""student_profile_id"":""5128.120"",""assignment_id"":""194146.1321"",""product_id"":""cclicks""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""student_profile_id"":""5128.120"",""assignment_id"":""194146.1321"",""product_id"":""cclicks""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/get_teacher_list_for_admin",
* tags={"G"},
* operationId="getTeacherListForAdmin",
* summary="Get Teacher List For Admin",
* @SWG\Parameter(
*                   defaultValue="[""1013.120"",""194146"",""cclicks""]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [""1013.120"",""194146"",""cclicks""].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/get_school_list_for_admin",
* tags={"G"},
* operationId="getSchoolListForAdmin",
* summary="Get School List For Admin",
* @SWG\Parameter(
*                   defaultValue="[""1013.120"",""194146"",""cclicks""]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [""1013.120"",""194146"",""cclicks""].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/get_product_grades",
* tags={"G"},
* operationId="getProductGrades",
* summary="Get Product Grades",
* @SWG\Parameter(
*                   defaultValue="[{""product_id"":""cclicks""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""product_id"":""cclicks""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/get_cclicks_assignments_for_a_class",
* tags={"G"},
* operationId="getCclicksAssignmentsForAClass",
* summary="Get Cclicks Assignments For A Class",
* @SWG\Parameter(
*                   defaultValue="[{""teacher_profile_id"":""104.120"",""product_id"":""cclicks"",""class_id"":""2582"",""view_by"":""assignment""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""teacher_profile_id"":""104.120"",""product_id"":""cclicks"",""class_id"":""2582"",""view_by"":""assignment""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/get_students_with_no_cclicks_assignments_by_class",
* tags={"G"},
* operationId="getStudentsWithNoCclicksAssignmentsByClass",
* summary="Get Students With No Cclicks Assignments By Class",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""104.120"",""class_id"":""2582""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""104.120"",""class_id"":""2582""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/update_cclicks_assignment_date_due",
* tags={"U"},
* operationId="updateCclicksAssignmentDateDue",
* summary="Update Cclicks Assignment Date Due",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""104.120"",""assignment_id"":""194146.105062"",""date_due"":""2016-04-04 00:00:00""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""104.120"",""assignment_id"":""194146.105062"",""date_due"":""2016-04-04 00:00:00""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/delete_multiple_cclicks_assignments",
* tags={"D"},
* operationId="deleteMultipleCclicksAssignments",
* summary="Delete Multiple Cclicks Assignments",
* @SWG\Parameter(
*                   defaultValue="[[{""profile_id"":""104.120"",""assignment_id"":""194146.245120""},{""profile_id"":""104.120"",""assignment_id"":""194146.245127""},{""profile_id"":""104.120"",""assignment_id"":""194146.245125""}]]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [[{""profile_id"":""104.120"",""assignment_id"":""194146.245120""},{""profile_id"":""104.120"",""assignment_id"":""194146.245127""},{""profile_id"":""104.120"",""assignment_id"":""194146.245125""}]].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
*
* @SWG\Post(
* path="/set_multiple_cclicks_assignments",
* tags={"S"},
* operationId="setMultiplecclicksAssignments",
* summary="Set multiple assignments.",
* @SWG\Parameter(
*                   defaultValue="[[{""assignment_id"":"""",""teacher_profile_id"":""194146.800088563"",""student_profile_id"":""274117"",""class_id"":""2203"",""school_customer_id"":""800088563"",""product_id"":""cclicks"",""assignment_component_type""
:""read"",""assignment_type"":""t_study"",""title"":"""",""date_assigned"":""2016-04-26 14:41:40"",""creationdate"":""2016-04-26 14:41:40"",""date_due"":""2016-04-05 00:00:00"",""active"":""1"",""status"":""3"",""asset_id"":""ccts0005_read"",""date_complete"":"""",""total_score"":null,""audio"":""Y"",""lexile"":"""",""grl"":"""",""text_complexity"":"""",""grade"":""K"",""year"":""2015_2016""},{""assignment_id"":"""",""teacher_profile_id"":""194146.800088563"",""student_profile_id"":""274118"",""class_id"":""2203"",""school_customer_id"":""800088563"",""product_id"":""cclicks"",""assignment_component_type""
:""read"",""assignment_type"":""t_study"",""title"":"""",""date_assigned"":""2016-04-26 14:41:40"",""creationdate"":""2016-04-26 14:41:40"",""date_due"":""2016-04-05 00:00:00"",""active"":""1"",""status"":""3"",""asset_id"":""ccts0005_read"",""date_complete"":"""",""total_score"":null,""audio"":""Y"",""lexile"":"""",""grl"":"""",""text_complexity"":"""",""grade"":""K"",""year"":""2015_2016""}]]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [[{""assignment_id"":"""",""teacher_profile_id"":""194146.800088563"",""student_profile_id"":""274117"",""class_id"":""2203"",""school_customer_id"":""800088563"",""product_id"":""cclicks"",""assignment_component_type""
:""read"",""assignment_type"":""t_study"",""title"":"""",""date_assigned"":""2016-04-26 14:41:40"",""creationdate"":""2016-04-26 14:41:40"",""date_due"":""2016-04-05 00:00:00"",""active"":""1"",""status"":""3"",""asset_id"":""ccts0005_read"",""date_complete"":"""",""total_score"":null,""audio"":""Y"",""lexile"":"""",""grl"":"""",""text_complexity"":"""",""grade"":""K"",""year"":""2015_2016""},{""assignment_id"":"""",""teacher_profile_id"":""194146.800088563"",""student_profile_id"":""274118"",""class_id"":""2203"",""school_customer_id"":""800088563"",""product_id"":""cclicks"",""assignment_component_type""
:""read"",""assignment_type"":""t_study"",""title"":"""",""date_assigned"":""2016-04-26 14:41:40"",""creationdate"":""2016-04-26 14:41:40"",""date_due"":""2016-04-05 00:00:00"",""active"":""1"",""status"":""3"",""asset_id"":""ccts0005_read"",""date_complete"":"""",""total_score"":null,""audio"":""Y"",""lexile"":"""",""grl"":"""",""text_complexity"":"""",""grade"":""K"",""year"":""2015_2016""}]].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/
 
/**
* 
* @SWG\Post(
* path="/get_cclicks_assignments_for_a_student",
* tags={"G"},
* operationId="getCclicksAssignmentsForAStudent",
* summary="Get Cclicks Assignments For A Student.",
* @SWG\Parameter(
*                   defaultValue="[{""student_profile_id"":""5128.120"",""product_id"":""cclicks""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""student_profile_id"":""5128.120"",""product_id"":""cclicks""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/


/**
* 
* @SWG\Post(
* path="/set_cclicks_assignment_quiz_result",
* tags={"S"},
* operationId="setCClicksAssignmentQuizResult",
* summary="Set cclicks assignments quiz results.",
* @SWG\Parameter(
*                   defaultValue="[{""student_profile_id"":""5128.120"",""product_id"":""cclicks"",""question_id"":""ccts0011_qq1"",
""parent_slp_id"":""ccts0011_quest"",""assignment_id"":""194146.166696"",""answer"":""A"",""is_correct"":""false"",
""score"":""0"",""question_type"":""mc"",""spotlight_skill_id"":null,""school_customer_id"":""120"",
""question_data"":{""IsCorrect"":""false"",""QID"":""ccts0011_qq1"",""pageid"":""1"",""question_type"":""singleselect"",""sectionid"":""questionquest"",""users_response"":""A""}}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [""student_profile_id"":""5128.120"",""product_id"":""cclicks"",""question_id"":""ccts0011_qq1"",
""parent_slp_id"":""ccts0011_quest"",""assignment_id"":""194146.166696"",""answer"":""A"",""is_correct"":""false"",
""score"":""0"",""question_type"":""mc"",""spotlight_skill_id"":null,""school_customer_id"":""120"",
""question_data"":""{""IsCorrect"":""false"",""QID"":""ccts0011_qq1"",""pageid"":""1"",""question_type"":""singleselec
t"",""sectionid"":""questionquest"",""users_response"":""A""}""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
* 
* @SWG\Post(
* path="/update_cclicks_assignment_date_completed",
* tags={"U"},
* operationId="updateCClicksAssignmentDateCompleted",
* summary="Update cclicks assignment date completed.",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""5128.120"",""assignment_id"":""194146.105074"",""date_completed"":"""" }]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""5128.120"",""assignment_id"":""194146.105074"",""date_completed"":"""" }].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/

/**
* 
* @SWG\Post(
* path="/update_cclicks_assignment_status",
* tags={"U"},
* operationId="updateCClicksAssignmentStatus",
* summary="Update cclicks assignment status.",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""5128.120"",""assignment_id"":""194146.105074"",""status"":""1"" }]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""5128.120"",""assignment_id"":""194146.105074"",""status"":""1"" }].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/


/**
* 
* @SWG\Post(
* path="/update_cclicks_assignment_status",
* tags={"U"},
* operationId="updateCClicksAssignmentStatus",
* summary="Update cclicks assignment status.",
* @SWG\Parameter(
*                   defaultValue="[{""profile_id"":""5128.120"",""assignment_id"":""194146.105074"",""status"":""1"" }]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""profile_id"":""5128.120"",""assignment_id"":""194146.105074"",""status"":""1"" }].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/


/**
* 
* @SWG\Post(
* path="/get_cclicks_all_qq_assignment_quiz_results_for_a_class",
* tags={"G"},
* operationId="GetCclicksAllQqAssignmentQuizResultsForAClass",
* summary="Get Cclicks All QQ Assignment Quiz Results For A Class.",
* @SWG\Parameter(
*                   defaultValue="[{""teacher_profile_id"":""104.120"",""product_id"":""cclicks"",""class_id"":""2582""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""teacher_profile_id"":""104.120"",""product_id"":""cclicks"",""class_id"":""2582""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/


/**
* 
* @SWG\Post(
* path="/get_cclicks_all_rc_assignment_quiz_results_for_a_class",
* tags={"G"},
* operationId="GetCclicksAllRcAssignmentQuizResultsForAClass",
* summary="Get Cclicks All RC Assignment Quiz Results For A Class.",
* @SWG\Parameter(
*                   defaultValue="[{""teacher_profile_id"":""104.120"",""product_id"":""cclicks"",""class_id"":""2582""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""teacher_profile_id"":""104.120"",""product_id"":""cclicks"",""class_id"":""2582""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/


/**
* 
* @SWG\Post(
* path="/get_cclicks_assignments_for_a_class_by_assignment_type",
* tags={"G"},
* operationId="GetCclicksAssignmentsForAClassByAssignmentType",
* summary="Get Cclicks Assignments For A Class By Assignment Type",
* @SWG\Parameter(
*                   defaultValue="[{""teacher_profile_id"":""104.120"",""product_id"":""cclicks"",""class_id"":""2582"",""assignment_type"":""chkpt"",""view_by"":""""}]" ,
* name="body",
* in="body",
*                   description="Expected parameter is a json like [{""teacher_profile_id"":""104.120"",""product_id"":""cclicks"",""class_id"":""2582"",""assignment_type"":""chkpt"",""view_by"":""""}].",
* required=true,
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status=200,
* description="success",
* @SWG\Schema(ref="#/definitions/NA"),
* ),
* @SWG\Response(
* status="default",
* description="error",
* @SWG\Schema(ref="#/definitions/Error"),
* ),
* )
*
*/
?>



