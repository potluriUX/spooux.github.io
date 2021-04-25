
StatsControllers.controller("ChartController", ['$scope', '$routeParams', '$http', '$location', 'post_to_chart_properties', 'sharedProperties',
    'usageSummary', 'usageSummaryByProduct',
    function($scope, $routeParams, $http, $location, post_to_chart_properties, sharedProperties, usageSummary, usageSummaryByProduct) {//added new{
        if ($routeParams.graph_data_passed_in_url) {
            var x = JSON.parse(decodeURIComponent($routeParams.graph_data_passed_in_url));
//               console.log( encodeURIComponent(JSON.stringify({0:$scope.documents_total_y_axis, 1:$scope.sessions_total_y_axis, 
//                      2:$scope.searches_total_y_axis,3:month_dates_x_axis_actual_on_graph, 4:color })));
            var color = x[4];
            $scope.documents_total_y_axis = x[0];
            $scope.sessions_total_y_axis = x[1];
            $scope.searches_total_y_axis = x[2];
            var month_dates_x_axis_actual_on_graph = x[3];

            Highcharts.setOptions({
                lang: {
                    decimalPoint: '.',
                    thousandsSep: ','
                }
            });
            $scope.chartConfig = post_to_chart_properties.set_chart_config($scope, month_dates_x_axis_actual_on_graph, color);
        }

        else {
            $scope.count = 0;
            $scope.tab = 1;//by default the tab that will be selected. total usage tab is selected.
            $scope.productinfo = sharedProperties.get_productinfo_property();
            var num_of_months_to_show = 15;//15 months data to be shown in the graph

            var prev_next_months_count = 6;//6 months prev or next pagination constant.

            var color = ['#56d76a', '#3c97ef', '#fb3f26'];

            var posted_data = post_to_chart_properties.getProperty();
            if (posted_data.rpt_type == "OUS")
                $scope.report_title = "Overall Usage Summary"
            $scope.prod_title = posted_data.prod_title;
//console.log(posted_data);

            $scope.backenddata = sharedProperties.getProperty();
            var prodfamily_arr;
            if (posted_data.prodfamily == 'GO') {
                prodfamily_arr = $scope.backenddata.result.goproducts;
                $scope.prodfamily_arr = prodfamily_arr;

                //if go is chosen then go products array is passed. 
            } else {
                prodfamily_arr = [posted_data.prodfamily];
                $scope.prodfamily_arr = ['ama', 'gme', 'ama', 'gme', 'ama', 'gme', 'ama', 'gme', 'ama'];
            }
            $scope.customers = Object.keys($scope.backenddata.result.children);

            var key = '';
            var i = 0;

            var month_dates_x_axis = [];
            var month_dates_x_axis_actual_on_graph = [];
            var dates = Object.keys($scope.backenddata.result.usagedates);

            $scope.calculate_months_xaxis = function() {
                for (i = dates.indexOf(posted_data.year); i > dates.indexOf(posted_data.year) - num_of_months_to_show; i--) {
                    if (dates[i]) {

                        month_dates_x_axis.push(dates[i]);
                        month_dates_x_axis_actual_on_graph.push($scope.backenddata.result.usagedates[dates[i]]);

                    }


                }
                month_dates_x_axis.reverse();//reverse the array for dates earlier to later 
                month_dates_x_axis_actual_on_graph.reverse();//reverse the array for dates earlier to later @SDevi
            }

            $scope.calculate_months_xaxis_previous_in_pagination = function(posted_data) {

                month_dates_x_axis.reverse();//reverse the array for dates earlier to later @SDevi
                month_dates_x_axis_actual_on_graph.reverse();
                for (i = dates.indexOf(posted_data.year); i > dates.indexOf(posted_data.year) - prev_next_months_count; i--) {
                    if (dates[i]) {

                        month_dates_x_axis.push(dates[i]);
                        month_dates_x_axis_actual_on_graph.push($scope.backenddata.result.usagedates[dates[i]]);

                    }


                }
                //    console.log(month_dates_x_axis_actual_on_graph);
                month_dates_x_axis.reverse();//reverse the array for dates earlier to later @SDevi
                month_dates_x_axis_actual_on_graph.reverse();//reverse the array for dates earlier to later @SDevi
                month_dates_x_axis.splice(num_of_months_to_show, Number.MAX_VALUE);
                month_dates_x_axis_actual_on_graph.splice(num_of_months_to_show, Number.MAX_VALUE);

            }
            $scope.calculate_months_xaxis();//calling the above function*********


            $scope.calculate_months_xaxis_next_in_pagination = function(posted_data, enddate) {

//        month_dates_x_axis.reverse();//reverse the array for dates earlier to later @SDevi
//            month_dates_x_axis_actual_on_graph.reverse();
                for (i = dates.indexOf(posted_data.year) + 1; i <= dates.indexOf(posted_data.year) + prev_next_months_count; i++) {
                    if (dates[i]) {

                        month_dates_x_axis.push(dates[i]);
                        month_dates_x_axis_actual_on_graph.push($scope.backenddata.result.usagedates[dates[i]]);

                    }


                }
                //    console.log(month_dates_x_axis_actual_on_graph);
//            month_dates_x_axis.reverse();//reverse the array for dates earlier to later @SDevi
//            month_dates_x_axis_actual_on_graph.reverse();//reverse the array for dates earlier to later @SDevi
//            month_dates_x_axis.splice(num_of_months_to_show, Number.MAX_VALUE);
//            month_dates_x_axis_actual_on_graph.splice(num_of_months_to_show, Number.MAX_VALUE);

                for (i = 0; i < prev_next_months_count; i++) {
                    month_dates_x_axis.shift();
                    month_dates_x_axis_actual_on_graph.shift();
                }
            }
            if (posted_data.radioincludesites == 'yes') {
                var customers = $scope.customers;
            } else {
                var customers = [$scope.backenddata.result.customerid];
            }


            $scope.calculate_remote_onsite_ind_total_next_in_pagination = function() {



                $scope.month_dates_x_axis = month_dates_x_axis_actual_on_graph;
                var lengthofmonthsarray = month_dates_x_axis.length;
                //  console.log(month_dates_x_axis);
                for (var i = month_dates_x_axis.length - (month_dates_x_axis.length - (num_of_months_to_show - prev_next_months_count));
                        i < month_dates_x_axis.length; i++) {
                    //if 12 in month then start at 12-3 12-(12-(15-6)) not 12-6 if 13 then 13-(13-(15-6))
                    // not 13-6 if 14 then 14-5 if 10 then   ... 15-(15-(15-6))
                    // console.log(month_dates_x_axis);
                    //building documents sessions searches y axis arrays. 
                    //  console.log(month_dates_x_axis[i]);
                    //  console.log(month_dates_x_axis[i]);
                    //    console.log($scope.usageinfo.result[month_dates_x_axis[i]]);
                    //   console.log($scope.documents_total_y_axis);
                    if ($scope.usageinfo.result[month_dates_x_axis[i]]) {
                        //   console.log( $scope.usageinfo.result[month_dates_x_axis[i]].onsite.documents);
                        $scope.push_yaxis_arrays(month_dates_x_axis[i], '');

                        $scope.documents_total_y_axis.push($scope.usageinfo.result[month_dates_x_axis[i]].onsite.documents
                                + $scope.usageinfo.result[month_dates_x_axis[i]].remote.documents +
                                $scope.usageinfo.result[month_dates_x_axis[i]].individual.documents);
                        $scope.searches_total_y_axis.push($scope.usageinfo.result[month_dates_x_axis[i]].onsite.searches +
                                $scope.usageinfo.result[month_dates_x_axis[i]].remote.searches +
                                $scope.usageinfo.result[month_dates_x_axis[i]].individual.searches);
                        $scope.sessions_total_y_axis.push($scope.usageinfo.result[month_dates_x_axis[i]].onsite.sessions +
                                $scope.usageinfo.result[month_dates_x_axis[i]].remote.sessions +
                                $scope.usageinfo.result[month_dates_x_axis[i]].individual.sessions);
                    }
                    else {
                        $scope.push_yaxis_na();
                    }
                    // console.log($scope.productinfo);
                }


                for (i = 0; i < prev_next_months_count; i++) {
                    $scope.documents_onsite_y_axis.shift();
                    $scope.searches_onsite_y_axis.shift();
                    $scope.sessions_onsite_y_axis.shift();


                    $scope.documents_remote_y_axis.shift();
                    $scope.searches_remote_y_axis.shift();
                    $scope.sessions_remote_y_axis.shift();


                    $scope.documents_individual_y_axis.shift();
                    $scope.searches_individual_y_axis.shift();
                    $scope.sessions_individual_y_axis.shift();

                    $scope.documents_total_y_axis.shift();
                    $scope.searches_total_y_axis.shift();
                    $scope.sessions_total_y_axis.shift();
                }





            }
            $scope.push_yaxis_na = function() {
                var a = 'na';//no data for the month so some random data to show no data.
                $scope.documents_onsite_y_axis.push(a);
                $scope.searches_onsite_y_axis.push(a);
                $scope.sessions_onsite_y_axis.push(a);


                $scope.documents_remote_y_axis.push(a);
                $scope.searches_remote_y_axis.push(a);
                $scope.sessions_remote_y_axis.push(a);


                $scope.documents_individual_y_axis.push(a);
                $scope.searches_individual_y_axis.push(a);
                $scope.sessions_individual_y_axis.push(a);

                $scope.documents_total_y_axis.push(a);
                $scope.searches_total_y_axis.push(a);
                $scope.sessions_total_y_axis.push(a);
            }
            $scope.push_yaxis_arrays = function(month_dates_x_axis, flag_page_loaded) {
                if (flag_page_loaded == true && flag_page_loaded != '') {
                    $scope.usageinfo = sharedProperties.get_usageinfo_property();
                }
                else {
                    $scope.usageinfo = sharedProperties.get_usageinfo_property2();
                }
                $scope.documents_onsite_y_axis.push($scope.usageinfo.result[month_dates_x_axis].onsite.documents);
                $scope.searches_onsite_y_axis.push($scope.usageinfo.result[month_dates_x_axis].onsite.searches);
                $scope.sessions_onsite_y_axis.push($scope.usageinfo.result[month_dates_x_axis].onsite.sessions);


                $scope.documents_remote_y_axis.push($scope.usageinfo.result[month_dates_x_axis].remote.documents);
                $scope.searches_remote_y_axis.push($scope.usageinfo.result[month_dates_x_axis].remote.searches);
                $scope.sessions_remote_y_axis.push($scope.usageinfo.result[month_dates_x_axis].remote.sessions);


                $scope.documents_individual_y_axis.push($scope.usageinfo.result[month_dates_x_axis].individual.documents);
                $scope.searches_individual_y_axis.push($scope.usageinfo.result[month_dates_x_axis].individual.searches);
                $scope.sessions_individual_y_axis.push($scope.usageinfo.result[month_dates_x_axis].individual.sessions);
            }
            $scope.reverse_yaxis_arrays = function() {
                $scope.documents_onsite_y_axis.reverse();
                $scope.searches_onsite_y_axis.reverse();
                $scope.sessions_onsite_y_axis.reverse();


                $scope.documents_remote_y_axis.reverse();
                $scope.searches_remote_y_axis.reverse();
                $scope.sessions_remote_y_axis.reverse();


                $scope.documents_individual_y_axis.reverse();
                $scope.searches_individual_y_axis.reverse();
                $scope.sessions_individual_y_axis.reverse();

                $scope.documents_total_y_axis.reverse();
                $scope.searches_total_y_axis.reverse();
                $scope.sessions_total_y_axis.reverse();
            }
//cuid, startDate, endDate, product[], customer[]
            $scope.calculate_remote_onsite_ind_total_previous_in_pagination = function() {


                $scope.reverse_yaxis_arrays();
                $scope.month_dates_x_axis = month_dates_x_axis_actual_on_graph;
                var lengthofmonthsarray = month_dates_x_axis.length;
                for (var i = 5; i >= 0; i--) {
                    //console.log(month_dates_x_axis[i]);
                    //building documents sessions searches y axis arrays. 
//                  console.log(month_dates_x_axis[i]);
//                 console.log( $scope.usageinfo.result[month_dates_x_axis[i]].onsite.documents);
                    if ($scope.usageinfo.result[month_dates_x_axis[i]]) {


                        $scope.push_yaxis_arrays(month_dates_x_axis[i], '');
                        $scope.documents_total_y_axis.push($scope.usageinfo.result[month_dates_x_axis[i]].onsite.documents
                                + $scope.usageinfo.result[month_dates_x_axis[i]].remote.documents +
                                $scope.usageinfo.result[month_dates_x_axis[i]].individual.documents);
                        $scope.searches_total_y_axis.push($scope.usageinfo.result[month_dates_x_axis[i]].onsite.searches +
                                $scope.usageinfo.result[month_dates_x_axis[i]].remote.searches +
                                $scope.usageinfo.result[month_dates_x_axis[i]].individual.searches);
                        $scope.sessions_total_y_axis.push($scope.usageinfo.result[month_dates_x_axis[i]].onsite.sessions +
                                $scope.usageinfo.result[month_dates_x_axis[i]].remote.sessions +
                                $scope.usageinfo.result[month_dates_x_axis[i]].individual.sessions);
                    } else {
                        $scope.push_yaxis_na();
                    }
                    // console.log($scope.productinfo);
                }
                $scope.reverse_yaxis_arrays();



                $scope.delete_after_num_of_months_to_show_from_yaxis_arrays();


            }

            $scope.delete_after_num_of_months_to_show_from_yaxis_arrays = function() {
                $scope.documents_onsite_y_axis.splice(num_of_months_to_show, Number.MAX_VALUE);
                $scope.searches_onsite_y_axis.splice(num_of_months_to_show, Number.MAX_VALUE);
                $scope.sessions_onsite_y_axis.splice(num_of_months_to_show, Number.MAX_VALUE);


                $scope.documents_remote_y_axis.splice(num_of_months_to_show, Number.MAX_VALUE);
                $scope.searches_remote_y_axis.splice(num_of_months_to_show, Number.MAX_VALUE);
                $scope.sessions_remote_y_axis.splice(num_of_months_to_show, Number.MAX_VALUE);


                $scope.documents_individual_y_axis.splice(num_of_months_to_show, Number.MAX_VALUE);
                $scope.searches_individual_y_axis.splice(num_of_months_to_show, Number.MAX_VALUE);
                $scope.sessions_individual_y_axis.splice(num_of_months_to_show, Number.MAX_VALUE);

                $scope.documents_total_y_axis.splice(num_of_months_to_show, Number.MAX_VALUE);
                $scope.searches_total_y_axis.splice(num_of_months_to_show, Number.MAX_VALUE);
                $scope.sessions_total_y_axis.splice(num_of_months_to_show, Number.MAX_VALUE);
            }
            $scope.initialize_yaxis_arrays = function() {
                $scope.documents_total_y_axis = [];
                $scope.searches_total_y_axis = [];
                $scope.sessions_total_y_axis = [];

                $scope.documents_onsite_y_axis = [];
                $scope.searches_onsite_y_axis = [];
                $scope.sessions_onsite_y_axis = [];

                $scope.documents_remote_y_axis = [];
                $scope.searches_remote_y_axis = [];
                $scope.sessions_remote_y_axis = [];

                $scope.documents_individual_y_axis = [];
                $scope.searches_individual_y_axis = [];
                $scope.sessions_individual_y_axis = [];
            }
            $scope.calculate_remote_onsite_ind_total = function() {
                $scope.usageinfo = sharedProperties.get_usageinfo_property();

                $scope.initialize_yaxis_arrays();



                $scope.month_dates_x_axis = month_dates_x_axis_actual_on_graph;
                var lengthofmonthsarray = month_dates_x_axis.length;
                for (var i = 0; i < lengthofmonthsarray; i++) {
                    //console.log(month_dates_x_axis[i]);
                    //building documents sessions searches y axis arrays. 
                    if ($scope.usageinfo.result[month_dates_x_axis[i]]) {
                        $scope.push_yaxis_arrays(month_dates_x_axis[i], true);

                        $scope.documents_total_y_axis.push($scope.documents_onsite_y_axis[i] + $scope.documents_remote_y_axis[i] +
                                $scope.documents_individual_y_axis[i]);
                        $scope.searches_total_y_axis.push($scope.searches_onsite_y_axis[i] + $scope.searches_remote_y_axis[i] +
                                $scope.searches_individual_y_axis[i]);
                        $scope.sessions_total_y_axis.push($scope.sessions_onsite_y_axis[i] + $scope.sessions_remote_y_axis[i] +
                                $scope.sessions_individual_y_axis[i]);
                    } else {
                        $scope.push_yaxis_na();
                    }
                    // console.log($scope.productinfo);
                }
            }
            $scope.calculate_remote_onsite_ind_total();//calling graph y axis 




            $scope.initialize_yaxis_by_prod_arrays = function() {

                $scope.documents_prod_total_y_axis = []
                $scope.searches_prod_total_y_axis = []
                $scope.sessions_prod_total_y_axis = []

                $scope.documents_prod_onsite_y_axis = []
                $scope.searches_prod_onsite_y_axis = []
                $scope.sessions_prod_onsite_y_axis = []

                $scope.documents_prod_remote_y_axis = []
                $scope.searches_prod_remote_y_axis = []
                $scope.sessions_prod_remote_y_axis = []

                $scope.documents_prod_individual_y_axis = []
                $scope.searches_prod_individual_y_axis = []
                $scope.sessions_prod_individual_y_axis = []
                var lengthofproductsarray = $scope.backenddata.result.goproducts.length;
                for (var i = 0; i < lengthofproductsarray; i++) {
                    $scope.documents_prod_onsite_y_axis[i] = [];
                    $scope.searches_prod_onsite_y_axis[i] = [];
                    $scope.sessions_prod_onsite_y_axis[i] = [];

                    $scope.documents_prod_remote_y_axis[i] = [];
                    $scope.searches_prod_remote_y_axis[i] = [];
                    $scope.sessions_prod_remote_y_axis[i] = [];
                    $scope.documents_prod_individual_y_axis[i] = [];
                    $scope.searches_prod_individual_y_axis[i] = [];
                    $scope.sessions_prod_individual_y_axis[i] = [];

                    $scope.documents_prod_total_y_axis[i] = [];
                    $scope.searches_prod_total_y_axis[i] = [];
                    $scope.sessions_prod_total_y_axis[i] = [];
                }
            }

            $scope.calculate_by_prod_remote_onsite_ind_total = function(id) {
//                console.log(month_dates_x_axis);
                if (false) {
                    usageSummaryByProduct.usageinfo($scope.backenddata.result.customerid, month_dates_x_axis[0],
                            month_dates_x_axis[14], prodfamily_arr, customers)
                            .success(function(data) {//success callback
                                //   sharedProperties.set_usageinfo_by_product_property(data);
                                $scope.usageinfo_by_prod = data;//
                                sharedProperties.set_usageinfo_by_product_property(data);

                                $scope.calculate_prod();

//           console.log($scope.documents_prod_remote_y_axis);
//             console.log($scope.documents_prod_onsite_y_axis);
//             console.log($scope.documents_prod_individual_y_axis);
//console.log($scope.documents_prod_total_y_axis); 
                                $scope.replaceSeries_gridbyproduct();

                            });

                } else {
                    $scope.usageinfo_by_prod = sharedProperties.get_usageinfo_by_product_property();
                    console.log($scope.usageinfo_by_prod);

                    $scope.initialize_yaxis_by_prod_arrays();
                    $scope.calculate_prod();
//console.log(month_dates_x_axis);


                    console.log($scope.documents_prod_remote_y_axis);
                    console.log($scope.documents_prod_onsite_y_axis);
                    console.log($scope.documents_prod_individual_y_axis);
                    console.log($scope.documents_prod_total_y_axis);
                    $scope.replaceSeries_gridbyproduct();
                }

            }
            $scope.calculate_prod = function() {
                $scope.initialize_yaxis_by_prod_arrays();

//console.log(month_dates_x_axis);

                var lengthofmonthsarray = month_dates_x_axis.length;
                var lengthofproductsarray = $scope.backenddata.result.goproducts.length;



//                console.log($scope.usageinfo_by_prod);
                for (var i = 0; i < lengthofmonthsarray; i++) {
                    //console.log(month_dates_x_axis[i]);
                    //building documents sessions searches y axis arrays. 
                    //{"onsite":{"ama":{"documents":0,"sessions":0,"searches":1},"atb"
//:{"documents":0,"sessions":0,"searches":0}

                    if ($scope.usageinfo_by_prod.result[month_dates_x_axis[i]]) {
                        $scope.push_yaxis_prod_arrays(month_dates_x_axis[i], true);
                        //  console.log($scope.documents_prod_remote_y_axis[i]);


//   console.log($scope.documents_prod_remote_y_axis[i]+' ' + $scope.documents_prod_onsite_y_axis[i]+ ' ' +
//           $scope.documents_prod_individual_y_axis[i]+ ' total' + $scope.documents_prod_total_y_axis[i]);
//             console.log($scope.documents_prod_remote_y_axis);

                    }
                    else {
                        //  console.log(i);
                        $scope.push_yaxis_prod_na();
                    }
                    // console.log($scope.productinfo);
                }
                //   console.log($scope.documents_prod_onsite_y_axis);
                for (var j = 0; j < lengthofproductsarray; j++) {
                    for (var i = 0; i < lengthofmonthsarray; i++) {
                        $scope.documents_prod_total_y_axis[j].push($scope.documents_prod_onsite_y_axis[j][i] +
                                $scope.documents_prod_remote_y_axis[j][i] +
                                $scope.documents_prod_individual_y_axis[j][i]);
                        $scope.searches_prod_total_y_axis[j].push($scope.searches_prod_onsite_y_axis[j][i] +
                                $scope.searches_prod_remote_y_axis[j][i] +
                                $scope.searches_prod_individual_y_axis[j][i]);
                        $scope.sessions_prod_total_y_axis[j].push($scope.sessions_prod_onsite_y_axis[j][i] +
                                $scope.sessions_prod_remote_y_axis[j][i] +
                                $scope.sessions_prod_individual_y_axis[j][i]);
                    }
                }


            }
            $scope.push_yaxis_prod_na = function() {
                var a = 'na';//no data for the month so some random data to show no data.
                $scope.documents_prod_onsite_y_axis.push(a);
                $scope.searches_prod_onsite_y_axis.push(a);
                $scope.sessions_prod_onsite_y_axis.push(a);


                $scope.documents_prod_remote_y_axis.push(a);
                $scope.searches_prod_remote_y_axis.push(a);
                $scope.sessions_prod_remote_y_axis.push(a);


                $scope.documents_prod_individual_y_axis.push(a);
                $scope.searches_prod_individual_y_axis.push(a);
                $scope.sessions_prod_individual_y_axis.push(a);

                $scope.documents_prod_total_y_axis.push(a);
                $scope.searches_prod_total_y_axis.push(a);
                $scope.sessions_prod_total_y_axis.push(a);
            }
            $scope.push_yaxis_prod_arrays = function(month_dates_x_axis) {
                var lengthofproductsarray = $scope.backenddata.result.goproducts.length;


                for (var i = 0; i < lengthofproductsarray; i++) {
//              console.log($scope.usageinfo_by_prod.result[month_dates_x_axis].onsite[$scope.backenddata.result.goproducts[i]]);
//console.log($scope.usageinfo_by_prod.result[month_dates_x_axis].onsite);

                    $scope.documents_prod_onsite_y_axis[i].push($scope.usageinfo_by_prod.result[month_dates_x_axis].onsite[$scope.backenddata.result.goproducts[i]]['documents']);
                    $scope.searches_prod_onsite_y_axis[i].push($scope.usageinfo_by_prod.result[month_dates_x_axis].onsite[$scope.backenddata.result.goproducts[i]]['searches']);
                    $scope.sessions_prod_onsite_y_axis[i].push($scope.usageinfo_by_prod.result[month_dates_x_axis].onsite[$scope.backenddata.result.goproducts[i]]['sessions']);


                    $scope.documents_prod_remote_y_axis[i].push($scope.usageinfo_by_prod.result[month_dates_x_axis].remote[$scope.backenddata.result.goproducts[i]]['documents']);
                    $scope.searches_prod_remote_y_axis[i].push($scope.usageinfo_by_prod.result[month_dates_x_axis].remote[$scope.backenddata.result.goproducts[i]]['searches']);
                    $scope.sessions_prod_remote_y_axis[i].push($scope.usageinfo_by_prod.result[month_dates_x_axis].remote[$scope.backenddata.result.goproducts[i]]['sessions']);


                    $scope.documents_prod_individual_y_axis[i].push($scope.usageinfo_by_prod.result[month_dates_x_axis].individual[$scope.backenddata.result.goproducts[i]]['documents']);
                    $scope.searches_prod_individual_y_axis[i].push($scope.usageinfo_by_prod.result[month_dates_x_axis].individual[$scope.backenddata.result.goproducts[i]]['searches']);
                    $scope.sessions_prod_individual_y_axis[i].push($scope.usageinfo_by_prod.result[month_dates_x_axis].individual[$scope.backenddata.result.goproducts[i]]['sessions']);
                }
            }




            $scope.filename = "test";
            //  $scope.getArray = [{a: 1, b:2}, {a:3, b:4}];
            //below is for the csv
            $scope.getArray = [$scope.documents_total_y_axis,
                $scope.searches_total_y_axis,
                $scope.sessions_total_y_axis];

//      $scope.addRandomRow = function() {
//        $scope.getArray.push({a: Math.floor((Math.random()*10)+1), b: Math.floor((Math.random()*10)+1)});
//      };
//
//      $scope.getHeader = function () {return ["A", "B"]};
//
//      $scope.clickFn = function() {
//        console.log("click click click");
//      };

            $scope.plus_button = {};
            $scope.plus_toggle = function(id) {


                if ($scope.plus_button[id] == 1) {
                    $scope.plus_button[id] = 0;

                } else {
                    $scope.plus_button[id] = 1;
                    $scope.calculate_by_prod_remote_onsite_ind_total(id);//calling graph y axis 
                    $scope.plus_toggle_reset_flag[id] = false;
                }


            }
            $scope.plus_toggle_reset_flag = [];
            $scope.plus_toggle_reset_flag[1] = true;//on page load call ajax.
            $scope.plus_toggle_reset_flag[2] = true;//on page load call ajax.
            $scope.plus_toggle_reset_flag[3] = true;
            $scope.plus_toggle_reset_flag[4] = true;//on page load call ajax.
            $scope.plus_toggle_reset = function() {
                $scope.plus_toggle_reset_flag[1] = true;//on page load call ajax.
                $scope.plus_toggle_reset_flag[2] = true;//on page load call ajax.
                $scope.plus_toggle_reset_flag[3] = true;//on page load call ajax.
                $scope.plus_toggle_reset_flag[4] = true;
                $scope.plus_button[1] = 0;
                $scope.plus_button[2] = 0;
                $scope.plus_button[3] = 0;
                $scope.plus_button[4] = 0;



            }


   $scope.initialize_csv = function() {
                $scope.filename = "test";
                //  $scope.getArray = [{a: 1, b:2}, {a:3, b:4}];
                //below is for the csv
                $scope.getArray = [[' '].concat(month_dates_x_axis_actual_on_graph),
                    ['Documents'].concat($scope.documents_grid),
                    ['Sessions'].concat($scope.sessions_grid), ['Searches'].concat($scope.searches_grid)
                ];

                //we call this function on page load and also on changegridvalues.
            }


            $scope.addPoints = function() {
                var seriesArray = $scope.chartConfig.series;
                //console.log(Math.random() * seriesArray.length);
                //Math.random() function returns a floating-point, pseudo-random number in the range [0, 1) 
                var rndIdx = Math.floor(Math.random() * seriesArray.length);
                ////for ex:-  rndidx will be 0 or 1 if two element array.
                if ($scope.count == 0)
                    seriesArray[0].data = seriesArray[0].data.concat([15, 10, 20]);//1,10,20 three points added dynamically.
                var rndIdx = Math.floor(Math.random() * seriesArray.length);
                ////for ex:-  rndidx will be 0 or 1 if two element array.
                if ($scope.count == 1)
                    seriesArray[1].data = seriesArray[1].data.concat([150000, 100000, 200000]);//1,10,20 three points added dynamically.
                $scope.count++;
            };

            $scope.addPoints_Series = function(id) {
                var seriesArray = $scope.chartConfig.series;

                seriesArray[id].data = seriesArray[id].data.concat([150000, 100000, 200000]);//1,10,20 three points added dynamically.

            };

            $scope.addSeries = function() {
                var rnd = []
                for (var i = 0; i < 12; i++) {
                    rnd.push(Math.floor(Math.random() * 100000) + 1)
                }
                $scope.chartConfig.series.push({
                    data: rnd
                })
            }



            $scope.changegridvalues = function() {
                var scope = $scope
                if ($scope.tab == 1) {
                    $scope.documents_grid = $scope.documents_total_y_axis;
                    $scope.searches_grid = $scope.searches_total_y_axis;
                    $scope.sessions_grid = $scope.sessions_total_y_axis;
                }
                else if ($scope.tab == 2)
                {

                    $scope.documents_grid = $scope.documents_remote_y_axis;
                    $scope.searches_grid = $scope.searches_remote_y_axis;
                    $scope.sessions_grid = $scope.sessions_remote_y_axis;
                }
                else if ($scope.tab == 3) {
                    $scope.documents_grid = $scope.documents_onsite_y_axis;
                    $scope.searches_grid = $scope.searches_onsite_y_axis;
                    $scope.sessions_grid = $scope.sessions_onsite_y_axis;
                }
                else if ($scope.tab == 4) {
                    $scope.documents_grid = $scope.documents_individual_y_axis;
                    $scope.searches_grid = $scope.searches_individual_y_axis;
                    $scope.sessions_grid = $scope.sessions_individual_y_axis;
                }
                $scope.initialize_csv();

            }
            $scope.changegridvalues();//calling the above fucntion********

            $scope.replaceSeries_all = function(id) {
                var seriesArray = $scope.chartConfig.series;
                $scope.tab = id;//tab that we want to be selected
                seriesArray.splice(0, Number.MAX_VALUE);
                seriesArray.splice(1, Number.MAX_VALUE);
                seriesArray.splice(2, Number.MAX_VALUE);

//            var rnd = []
//            for (var i = 0; i < num_of_months_to_show; i++) {
//                rnd.push(Math.floor(Math.random() * 100000) + 1)
//            }
                if (id == 1) {
                    $scope.chartConfig.series.push({
                        data: $scope.documents_total_y_axis,
                        name: 'Documents',
                        color: color[0],
                        index: 0
                    });
                    $scope.chartConfig.series.push({
                        data: $scope.searches_total_y_axis,
                        color: color[1],
                        name: 'Searches',
                        index: 2
                    });
                    $scope.chartConfig.series.push({
                        data: $scope.sessions_total_y_axis,
                        color: color[2],
                        name: 'Sessions',
                        index: 1
                    });
                }
                else if (id == 2) {
                    $scope.chartConfig.series.push({
                        data: $scope.documents_remote_y_axis,
                        name: 'Documents',
                        color: color[0],
                        index: 0
                    });
                    $scope.chartConfig.series.push({
                        data: $scope.searches_remote_y_axis,
                        color: color[1],
                        name: 'Searches',
                        index: 2
                    });
                    $scope.chartConfig.series.push({
                        data: $scope.sessions_remote_y_axis,
                        color: color[2],
                        name: 'Sessions',
                        index: 1
                    });
                }
                else if (id == 3) {

                    $scope.chartConfig.series.push({
                        data: $scope.documents_onsite_y_axis,
                        name: 'Documents',
                        color: color[0],
                        index: 0
                    });
                    $scope.chartConfig.series.push({
                        data: $scope.searches_onsite_y_axis,
                        color: color[1],
                        name: 'Searches',
                        index: 2
                    });
                    $scope.chartConfig.series.push({
                        data: $scope.sessions_onsite_y_axis,
                        color: color[2],
                        name: 'Sessions',
                        index: 1

                    });
                }
                else if (id == 4) {
                    $scope.chartConfig.series.push({
                        data: $scope.documents_individual_y_axis,
                        name: 'Documents',
                        color: color[0],
                        index: 0

                    });
                    $scope.chartConfig.series.push({
                        data: $scope.searches_individual_y_axis,
                        color: color[1],
                        name: 'Searches',
                        index: 2
                    });
                    $scope.chartConfig.series.push({
                        data: $scope.sessions_individual_y_axis,
                        color: color[2],
                        name: 'Sessions',
                        index: 1
                    });
                }

                $scope.changegridvalues();
                $scope.replaceSeries_gridbyproduct();
                $scope.chartConfig.options.xAxis.categories = month_dates_x_axis_actual_on_graph;
//            console.log( $scope.chartConfig.series);
            }

//     
            $scope.replaceSeries_gridbyproduct = function() {
                $scope.draw_prod_grid = [];
                if ($scope.tab == 1) {
                    $scope.draw_prod_grid[0] = $scope.documents_prod_total_y_axis;
                    $scope.draw_prod_grid[2] = $scope.searches_prod_total_y_axis;
                    $scope.draw_prod_grid[1] = $scope.sessions_prod_total_y_axis;

                }
                else if ($scope.tab == 2) {
                    $scope.draw_prod_grid[0] = $scope.documents_prod_remote_y_axis;
                    $scope.draw_prod_grid[2] = $scope.searches_prod_remote_y_axis;
                    $scope.draw_prod_grid[1] = $scope.sessions_prod_remote_y_axis;

                } else if ($scope.tab == 3) {
                    $scope.draw_prod_grid[0] = $scope.documents_prod_onsite_y_axis;
                    $scope.draw_prod_grid[2] = $scope.searches_prod_onsite_y_axis;
                    $scope.draw_prod_grid[1] = $scope.sessions_prod_onsite_y_axis;
                } else if ($scope.tab == 4) {
                    $scope.draw_prod_grid[0] = $scope.documents_prod_individual_y_axis;
                    $scope.draw_prod_grid[2] = $scope.searches_prod_individual_y_axis;
                    $scope.draw_prod_grid[1] = $scope.sessions_prod_individual_y_axis;
                }
                $scope.addprod_csv();
            }

            $scope.print = function() {
                var chart = this.chartConfig.getHighcharts();
                chart.print();
            }
            $scope.printIt = function() {
                $(".header").hide();


                window.print();
                $(".header").show();
            };

            $scope.print_page = function() {//try to use this for print
                console.log('modal print');

                var table = document.querySelector('.mainContent').innerHTML;
                var myWindow = window.open('', '', 'width=800, height=600');
                myWindow.document.write('<div ng-view="" class="wrapper ng-scope">' + table + '</div><link href="/css/statsrep5/global.css" rel="stylesheet" type="text/css" />' +
                        '<link href="/css/statsrep5/sdls_global.css" rel="stylesheet" type="text/css" />' +
                        '<link rel="stylesheet" type="text/css" href="/css/statsrep5/normalize.css"/>' +
                        '<link href="/css/statsrep5/tablet.css" rel="stylesheet" type="text/css" media="only screen and (min-device-width: 768px)" />' +
                        '<link href="/css/statsrep5/desktop.css" rel="stylesheet" type="text/css" media="only screen and (min-device-width:1024px)" />'


                        );
                myWindow.print();

            };
            $scope.toggleLoading = function() {
                this.chartConfig.loading = !this.chartConfig.loading
            }






            $scope.modalShown = false;//on page load no modal shown
            $scope.toggleModal = function() {
                $scope.modalShown = !$scope.modalShown;
            }

            $scope.run_both_next_prev = function(posted_data, startdate, next, enddate) {
                $scope.plus_toggle_reset();
                if (posted_data.radioincludesites == 'yes') {
                    var customers = $scope.customers;
                } else {
                    var customers = [$scope.backenddata.result.customerid];
                }

//               $scope.modalcontent = '';//no content only loading image.
//                $scope.loading_image_show = true;
//                $scope.toggleModal();

                if (next == true) {
                    var localenddate = enddate;
                } else {

                    var localenddate = posted_data.year;
                }


                $scope.modalcontent = '';//no content only loading image.
                $scope.loading_image_show = true;
                $scope.toggleModal();
                usageSummary.usageinfo($scope.backenddata.result.customerid, startdate,
                        localenddate, prodfamily_arr, customers)
                        .success(function(data) {//success callback
                            $scope.usageinfo = data;
                            // console.log(data);
                            sharedProperties.set_usageinfo_property2($scope.usageinfo);




                            if (next == true && next != '') {
                                $scope.calculate_months_xaxis_next_in_pagination(posted_data, enddate);
//                        console.log(month_dates_x_axis_actual_on_graph);
                                $scope.calculate_remote_onsite_ind_total_next_in_pagination();
                                $scope.replaceSeries_all($scope.tab);
                            } else {
                                $scope.calculate_months_xaxis_previous_in_pagination(posted_data);
                                $scope.calculate_remote_onsite_ind_total_previous_in_pagination();
                                $scope.replaceSeries_all($scope.tab);
                            }



                        }).error(function() {
                    $scope.toggleModal();//hide the modal
                }).finally(function() {
                    document.title = 'thunderify Statistical Reporting';

                    $scope.toggleModal();
                    posted_data.year = posted_data.actualposteddatayear;
                });



            }


            $scope.run_previous = function() {
                document.title = 'Loading...';
                //once submitted the post data needs to be put in below property for next controller to access it 
                //  post_to_chart_properties.setProperty($scope.rpt);
                //we get the property right here and also in the next controller(chart controller).
                // var posted_data =  {"rpt_type":"OUS","year":"2009-04-01","prodfamily":"bkflix","radioincludesites":"yes"}//post_to_chart_properties.getProperty();//only the html element values on selector page

                posted_data.actualposteddatayear = posted_data.year;
                posted_data.year = dates[dates.indexOf(month_dates_x_axis[0]) - 1]//"2009-04-01";
//            console.log(  posted_data.year);
                var key = '';
                var i = 0;


                var startdate = '';

                var endoffor = dates.indexOf(posted_data.year) - prev_next_months_count;//dont put this in for loop
                var initialize_i = dates.indexOf(posted_data.year);
                for (i = initialize_i; i > endoffor; i--) {
                    if (dates[i]) {
                        startdate = dates[i];//earlier date.
                        //num_of_months_to_show 15 month dates have been calculated. start date comes from that. 



                    }


                }



                if (startdate && posted_data.year) {
                    $scope.run_both_next_prev(posted_data, startdate, '', '')
                }

            }



            $scope.run_next = function() {
                document.title = 'Loading...';
                //once submitted the post data needs to be put in below property for next controller to access it 
                //  post_to_chart_properties.setProperty($scope.rpt);
                //we get the property right here and also in the next controller(chart controller).
                // var posted_data =  {"rpt_type":"OUS","year":"2009-04-01","prodfamily":"bkflix","radioincludesites":"yes"}//post_to_chart_properties.getProperty();//only the html element values on selector page
                posted_data.actualposteddatayear = posted_data.year;
                posted_data.year = month_dates_x_axis[month_dates_x_axis.length - 1];//"2009-04-01";
//              console.log(  posted_data.year);
                var key = '';
                var i = 0;


                var startdate = dates[dates.indexOf(posted_data.year) + 1];
                var enddate = '';
                var endoffor = dates.indexOf(posted_data.year) + prev_next_months_count;//dont put this in for loop
                var initialize_i = dates.indexOf(posted_data.year);
                for (i = initialize_i; i <= endoffor; i++) {
                    if (dates[i]) {
                        dates[i];
                        enddate = dates[i];//earlier date.
                        //num_of_months_to_show 15 month dates have been calculated. start date comes from that. 



                    }


                }


                if (startdate && enddate) {
//console.log(startdate+enddate);
                    $scope.run_both_next_prev(posted_data, startdate, true, enddate);
                }

            }








            Highcharts.setOptions({
                lang: {
                    decimalPoint: '.',
                    thousandsSep: ','
                }
            });
            $scope.chartConfig = post_to_chart_properties.set_chart_config($scope, month_dates_x_axis_actual_on_graph, color);


            $scope.removeRandomSeries = function() {
                var seriesArray = $scope.chartConfig.series
                var rndIdx = Math.floor(Math.random() * seriesArray.length);
                seriesArray.splice(rndIdx, 1);
                //array.splice(start, deleteCount[, item1[, item2[, ...]]])
            }
            $scope.removeSeries = function(id) {
                var seriesArray = $scope.chartConfig.series

                seriesArray.splice(id, 1);
                //array.splice(start, deleteCount[, item1[, item2[, ...]]])
            }

            $scope.swapChartType = function() {
                if (this.chartConfig.options.chart.type === 'line') {
                    this.chartConfig.options.chart.type = 'column';//was bar before. column and line are two graphs
                } else {
                    this.chartConfig.options.chart.type = 'line'
                    this.chartConfig.options.chart.zoomType = 'x'
                }
            }
         

            $scope.addprod_csv = function() {
                $scope.getArray = [];
                var fifteen_element_empty_arr = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
                $scope.getArray.push([' '].concat(month_dates_x_axis_actual_on_graph));
                $scope.getArray.push(['Documents'].concat($scope.documents_grid));



//loop draw_prod_grid[0] the prod array num of times 
//loop draw_prod_grid[1] the prod array num of times
//loop draw_prod_grid [2] the prod array num of times.
                if ($scope.draw_prod_grid[0] && (!$scope.plus_toggle_reset_flag)) {
                    for (var j = 0; j < lengthofproductsarray; j++) {
                        
                        $scope.getArray.push([$scope.productinfo[prodfamily_arr[j]]].concat($scope.draw_prod_grid[0][j]));
                    }
                    $scope.getArray.push(fifteen_element_empty_arr);
                }


//    scope.draw_prod_grid[0]
                $scope.getArray.push(['Sessions'].concat($scope.sessions_grid));
                if ($scope.draw_prod_grid[1] && (!$scope.plus_toggle_reset_flag)) {
                    for (var j = 0; j < lengthofproductsarray; j++) {
                        $scope.getArray.push([$scope.productinfo[prodfamily_arr[j]]].concat($scope.draw_prod_grid[1][j]));
                    }
                    $scope.getArray.push(fifteen_element_empty_arr);
                }
                $scope.getArray.push(['Searches'].concat($scope.searches_grid));
                if ($scope.draw_prod_grid[2] && (!$scope.plus_toggle_reset_flag)) {
                    for (var j = 0; j < lengthofproductsarray; j++) {
                        $scope.getArray.push([$scope.productinfo[prodfamily_arr[j]]].concat($scope.draw_prod_grid[2][j]));
                    }
                    $scope.getArray.push(fifteen_element_empty_arr);
                }
//console.log($scope.getArray);
            }
















//above are 3 functions you need to add to chartcontroller. call  $scope.initialize_csv(); at the end of chartcontroller after months, yaxis data is generated. 
//scope.addprod_csv(); //call that in replaceSeries_gridbyproduct() at end
// scope.initialize_csv(); //call that at end of changegridvalues

        }
    }]
        );
