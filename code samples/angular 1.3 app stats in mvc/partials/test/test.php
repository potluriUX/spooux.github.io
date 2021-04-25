<!DOCTYPE html>
<html ng-app="StatsApp" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <title>Testing angular controllers with Jasmine  - jsFiddle demo by fdietz</title>
  
  
  
  <link rel="stylesheet" type="text/css" href="/css/normalize.css">
  
  
  <link rel="stylesheet" type="text/css" href="/css/result-light.css">
  
    
      <script type='text/javascript' src="http://jasmine.github.io/1.3/lib/jasmine.js"></script>
    
  
    
      <script type='text/javascript' src="http://jasmine.github.io/1.3/lib/jasmine-html.js"></script>
    
  
    
      <link rel="stylesheet" type="text/css" href="http://jasmine.github.io/1.3/lib/jasmine.css">
    
  
    
      <script type='text/javascript' src="http://code.angularjs.org/1.2.9/angular.js"></script>
    
  
    
      <script type='text/javascript' src="http://code.angularjs.org/1.2.9/angular-mocks.js"></script>
    
  
  <style type='text/css'>
    
  </style>
  
</head>
<body>
  <script src="/newjs/common/angular-route.min.js" type="text/javascript" ></script>
  
	<script src="/newjs/common/app.js" type="text/javascript" ></script>
	<script src="/newjs/common/controllers.js" type="text/javascript" ></script>
        
         <script src="/newjs/common/highcharts-ng.js"></script>
         
    <script src="/newjs/common/highcharts-ng2.js" type="text/javascript" ></script>
    <!--include exporting.js after highchart.js or else export wont work -->
    <script src="/newjs/common/exporting.js" type="text/javascript" ></script>
<script src="/newjs/test/testcontroller.js" type="text/javascript" ></script>
<script src="/newjs/login/logincontroller.js" type="text/javascript" ></script>
<script type='text/javascript'>//<![CDATA[ 

//--- CODE --------------------------
(function (angular) {

})(angular);



// ---SPECS-------------------------

describe('myApp', function () {
    var scope,
    controller;
    beforeEach(function () {
        module('StatsApp');
    });

    describe('LoginController', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('LoginController', {
                '$scope': scope
            });
        }));
//        it('sets the name', function () {
//            expect(scope.name).toBe('Superhero');
//        });
        
         it('correct login', function () {
             scope.un = 'internal';
             scope.pwd = 'stats';
            expect(scope.un).not.toBe(null) ;
             expect(scope.pwd).not.toBe(null) ;
             scope.test();
             console.log(scope.valid);
        });

//        it('watches the name and updates the counter', function () {
//            expect(scope.counter).toBe(0);
//            scope.name = 'Batman';
//            scope.$digest();
//            expect(scope.counter).toBe(1);
//        });
    });

    describe('CtrlHttp', function () {

        var $httpBackend,
//            expectedUrl = "/reportdata?request=getCustomerInfo&p1="+$scope.un+'p2=' +$scope.pwd,
            promise,
            successCallback,
            errorCallback,
            httpController;

        beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            scope = $rootScope.$new();
            successCallback = jasmine.createSpy();
            errorCallback = jasmine.createSpy();
            httpController = $controller('LoginController', {
                '$scope': scope
            });
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('returns http requests successfully and resolves the promise', function () {
            scope.un = 'internal';
             scope.pwd = 'stats2';
              var expectedUrl= "/reportdata";
            var data = {"resultcode":0,"result":
                        {"customerid":"6000245100","customername":"MARY KURTZ","aggcode":"    ",
                    }}
;
            expect(httpController).toBeDefined();
            
            $httpBackend.expectPOST(expectedUrl).respond(200, data);
            promise = scope.test();
            promise.then(successCallback, errorCallback);

            $httpBackend.flush();

            expect(successCallback).toHaveBeenCalledWith(angular.fromJson(data));
            expect(errorCallback).not.toHaveBeenCalled();
        });
        
         it('returns http requests successfully and resolves the promise', function () {
            scope.un = 'internal';
             scope.pwd = 'stats2';
              var expectedUrl= "/reportdata";
            var data = {"resultcode":0,"result":
                        {"customerid":"6000245100","customername":"MARY KURTZ","aggcode":"    ",
                    }}
;
            expect(httpController).toBeDefined();
            
            $httpBackend.expectPOST(expectedUrl).respond(200, data);
            promise = scope.test();
            promise.then(successCallback, errorCallback);

            $httpBackend.flush();

            expect(successCallback).toHaveBeenCalledWith(angular.fromJson(data));
            expect(errorCallback).not.toHaveBeenCalled();
        });

        it('empty un and pwd', function () {
            scope.un = '';
             scope.pwd = '';
//           var expectedUrl= "/reportdata";
//            $httpBackend.expectPOST(expectedUrl).respond(500, 'Oh no!!');
            promise = scope.test();
            expect(promise).not.toBeDefined();
             });
             it('empty pwd and 0 un', function () {
             scope.un = '0';
             scope.pwd = '';
//           var expectedUrl= "/reportdata";
//            $httpBackend.expectPOST(expectedUrl).respond(500, 'Oh no!!');
            promise = scope.test();
            expect(promise).not.toBeDefined();
             });
             it('empty un and 0 pwd', function () {
             scope.un = '';
             scope.pwd = '0';
//           var expectedUrl= "/reportdata";
//            $httpBackend.expectPOST(expectedUrl).respond(500, 'Oh no!!');
            promise = scope.test();
            expect(promise).not.toBeDefined();
             });
             it('zero un and pwd4', function () {
             scope.un = ' ';
             scope.pwd = ' ';
           var expectedUrl= "/reportdata";
            $httpBackend.expectPOST(expectedUrl).respond(500, 'Oh no!!');
            promise = scope.test();
             $httpBackend.flush();
            expect(promise).toBeDefined();
             });
             it('empty un and pwd5', function () {
             scope.un = '0';
             scope.pwd = '0';
           var expectedUrl= "/reportdata";
            $httpBackend.expectPOST(expectedUrl).respond(500, 'Oh no!!');
            promise = scope.test();
             $httpBackend.flush();
            expect(promise).toBeDefined();
//           
        });
    });
    
});

// --- Runner -------------------------
(function () {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var currentWindowOnload = window.onload;

    window.onload = function () {
        if (currentWindowOnload) {
            currentWindowOnload();
        }
        execJasmine();
    };

    function execJasmine() {
        jasmineEnv.execute();
    }

})();
//]]>  

</script>


</body>


</html>

