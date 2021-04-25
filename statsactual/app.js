
/*following is the common code for posting php arrays from UI in post arrays instead of json */
    var StatsApp = angular.module('StatsApp', ["highcharts-ng", 'ngRoute', 'StatsControllers', 
        "ngSanitize", "ngCsv"], function($httpProvider) {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }];
    });
   
    StatsApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.
   
                    when('/report', {
                        templateUrl: 'partials/report/report.php',
                        controller: 'ReportController',
                        resolve: {
                            auth: ["$q", "sharedProperties", '$location', function($q, sharedProperties, $location) {
                                    
                                    ;

                                    if (sharedProperties.getProperty()) {
                                        $location.path('/report');
                                    } else {
                                        $location.path('/new');
                                    }
                                }]
                        }
                    }).when('/report_backup', {
                templateUrl: 'partials/includes/report_backup.html',
                controller: 'ReportController'

            }).
                    when('/chart', {
                        templateUrl: 'partials/chart/chart.php',
                        controller: 'ChartController',
                        resolve: {
                            auth: ["$q", "post_to_chart_properties", '$location', function($q, post_to_chart_properties, $location) {
                                    
                                    

                                   
                                }]
                        }
                    }).
                    when('/test', {
                        templateUrl: 'partials/test/test.php',
                        controller: 'TestController'
                    }).
                    when('/loading', {
                        templateUrl: 'partials/test/loading.html',
                    }).
                    when('/report_yoy', {
                        templateUrl: 'partials/test/report-YoY.php',
                    }).
                    when('/help', {
                        templateUrl: 'partials/includes/help.php',
                        controller: 'POCController'
                    }).
                    when('/poc', {
                        templateUrl: 'partials/poc/poc.php',
                        controller: 'POCController'
                    }).
                    when('/new', {//new controller adding route first.
                        // data\stats3\scripts\javascript\stats3\statsrep5\js\app.js//js somewhere else. 
                        // anguitar used to have same place. 
                        // data\stats3\scripts\php\stats3\common\statsrep5.0\index.html
                        // data\stats3\scripts\php\stats3\common\statsrep5.0\partials\newlogin.html
                        // data\stats3\docs\remote\ang\styles.css//css is here. images also. 4 paths. understood
                        //above three are paths to javascript, html, partials. 
                        templateUrl: 'partials/login/newlogin.php', //new page. add controller now. controller already thr akda pee ella sghow me
                        controller: 'LoginController' //is there a partial.so its there. thats y follow the above paths.
                    }).
                    otherwise({
                        redirectTo: '/new'
                    });
        }]);