

StatsControllers.controller("POCController", ['$scope','$http', '$location','$q','sharedProperties',
	function($scope, $http, $location, $q, sharedProperties)//added new
		{  
                    //below is TDD stuff
//           $scope.name = 'Superhero';
//            $scope.counter = 0;
//            $scope.$watch('name', function (newValue, oldValue) {
//            $scope.counter = $scope.counter + 1;
//        });
        //tdd stuff finished
            // $scope.showusers = false;//if its zero it wont show. if its one it will. ha
             $scope.poc = function(){

 $http({
             url: "/inprogress/arraytest.php",
            method: "POST",
            data: {
               customer:[12345, 'abcde']
            },
            
        }).success(function (data, status, headers, config) {
//           console.log(data);
                $scope.data = data;
               
            })
            
             }
         }]
     );
