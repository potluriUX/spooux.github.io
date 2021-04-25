
    StatsApp.factory('helloWorldFromFactory', ['$http', '$location',
        function($http, $location)//added new
        {

            return {
                sayHello: function(un, pwd) {
                    return $http({
                        url: "/reportdata",
                        method: "POST",
                        data: {
                            "request": "getCustomerInfo",
                            "p1": un,
                            'p2': pwd,
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
    StatsApp.factory("services", [
        function($scope, $http, $location)//added new
        {

            // var serviceBase = 'services/';
            //serviceBase = './app/test.php?f=';
            var obj = {};
            obj.getCustomers = function() {

                $http({
                    url: "/reportdata",
                    method: "POST",
                    data: {
                        "request": "getCustomerInfo",
                        "p1": $scope.un,
                        'p2': $scope.pwd,
    //                'p3':{'key1':'asdf','key2' : 'objects'},
    //                'p4':['1','2','onlyarraywith3elements'],
    //                'p5':[{'key1':'asdf'}, {'key2' : 'objects'}],
    //                'p6' : [{'key1':'asdf','key2' : 'objects'}]
                    },
                }).success(function(data, status, headers, config) {


                    $scope.valid = data; // assign  $scope.persons here as promise is resolved here 

                    if ($scope.valid.result.customerid) {//check for customer id ok na
                        // alert("true");
                        $scope.show_un_or_pwd_error = 0;//success and we got data back.

                        // $location.path('/report'); //emantav. i added location as dependancy in square bracket and using that to change pathk
                    } else {
                        $scope.show_un_or_pwd_error = 1;
                    }

                })


            }
            return obj;
        }]);
    StatsControllers.controller("LoginController", ['$scope', '$http', '$location', '$q', 'sharedProperties', 'services', 'helloWorldFromFactory',
        function($scope, $http, $location, $q, sharedProperties, services, helloWorldFromFactory)//added new
        {
            //below is TDD stuff
    //           $scope.name = 'Superhero';
    //            $scope.counter = 0;
    //            $scope.$watch('name', function (newValue, oldValue) {
    //            $scope.counter = $scope.counter + 1;
    //        });
            //tdd stuff finished
            // $scope.showusers = false;//if its zero it wont show. if its one it will. ha
            $scope.test = function() {
                document.title = 'Loading...';
                $scope.loading_gif_image_show = true;
                var defer = $q.defer();
                if (!$scope.un) {
                    $scope.un_invalid = true;
                }
                else {
                    $scope.un_invalid = false;
                }
                if (!$scope.pwd) {
                    $scope.pwd_invalid = true;
                }
                else {
                    $scope.pwd_invalid = false;
                }
                if ($scope.un && $scope.pwd) {
                    
$location.path('/report'); 
                    // helloWorldFromFactory.sayHello($scope.un, $scope.pwd).success(function(data) {
                    //     defer.resolve(data);
                    //     $scope.valid = data; // assign  $scope.persons here as promise is resolved here 
                    //     sharedProperties.setProperty(data);
                    //     if ($scope.valid.result.customerid) {//check for customer id ok na
                    //         // alert("true");
                    //         $scope.show_un_or_pwd_error = 0;//success and we got data back.

                    //         $location.path('/report'); //emantav. i added location as dependancy in square bracket and using that to change pathk
                    //     } else {
                    //         $scope.show_un_or_pwd_error = 1;
                    //     }


                    // }).error(function(data, status, headers, config) {
                    //     //handle error here
                    //     defer.reject();
                    //     $scope.loading_gif_image_show = false;//error then remove the gif so user doesnt think it still 
                    //     //processing
                    // }).finally(function() {
                    //     // called no matter success or failure
                    //     $scope.loading_gif_image_show = false;
                    //       document.title = 'thunderify Statistical Reporting';
                    // });
                    ;

                    return defer.promise;
                }//.bind(this) i dont need to bind this. $scope is binded automatically. i m thinking. 
                else{
                    $scope.loading_gif_image_show = false;//remove gif if user pwd validation error
                }
            }
        }]
            );
