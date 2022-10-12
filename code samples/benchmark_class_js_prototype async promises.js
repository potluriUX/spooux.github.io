//@author potluri.. very important JS class to draw benchmark reports for teacher and admin benchmarks reports.
//view div id is specific to the page. views are tied to the page.
//to reuse views name the elements as defined in views. data is not tied to pages its independent of pages
function Benchmark(options) {


    this.classs = '';
    this.time = ['b', 'm', 'e'];
    this.teacherprofileid = options.teacherprofileid;//<?php echo json_encode($teacherprofileid); ?>;
    this.data = [];
    this.assessmentdetail = [];//{'b':'', 'm':'', 'e':''};
    this.csv_data = [];
    this.csv_data_admin ;
    this.students = [];
    this.processed_data = [];
    this.all_books_cms = [];
    this.benchmarks_cms = options.benchmarks_cms;//<?php echo json_encode($assessmentsDisplay->get_benchmarks()); ?>;
    this.on_and_above_level_number;
    this.below_level_number;
    this.teachername = options.teachername;
    this.classid_grade = options.classid_grade;
    this.timeperiods = {"b": "BOY", 'm': "MOY", 'e': "EOY"};
    this.timeperiod_text = {"b": "Beginning of Year", 'm': "Middle of Year", 'e': "End of Year"};
    this.all_dates;
    this.schools_teachers_classes;
    this.monthnames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    this.admin = false;


    this.clicks();
    this.clicks_admin();
    this.all_books();
this.A = {};
this.B = {};
}
Benchmark.prototype.loading = function() {

    $("#loading").html("Loading...");
   // $("#loading").show().delay(1000).fadeOut(' ');
    $(document).ajaxStart(function() {
  $('#loading').show();
}).ajaxStop(function() {
  $('#loading').hide();
});
    //$("#loading").html(" ");
    //alert("loading");
}
Benchmark.prototype.all_books = function() {
    var self = this;
    $.ajax({
        async: false,
        type: "POST",
        url: "/scripts/php/nsgra1/assessments_ajax.php?f=get_all_books", //change this in VHOST
        data: {},
        success: function(data) {

            self.all_books_cms = $.parseJSON(data);//value is b m e timeperiod.

            //$("#pdfButton").attr("href", encodeURL)
        }
    });
    // console.log(this.all_books_cms);      
}
Benchmark.prototype.clicks = function() {
    var self = this;
    var teacherandclassarray = [];
    var teacherprofileid = self.teacherprofileid;
    var classid = $('select#classSelect option:selected').val();
        
    $('input[name=view]').click(function() {
        
        $( "#classSelect" ).change(function() { //for when we change and click on view becuase it was getting default value all time so fix it
        classid = $(this).val();
        });
        
        var pdfclassid = $('#classval').val(); //for when we click on printPDF ... becuase it was getting default value all time 
        if(!!pdfclassid)
        {
            classid = pdfclassid;
        }
        teacherandclassarray['teacherprofileid'] = teacherprofileid;
        teacherandclassarray['classid'] = classid;

        collectStat('reports','nsgra','summary','', '');        
            benchmark.get_data(teacherandclassarray);
    
        $.when(self.A[teacherandclassarray]).done(function(){
        var headers = [];
        for (i = 0; i < 15; i++) {
            headers.push(i);
        }

        table.noheader = true;
        table.set_headers(headers);
        self.loading();
        
        benchmark.processdata();
        // console.log(benchmark.processed_data);
        table.qq_data = benchmark.processed_data;
        table.getdata();
        var str = table.draw();

        $("#1").html(str);
        
        var headers = [];


        for (i = 0; i < 4; i++) {
            headers.push(i);
        }
        table.set_headers(headers);

        var i = 2;
        $.each(benchmark.time, function(key, value) {

            table.qq_data = [];
            var total = benchmark.on_and_above_level_number[value] + benchmark.below_level_number[value] + benchmark.retest_level_number[value];
            var total_percent = '0%';
            if (total > 0) {
                total_percent = '100%';
            } else {
                total_percent = '0%';
            }
            table.qq_data.push([(table.fixed((benchmark.on_and_above_level_number[value] / total) * 100).toString() + '%'),
                (table.fixed((benchmark.below_level_number[value] / total) * 100).toString() + '%'),
                (table.fixed((benchmark.retest_level_number[value] / total) * 100).toString() + '%'), total_percent]);//abstraction function. important.
            table.qq_data.push([benchmark.on_and_above_level_number[value] + " Students", benchmark.below_level_number[value] + " Students",
                benchmark.retest_level_number[value] + " Students", total + " Students"]);//abstraction function. important.
            //  console.log(table.qq_data);

            if (total == 0) {

                $("#" + value + "_subhead").html("No Students Assessed");
            } else {
                var maxDate = new Date(Math.max.apply(null, benchmark.all_dates[value]));
                var minDate = new Date(Math.min.apply(null, benchmark.all_dates[value]));
                $("#" + value + "_subhead").html(self.monthnames[minDate.getMonth() ] + ' ' + minDate.getDate() + ", " + minDate.getFullYear() + ' - '
                        + self.monthnames[maxDate.getMonth() ] + ' ' + maxDate.getDate() + ", " + maxDate.getFullYear());
            }
            str = table.draw();

            $("#" + i).html(str);
            i++;
        });
        });
    });


}
Benchmark.prototype.get_data = function(classid) {
    var self = this;
    this.classs = classid;//classSelect each time the selected value from class dd

    $.each(this.time, function(key, value) {
        $.ajax({
            async: false,
            type: "POST",
            url: "/scripts/php/nsgra1/assessments_ajax.php?f=get_rac", //change this in VHOST
            data: {'classSelect': self.classs, 'timeSelect': value
                , 'teacherprofileid': self.teacherprofileid},
            success: function(data) {

                self.data[value] = $.parseJSON(data);//value is b m e timeperiod.

                //$("#pdfButton").attr("href", encodeURL)
            }
        });


    });
    $.ajax({
        async: false,
        type: "POST",
        url: "/scripts/php/nsgra1/assessments_ajax.php?f=get_students", //change this in VHOST
        data: {'classSelect': self.classs,
            'teacherprofileid': self.teacherprofileid},
        success: function(data) {

            self.students = $.parseJSON(data);//value is b m e timeperiod.

            //$("#pdfButton").attr("href", encodeURL)
        }
    });
    // console.log(self.data);
    // console.log(self.students);
}


