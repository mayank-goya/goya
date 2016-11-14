

define([], function(app){
    'use strict';

    function homescreen($state){
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'html/templates/homeRedirectingDirective.html',
            scope:{
                custid:'=',
                custname:'='
            },
            link: function(scope, element, attrs) { 
                scope.$watch('custid',function  () { 
                    console.log('custid'+scope.custid)
                });
                scope.$watch('custname',function  () { 
                 console.log('custname'+scope.custname)  
                });
               scope.goToHome = function  () {
                    $('.homeScreen').modal('hide');
                    $('.modal-open').css('overflow','scroll');
                    $state.go('home');

                }
            }
        }
    }

    homescreen.$inject=['$state'];

    return homescreen;

});
