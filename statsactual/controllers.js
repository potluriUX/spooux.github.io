

var StatsControllers = angular.module("StatsControllers", []);


StatsControllers.directive('modalDialog', function() {
  return {
    restrict: 'E',//element
    scope: {
      show: '=',
      info:"="//vvvvv imp @potluri we passed 'info' from controller template(report.php) to the directive template(modal.php)!!
      ,changednameofinfo:"=info"
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      
     
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function(param) {
          if(param == true){
              
          }else{
        scope.show = false;
    }
  //  scope.info = 'asdfasdfasdfasdf'; //this changes the loading_image_show variable in controller. two way data binding
  //two way databinding between directive <->controller vv imp.
      };
    
    },
  //   controller: "ReportController",//very nice. we can pass controller variables to the template thru this
    templateUrl: "./partials/includes/modal.php",
  };
});
StatsControllers.directive('modalDialoge', function() {
  return {
    restrict: 'E',
    scope: {
           show: '=',
      changednameinfo: '=info2'},
    ////element
//    scope: {
//      show: '=',
//      info:"="//vvvvv imp @SDevi we passed 'info' from controller template(report.php) to the directive template(modal.php)!!
//      ,changednameofinfo:"=info"
//    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    //transclude true means outer scope or maincontroller scope is what is available to this scope.
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      console.log(scope.changednameinfo);
     
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
    scope.hideModal=function(){
        scope.show=true;
    };
},

  templateUrl: "./partials/includes/modal2.php",
  };
});
StatsControllers.directive('header', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "./partials/includes/header.php",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
        }]
    }
});
StatsControllers.directive('footer', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "./partials/includes/footer.php",
        controller: ['$scope', '$filter', function ($scope, $filter) {
                $scope.date = new Date();
            // Your behaviour goes here :)
        }]
    }
});
StatsControllers.directive('myCustomer', function() {
  return {
    template: 'Name: {{item.name}} Address: {{item.description}}'
  };
});

StatsControllers.directive("myClick", function () {

        return {

           link: function (scope, element, attr) {

               element.bind("click", function () {

                    alert("I was clicked");

               });

           }

       };

   });
   
  StatsControllers.
    directive('myBackgroundImage', function () {
        return function (scope, element, attrs) {
            element.css({
                'background-image': 'url(' + attrs.myBackgroundImage + ')',
                    'background-size': 'cover',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center center'
            });
        };
    });
      StatsControllers.directive('rotateOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var deg = 0;
      element.bind('click', function() {
        deg+= parseInt(attrs.rotateOnClick, 10);
        element.css({
          webkitTransform: 'rotate('+deg+'deg)', 
          mozTransform: 'rotate('+deg+'deg)', 
          msTransform: 'rotate('+deg+'deg)', 
          oTransform: 'rotate('+deg+'deg)', 
          transform: 'rotate('+deg+'deg)'    
        });
      });
    }
  };
});

StatsControllers.directive('toolbarTip', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
           // console.log(scope.$eval(attrs.toolbarTip));
            $(element).toolbar(scope.$eval(attrs.toolbarTip));
        }
    };
});
StatsControllers.directive('tooltip', function ($document, $compile) {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {
            var tip = $compile('<div ng-class="tipClass">{{ text }}<div class="tooltip-arrow"></div></div>')(scope), 
                    tipClassName = 'tooltip', 
                    tipActiveClassName = 'tooltip-show';
//            <h1>{{headertext}}</h1> 
            scope.tipClass = [tipClassName];
            scope.text = attrs.tooltip;
           // scope.headertext = attrs.headertext;
           // var offsettop_override = parseInt(attrs.offsettopOverride);
            
            if (attrs.tooltipPosition) {
                scope.tipClass.push('tooltip-' + attrs.tooltipPosition);
            } else {
                scope.tipClass.push('tooltip-down');
            }
            $document.find('body').append(tip);
            element.bind('mouseover', function (e) {
                tip.addClass(tipActiveClassName);
                
                var pos = e.target.getBoundingClientRect(), 
                offset = tip.offset(), 
                tipHeight = tip.outerHeight(), 
                tipWidth = tip.outerWidth(), 
                elWidth = pos.width || pos.right - pos.left, 
                elHeight = pos.height || pos.bottom - pos.top, tipOffset = 10;
          
    var docElem, win, rect, doc;

   
        
        win = window;
        docElem = document.documentElement;

        
           var top= pos.top + win.pageYOffset - docElem.clientTop;
           var left= pos.left + win.pageXOffset - docElem.clientLeft
      

                if (tip.hasClass('tooltip-right')) {
                    offset.top = top - tipHeight / 2 + elHeight / 2 ;
                    offset.left = left + tipOffset;
                } else if (tip.hasClass('tooltip-left')) {
                    offset.top = top- tipHeight / 2 + elHeight / 2 ;
                    offset.left = left- tipWidth - tipOffset;
                } else if (tip.hasClass('tooltip-down')) {
                    offset.top = top + elHeight + tipOffset ;
                    offset.left = left - tipWidth / 2 + elWidth / 2;
                } else {
                    offset.top = top - tipHeight - tipOffset ;
                    offset.left = left - tipWidth / 2 + elWidth / 2;
                }
                tip.offset(offset);
            });
            element.bind('mouseout', function () {
               tip.removeClass(tipActiveClassName);
            });
            tip.bind('mouseover', function () {
                tip.addClass(tipActiveClassName);
            });
            tip.bind('mouseout', function () {
               tip.removeClass(tipActiveClassName);
            });
        }
    };
});
