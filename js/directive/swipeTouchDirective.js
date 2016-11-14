define([], function(app) {
    'use strict';

    function swipeTouch($timeout) {
        return {
            restrict: 'C',
            link: function($scope, element) {
                element.bind('touchstart', function(e) {
                    $scope.$apply(function() {      
                    $timeout(function  () {
                         alert('thanks for touch');
                    },2000)                                                           
                    })

                })

            }
        }
    }

    swipeTouch.$inject = ['$timeout'];

    return swipeTouch;

});