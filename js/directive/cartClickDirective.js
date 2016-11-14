define([], function(app) {
    'use strict';

    function cartClick() {
        return {
            restrict: 'C',
            link: function($scope, element) {
                var dEl = angular.element(document.querySelector('#cart'));
                var bEl = angular.element(document.querySelector('body'));
                var eL = angular.element(document.querySelector('#width-fxt'));
                $scope.clickCount = 0;
                dEl.bind('click', function(e) {
                    $scope.$apply(function() {
                            $scope.clickCount++;
                        if ($scope.clickCount == 1) {
                            eL.css('display', 'block');
                        } else {
                            $scope.clickCount = 0;
                            eL.css('display', 'none');

                        }
                    })

                });

            }
        }
    }

    cartClick.$inject = [];

    return cartClick;

});