Benchmark.prototype.processdata = function() {
    var self = this;
    self.csv_data = [['Teacher Name', 'Class Name', 'Class Grade', 'Student First Name', 'Student Last Name Initial', 'Student Added to Class', 'Student Grade Level', 'Time Period', 'Assmt Outcome', 'GR Level Tested', 'Assessment Date', 'Grade Benchmark']];
    this.processed_data = [];
    var on_and_above_level_number = {'b': 0, 'm': 0, 'e': 0};

    var below_level_number = {'b': 0, 'm': 0, 'e': 0};
    var retest_level_number = {'b': 0, 'm': 0, 'e': 0};
    this.all_dates = {'b': [], 'm': [], 'e': []};
  //  console.log(this.students);
    $.each(this.students, function(key, value) {

        var isPreA = {};
        var outcome = {};
        var gr_level_tested_book = {};
        var creation_date = {};
        var grade_level_benchmark = {};



        $.each(self.time, function(timekey, timevalue) {
            gr_level_tested_book[timevalue] = '';
            outcome[timevalue] = '';
            creation_date[timevalue] = '';
            grade_level_benchmark[timevalue] = 'N/A';

            if (self.data[timevalue][value._profileid]) {
                if (self.data[timevalue][value._profileid]._assessmentType == 1) {

                    isPreA[timevalue] = 1;
                }else if (self.data[timevalue][value._profileid]._assessmentType == 2) {

                    isPreA[timevalue] = 2;
                }else{
                    isPreA[timevalue] = 0;
                }


                if (self.data[timevalue][value._profileid]._reading_level) {

                    outcome[timevalue] = self.data[timevalue][value._profileid]._reading_level;

                }



                if (outcome[timevalue]) {
                        if (isPreA[timevalue] == 1) {
                            gr_level_tested_book[timevalue] = 'PreA';
                        }else if (isPreA[timevalue] == 2) {
                            gr_level_tested_book[timevalue] = self.all_books_cms[self.data[timevalue][value._profileid]._resource_slp_id].text_level + '^';
                        }
                        else if (self.data[timevalue][value._profileid]._resource_slp_id) {
                            if (outcome[timevalue] == 'Instructional') {
                                gr_level_tested_book[timevalue] = self.all_books_cms[self.data[timevalue][value._profileid]._resource_slp_id].text_level;
                            }else{
                                gr_level_tested_book[timevalue] = '*';
                            }
                        }
                }



                if (typeof self.assessmentdetail[timevalue][value._profileid] !== 'undefined') {
                    creation_date[timevalue] = self.assessmentdetail[timevalue][value._profileid]._date;
                    var assessment_date = creation_date[timevalue].split('-')[1].replace(/^[0]+/g,"");
                    var date_yr_month_day = convertDate(self.data[timevalue][value._profileid]._creation_date);
                    // alert(date_yr_month_day[1]);//imppppp!!!!!!!!!!!!
                    if (isPreA[timevalue] == 1) {

                        grade_level_benchmark[timevalue] = "Below Level";
                        below_level_number[timevalue] = below_level_number[timevalue] + 1;

                    } else {
                        //  alert(outcome[timevalue]);
                        if (outcome[timevalue] == 'Instructional') {


                            // alert(self.benchmarks_cms[1][1][0].level_code);                            
                            if (gr_level_tested_book[timevalue] > self.benchmarks_cms[assessment_date][value._grade][0].level_code)
                            {
                                grade_level_benchmark[timevalue] = 'Above Level';

                            }                            
                            if (gr_level_tested_book[timevalue] < self.benchmarks_cms[assessment_date][value._grade][0].level_code)
                            {
                                grade_level_benchmark[timevalue] = 'Below Level';

                            }
                            if(self.benchmarks_cms[assessment_date][value._grade][1])
                                if(gr_level_tested_book[timevalue] < self.benchmarks_cms[assessment_date][value._grade][1].level_code)
                            {
                                grade_level_benchmark[timevalue] = 'Below Level';

                            }
                            if (gr_level_tested_book[timevalue] === self.benchmarks_cms[assessment_date][value._grade][0].level_code)
                            {
                                grade_level_benchmark[timevalue] = 'On Level';

                            }
if(self.benchmarks_cms[assessment_date][value._grade][1])
                            if (gr_level_tested_book[timevalue] > self.benchmarks_cms[assessment_date][value._grade][1].level_code)
                            {
                                grade_level_benchmark[timevalue] = 'Above Level';

                            }
                            if(self.benchmarks_cms[assessment_date][value._grade][1])
                            if (gr_level_tested_book[timevalue] === self.benchmarks_cms[assessment_date][value._grade][1].level_code)
                            {
                                grade_level_benchmark[timevalue] = 'On Level';

                            }

                            // alert(grade_level_benchmark[timevalue]);
                            if (grade_level_benchmark[timevalue] == 'Above Level' || grade_level_benchmark[timevalue] == 'On Level')
                            {
                                on_and_above_level_number[timevalue] = on_and_above_level_number[timevalue] + 1;
                                //alert("ab"+timevalue);
                            }
                            if (grade_level_benchmark[timevalue] == 'Below Level')
                            {
                                below_level_number[timevalue] = below_level_number[timevalue] + 1;
                                // alert("bl"+timevalue);
                            }

                        } else
                        {
                            grade_level_benchmark[timevalue] = 'Retest';
                            retest_level_number[timevalue] = retest_level_number[timevalue] + 1;
                        }
                        grade_level_benchmark[timevalue] = grade_level_benchmark[timevalue];
                        // grade_level_benchmark[timevalue] = gr_level_tested_book[timevalue] +grade_level_benchmark[timevalue]+self.benchmarks_cms[date_yr_month_day[1]][value._grade][0].level_code;
                    }

                }  //this.all_books_cms

            }
//alert(value._grade);
            if (grade_level_benchmark[timevalue] != 'N/A' && !self.admin)
                self.csv_data.push([self.teachername, $("#classSelect option:selected").text(),
                    self.classid_grade[self.classs], value._firstname.replace('"', "'"), value._lastname.replace('"', "'"),
                    convertDate2(value._creationdate), value._grade, self.timeperiods[timevalue],
                    outcome[timevalue], gr_level_tested_book[timevalue],
                    convertDate2(creation_date[timevalue]), grade_level_benchmark[timevalue]]);
            //  dbDate = dbDate.replace(/-/g, '/')
            //  alert(dbDate);
            if (creation_date[timevalue])
                self.all_dates[timevalue].push(new Date(creation_date[timevalue].replace(/-/g, '/')));
        });



		var fullname = value._lastname + "., " + value._firstname;


        self.processed_data.push([fullname, value._grade, convertDate2(value._creationdate),
            outcome['b'], gr_level_tested_book['b'],
            convertDate2(creation_date['b']), grade_level_benchmark['b'],
            outcome['m'], gr_level_tested_book['m'],
            convertDate2(creation_date['m']), grade_level_benchmark['m'],
            outcome['e'], gr_level_tested_book['e'],
            convertDate2(creation_date['e']), grade_level_benchmark['e'],
            isPreA['b'],
            isPreA['m'], isPreA['e']
        ]
                );
//                    if(!class_from_url ){
//                 //  alert(self.classid_grade[self.classs]);
//                 
////                        if(grade_level_benchmark['b'] != 'N/A')
////                    self.csv_data.push([self.teachername,$("#classSelect option:selected").text(), 
////                        self.classid_grade[self.classs], value._firstname.replace('"', "'") , 
////                        value._grade, convertDate2(value._creationdate),
////                        outcome['b'], gr_level_tested_book['b'],
////                        convertDate2(creation_date['b']), grade_level_benchmark['b']]);

//                  }

    });
    //  console.log(self.all_dates);
//console.log(on_and_above_level_number);
//console.log(below_level_number);
    // console.log(self.csv_data);
    if (!self.admin)
        export_js_csv(self.csv_data);
    self.on_and_above_level_number = on_and_above_level_number;
    self.below_level_number = below_level_number;
    self.retest_level_number = retest_level_number;

}


