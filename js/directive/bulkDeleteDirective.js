define([], function(app) {
    'use strict';

    function bulkModal() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                'deleteOrder': '&',
                'resetBulk': '&',
                'mobCheck': '=',
                'deleteMob': '&',
                'canMob': '&'
            },
            templateUrl: 'html/templates/bulkDelete.html',
            link: function($scope) {
                $scope.$watch('mobCheck', function() {
                    if ($scope.mobCheck) {
                        $scope.mobChecks = $scope.mobCheck;
                        //  $scope.errorMsz=$scope.msg;
                        //console.log('sssssss: '+JSON.stringify($scope.errormsz));
                    }
                });

                $scope.bulkDeleteOrd = function() {
                    if ($scope.mobCheck == true) {
                        $scope.deleteMob()
                    } else {
                        $scope.deleteOrder();
                    }


                }
                $scope.reset = function() {
                    if ($scope.mobCheck == true) {
                        $scope.canMob();
                    } else {
                        $scope.resetBulk();
                    }

                }


                // $scope.errorModal = errorModalService.getErrorModal();

                //console.log('messsss: '+JSON.stringify($scope.errorModal));
            }
        };
    }

    bulkModal.$inject = [];

    return bulkModal;

});