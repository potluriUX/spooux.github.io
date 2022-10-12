StatsApp.factory('getProductInfo', ['$http', '$location',
    function($http, $location)//added new
    {

        return {
            prodinfo: function() {
                return $http({
                    url: "/reportdata",
                    method: "POST",
                    data: {
                        "request": "getProductInfo",
                        //                'p3':{'key1':'asdf','key2' : 'objects'},
                        //                'p4':['1','2','onlyarraywith3elements'],
                        //                'p5':[{'key1':'asdf'}, {'key2' : 'objects'}],
                        //                'p6' : [{'key1':'asdf','key2' : 'objects'}]
                    },
                })
            }

        }
    }
]);



StatsControllers.controller("ReportController", ['$scope', '$http', '$location', 'sharedProperties', 'getProductInfo',
    'post_to_chart_properties', 'usageSummary','usageSummaryByProduct',
    function($scope, $http, $location, sharedProperties, getProductInfo, post_to_chart_properties, usageSummary, usageSummaryByProduct) {//added new{

        $scope.backenddata = sharedProperties.getProperty();
        var posted_data = post_to_chart_properties.getProperty();
        
        $scope.lastprop = Object.keys($scope.backenddata.result.usagedates)[Object.keys($scope.backenddata.result.usagedates).length - 1];//$scope.backenddata.result.usagedates[Object.keys($scope.backenddata.result.usagedates)[Object.keys($scope.backenddata.result.usagedates).length - 1]]

        if (posted_data) {
            //  console.log(posted_data);
            $scope.rpt = posted_data;
            $scope.group_from_posted_data = posted_data.radioincludesites;
            $scope.group2_from_posted_data = posted_data.radioincludesites2;
            $scope.prod_family_from_posted_data = posted_data.prodfamily;

        } else {
            $scope.rpt = {"rpt_type": "OUS", 'year': $scope.lastprop, 'prodfamily': "GO"}
        }
        //  $scope.productinfo = {1:'ravi', 2:"potluri"};
        $scope.GO = 'GO';
//alert("asdf");
        if (!sharedProperties.get_productinfo_property()) {
            getProductInfo.prodinfo().success(function(data) {
                // alert("Asdf");
                $scope.productinfo = data.result.products;
                sharedProperties.set_productinfo_property($scope.productinfo);
                // console.log($scope.productinfo);
            });
        } else {
            $scope.productinfo = sharedProperties.get_productinfo_property();
        }

        $scope.shared = function() {
//console.log(this.sharedvar);
            //  console.log(sharedProperties.getProperty());//is the customer data.
        }

        $scope.resetprodfamily = function() {

            $scope.rpt.prodfamily = false;
        }
          $scope.run2 = function() {
            $scope.toggleModal2();
            $scope.modalcontent = "transclude true";

        }
$scope.toggleModal2 = function() {
            $scope.modalShown2 = !$scope.modalShown2;
        }
        $scope.run = function() {
            
            document.title = 'Loading...';
            //once submitted the post data needs to be put in below property for next controller to access it 
//           console.log($scope.productinfo);
//           console.log($scope.rpt.prodfamily);
           if($scope.rpt.prodfamily == 'GO') {
            $scope.rpt.prod_title = "Thunderify GO";
        }
        else{
             $scope.rpt.prod_title = $scope.productinfo[$scope.rpt.prodfamily];
        }
            post_to_chart_properties.setProperty($scope.rpt);
//            console.log($scope.rpt);
            //we get the property right here and also in the next controller(chart controller).
            var posted_data = post_to_chart_properties.getProperty();//only the html element values on selector page

            var key = '';
            var i = 0;


            var startdate = '';
            var dates = Object.keys($scope.backenddata.result.usagedates);
            var endoffor = dates.indexOf(posted_data.year) - 15;//dont put this in for loop
            for (i = dates.indexOf(posted_data.year); i > endoffor; i--) {
                if (dates[i]) {
                    startdate = dates[i];//earlier date.
                    //15 month dates have been calculated. start date comes from that. 



                }


            }

            if (posted_data.radioincludesites == 'yes') {
                var customers = Object.keys($scope.backenddata.result.children)
            } else {
                var customers = [$scope.backenddata.result.customerid];
            }
            if (posted_data.prodfamily == 'GO') {
                var prodfamily_arr = $scope.backenddata.result.goproducts;
                
              
                //if go is chosen then go products array is passed. 
            } else {
                var prodfamily_arr = [posted_data.prodfamily];
            }
            $scope.modalcontent = '';//no content only loading image.
            $scope.loading_image_show = true;
            $scope.toggleModal();
            $location.path('/chart');
            usageSummary.usageinfo($scope.backenddata.result.customerid, startdate,
                    posted_data.year, prodfamily_arr, customers)
                    .success(function(data) {//success callback
                        $scope.usageinfo = data;
                        // console.log(data);
                        sharedProperties.set_usageinfo_property($scope.usageinfo);


                        if ($scope.usageinfo.result.length != 0) {

                            $location.path('/chart');//after everything send to chart controller.
                        }

                        else {
                            $scope.loading_image_show = false;
                            $scope.modalcontent = "There are no statistics available for this product for the time period you have specified." +
                                    "Please verify that you have selected a time period for which you had an active " +
                                    "subscription to the product.";
                            $scope.toggleModal();
                            $scope.toggleModal();
                            // alert("There are no statistics available for this product for the time period you have specified." +
                            //         "Please verify that you have selected a time period for which you had an active " +
                            //         "subscription to the product.");
                        }

                    }).error(function() {
                        
                $scope.toggleModal();//hide the modal
                $location.path('/chart');
            }).finally(function() {
                document.title = 'Thunderify Statistical Reporting';
            });
$location.path('/chart');
        }
        

        $scope.modalShown = false;//on page load no modal shown
        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        }
    }]
        );








//                (" rpttype " + $scope.rpt.rpt_type
//                        + " productfamily " + $scope.rpt.prodfamily
//    //                    + " rptlength " + $scope.rpt.radiorptlength
//    //                    + " rptformat " + $scope.rpt.radiorptformat
//                        + " radioincludesites " + $scope.rpt.radioincludesites
//                        + " rpt.year " + $scope.rpt.year);
//      console.log(" rpttype " + $scope.rpt.rpt_type  
//                    + " productfamily " + $scope.rpt.prodfamily 
////                    + " rptlength " + $scope.rpt.radiorptlength
////                    + " rptformat " + $scope.rpt.radiorptformat
//                    + " radioincludesites " + $scope.rpt.radioincludesites
//                    +" rpt.year "+ $scope.rpt.year
//                    
//                    );

//            alert(" rpttype " + $scope.rpt.rpt_type  
//                    + " productfamily " + $scope.rpt.prodfamily 
////                    + " rptlength " + $scope.rpt.radiorptlength
////                    + " rptformat " + $scope.rpt.radiorptformat
//                    + " radioincludesites " + $scope.rpt.radioincludesites
//                    +" rpt.year "+ $scope.rpt.year
//                    
//                    );