Benchmark.prototype.clicks_admin = function() {
    var self = this;


    
    $('input[name=view_admin]').click(function() {
       $.when(self.B).done(function(){
        if ($("#yearSelect").val() != '' && $("#schoolSelect").val() != '' && $("#teacherSelect").val() != '' && $("#classSelect").val() != '') {
           
             self.csv_data_admin =  [['School', 'Teacher', 'Class', 'Class Grade', 'BOY - First Assmt Date', 'BOY - Last Assmt Date',
            'BOY - Total Students Assessed', 
            'BOY - % On or Above Level', 'BOY - % Below Level', 'BOY - % Instructional Level Not Yet Identified',
            'BOY - First Assmt Date', 'BOY - Last Assmt Date',
            'MOY - Total Students Assessed', 
            'MOY - % On or Above Level', 'MOY - % Below Level', 'MOY - % Instructional Level Not Yet Identified',
        'MOY - First Assmt Date', 'MOY - Last Assmt Date',
            'EOY - Total Students Assessed', 
            'EOY - % On or Above Level', 'EOY - % Below Level', 'EOY - % Instructional Level Not Yet Identified']];
            var str = '';
            var str2 = '';
            $("#result").html('');
            var headers = [];
            for (i = 0; i < 15; i++) {
                headers.push(i);
            }

            table.noheader = true;
            table.set_headers(headers);
            self.loading();
            var classes = [];//['193568.1240', '193568.1393'];        
            var teacherandclassarray = []; //[{teacherprofileid:'194088.800090177', classid:'195111.800090177'}]
            // console.log(benchmark.schools_teachers_classes[0]);
            
            
            if ($('#schoolSelect').val() == 'AllSchools') {
                $.each(benchmark.schools_teachers_classes[0], function(keyschool, valueteacher) {
                    $.each(valueteacher, function(keyteacher, valueclass) {
                        $.each(valueclass, function(keyclassid, classprop) {
                            if ($("#yearSelect").val() == classprop.date){
                                classes.push(keyclassid);
                                teacherandclassarray.push({teacherprofileid:keyteacher, classid:keyclassid});
                            }
                        });
                    });


                });
            }
            else if ($('#teacherSelect').val() == 'AllTeachers') {
                // console.log(benchmark.schools_teachers_classes[0][$('#schoolSelect').val()]);
                if (benchmark.schools_teachers_classes[0][$('#schoolSelect').val()])
                    $.each(benchmark.schools_teachers_classes[0][$('#schoolSelect').val()], function(keyschool, valueteacher) {
                        $.each(valueteacher, function(keyteacher, valueclass) {

                            //  alert(keyclassid);
                            if ($("#yearSelect").val() == valueclass.date){
                                classes.push(keyteacher);                                
                                teacherandclassarray.push({teacherprofileid:keyschool, classid:keyteacher});
                            }
                        });


                    });
            }

            else if ($('#classSelect').val() == 'AllClasses') {
                $('#classSelect option').each(function() {//browse thru options of selectbox of class!!!
                    if ($(this).val() != '' && $(this).val() != 'AllClasses'){
                        classes.push($(this).val());
                        teacherandclassarray.push({teacherprofileid:$('#teacherSelect').val(), classid:$(this).val()});
                    }
                });
            }
            else if ($('#classSelect').val() != '')
            {
                classes.push($('#classSelect').val());
                teacherandclassarray.push({teacherprofileid:$('#teacherSelect').val(), classid:$('#classSelect').val()});
            }               
               
           // console.log(classes);
            $.each(teacherandclassarray, function(key, value) {
//                alert(benchmark.schools_teachers_classes[1][value]);
               
                $("#result").append("<div id='results_" + value['classid'].replace(".", "_") + "'></div>");
                benchmark.get_data(value);
                $.when(self.A[value]).done(function(){
                    value = value['classid'];
                    //console.log('startyed'+ value );
                     str2 = '<div class="row cols3 bnchmkRptAdmin"> ' + '<br class="clearfloat" /><h3>' + benchmark.schools_teachers_classes[1][value] + '</h3>' +
                        '<!--[if IE]><div class="ie"><![endif]-->';
              
                benchmark.processdata();
                // console.log(benchmark.processed_data);
                //   table.qq_data = benchmark.processed_data;
                // table.getdata();
                // var str = table.draw();

                // $("#1").html(str);
                
                var school_teacher_class_grade_array = benchmark.schools_teachers_classes[1][value].split(',');
               // console.log(school_teacher_class_grade_array);
                var headers = [];


                for (i = 0; i < 4; i++) {
                    headers.push(i);
                }
                table.set_headers(headers);

                var i = 1;
                var subhead;
                var total;
                var total_percent;
                var csv_row=[school_teacher_class_grade_array[0], school_teacher_class_grade_array[1],
                    school_teacher_class_grade_array[2], school_teacher_class_grade_array[3],];
                var minDate='';
                var maxDate='';
                $.each(benchmark.time, function(key, value) {

                    table.qq_data = [];
                     total = benchmark.on_and_above_level_number[value] + benchmark.below_level_number[value] + benchmark.retest_level_number[value];
                    total_percent = '0%';
                    if (total > 0) {
                        total_percent = '100%';
                    } else {
                        total_percent = '0%';
                    }
                    table.qq_data.push([(table.fixed((benchmark.on_and_above_level_number[value] / total) * 100).toString() + '%'),
                        (table.fixed((benchmark.below_level_number[value] / total) * 100).toString() + '%'),
                        (table.fixed((benchmark.retest_level_number[value] / total) * 100).toString() + '%'), total_percent]);//abstraction function. important.
                    table.qq_data.push([benchmark.on_and_above_level_number[value] + " Students", benchmark.below_level_number[value] + " Students",
                        benchmark.retest_level_number[value] + " Students", total + " Students"]);//abstraction function. important.
                    //  console.log(table.qq_data);

                    if (total == 0) {

                        // $("#" + value + "_subhead").html("No Students Assessed");
                         subhead = "No Students Assessed";
                    } else {
                        maxDate = new Date(Math.max.apply(null, benchmark.all_dates[value]));
                        minDate = new Date(Math.min.apply(null, benchmark.all_dates[value]));
//                $("#" + value + "_subhead").html(self.monthnames[minDate.getMonth() ] + ' ' + minDate.getDate() + ", " + minDate.getFullYear() + ' - '
//                        + self.monthnames[maxDate.getMonth() ] + ' ' + maxDate.getDate() + ", " + maxDate.getFullYear());
                         subhead = self.monthnames[minDate.getMonth() ] + ' ' + minDate.getDate() + ", " + minDate.getFullYear() + ' - '
                                + self.monthnames[maxDate.getMonth() ] + ' ' + maxDate.getDate() + ", " + maxDate.getFullYear();
                    }

                    str2 = str2 + '<div class="col' + i + '">' +
                            '<table class="dataTbl assmntTbl" border="1">' +
                            '<thead>' +
                            '<tr>' +
                            '<th colspan="4" scope="col" class="knockout">' + self.timeperiod_text[value] + '</th>' +
                            '</tr>' +
                            '<tr>' +
                            '<th colspan="4" class="subhead1">' + subhead + '</th>' +
                            '</tr>' +
                            '<tr>' +
                            ' <th class="subhead2">On or Above Grade Level </th>'+
                            '<th class="subhead2">Below Grade Level </th>'+
                            '<th class="subhead2">Not on Instr. Level</th>'+
                            '<th class="subhead2">Total Assessed</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody>' + table.draw() + '</tbody>' +
                            '</table>' +
                            '<!-- end .col1 --></div>';
                    // $("#" + i).html(str);
                    i++;
                    //csv_row = [];
                    if(total>0)
                    csv_row.push(
                    self.monthnames[minDate.getMonth() ] + ' ' + minDate.getDate() + ", " + minDate.getFullYear()
                    , self.monthnames[maxDate.getMonth() ] + ' ' + maxDate.getDate() + ", " + maxDate.getFullYear()
                    , total,(table.fixed((benchmark.on_and_above_level_number[value] / total) * 100).toString() + '%'),
                        (table.fixed((benchmark.below_level_number[value] / total) * 100).toString() + '%'),
                        (table.fixed((benchmark.retest_level_number[value] / total) * 100).toString() + '%'));
                        else
                            csv_row.push(
                    ''
                    , ''
                    , total,(table.fixed((benchmark.on_and_above_level_number[value] / total) * 100).toString() + '%'),
                        (table.fixed((benchmark.below_level_number[value] / total) * 100).toString() + '%'),
                        (table.fixed((benchmark.retest_level_number[value] / total) * 100).toString() + '%'));
                });
                
                self.csv_data_admin.push(csv_row)
              //  console.log(csv_row);
              //  str = str + str2;
 //$("#result").append(str2);
             str = '</tbody>' +// str +
                    '</table>' +
                    '<!-- end .col3 --></div>' +
                    '<br class="clearfloat" />' +
                    '<!--[if IE></div><![endif]-->' +
                    '</div>';
            str = str2 + str;
 $("#results_"+ value.replace(".", "_")).append(str);
                str = '';
                str2 = '';
              //  console.log('ended'+value);
            });
        });
            export_js_csv(self.csv_data_admin);
            

            //  alert(str);
            
         //   $("#result").append(str); //result is specific to the page. views are tied to the page.
       //     $("#results_"+ value).html(str);
           // $("#loading").html('');
            //to reuse views name the elements as defined in views. data is not tied to pages its independent of pages
        }
    });
    });


}
Benchmark.prototype.get_data = function(teacherandclassarray) {
    
    var self = this;
    this.classs = teacherandclassarray['classid']; //classSelect each time the selected value from class dd
    this.teacherprofileid = teacherandclassarray['teacherprofileid']; //teacherprofileid
    if(!this.A[teacherandclassarray])this.A[teacherandclassarray] = '';
       this.A[teacherandclassarray]= $.ajax({
          //  async: false,
            type: "POST",
            url: "/scripts/php/nsgra1/assessments_ajax.php?f=get_rac", //change this in VHOST
            data: {'classSelect': self.classs, 'timeSelect': ''
                , 'teacherprofileid': self.teacherprofileid, 'grade':self.classid_grade[self.classs]},
            success: function(data) {

                var tempdata = $.parseJSON(data);//value is b m e timeperiod.
self.data = tempdata.data;
self.students = tempdata.students;
self.assessmentdetail = tempdata.assessmentdetail;
                //$("#pdfButton").attr("href", encodeURL)
            }
       


    });
//    $.ajax({
//        async: false,
//        type: "POST",
//        url: "/scripts/php/nsgra1/assessments_ajax.php?f=get_students", //change this in VHOST
//        data: {'classSelect': self.classs,
//            'teacherprofileid': self.teacherprofileid},
//        success: function(data) {
//
//            self.students = $.parseJSON(data);//value is b m e timeperiod.
//
//            //$("#pdfButton").attr("href", encodeURL)
//        }
//    });
    // console.log(self.data);
    // console.log(self.students);
}

Benchmark.prototype.get_schools_teachers_classes = function() {
    var self = this;
  this.B=  $.ajax({
     //   async: false,
        type: "POST",
        url: "/assessmentsajax1?f=school_teacher_classes", //change this in VHOST
        data: {},
        success: function(data) {

            self.schools_teachers_classes = $.parseJSON(data);//value is b m e timeperiod.
            //alert(self.schools_teachers_classes);
//console.log(self.schools_teachers_classes);
            //$("#pdfButton").attr("href", encodeURL)
        }
    });

}
 Benchmark.prototype.base64_encode = function (data) {
  //  discuss at: http://phpjs.org/functions/base64_encode/
  // original by: Tyler Akins (http://rumkin.com)
  // improved by: Bayron Guevara
  // improved by: Thunder.m
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Rafa? Kukawski (http://kukawski.pl)
  // bugfixed by: Pellentesque Malesuada
  //   example 1: base64_encode('Kevin van Zonneveld');
  //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  //   example 2: base64_encode('a');
  //   returns 2: 'YQ=='

  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}
