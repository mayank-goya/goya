define([], function(app){
    'use strict';

    function errorModal(errorModalService){
       return {
        restrict: 'E',
        replace: true,
        scope: {
            'deleteOrder':'&'
        },
        templateUrl: 'html/templates/errorModal.html',
        link: function ($scope) {
            $scope.$watch('errormsz', function(){
               //  $scope.errorMsz=$scope.msg;
                 //console.log('sssssss: '+JSON.stringify($scope.errormsz));
            });
           
               $scope.deleteOrd = function (){
                
                  $scope.deleteOrder();  
              
                
              }
        
            
           // $scope.errorModal = errorModalService.getErrorModal();

            //console.log('messsss: '+JSON.stringify($scope.errorModal));
        }
    };
    }

    errorModal.$inject=['errorModalService'];

    return errorModal;

});



