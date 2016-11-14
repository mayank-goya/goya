

define([], function(app){
    'use strict';

    function cartModal(){
       return {
        restrict: 'E',
        replace: true,
        scope: {
          'inc':'&',
          'dec':'&',
          'count':'=',
          'cart':'=?',
          'resetting':'&',
          'confirmcart':'&' 
        },
        templateUrl: 'html/templates/cartModal.html',
        link: function ($scope,element) {
          $scope.quantity = 1;
           var plus = angular.element(document.querySelector("#plus"));
           var minus = angular.element(document.querySelector("#minus"));
           plus.bind('click',function  (event) {
             $scope.$apply(function  () {
              console.log('hii')
                $scope.inc();
             });

           });
           minus.bind('click',function  (event) {
            $scope.$apply(function  () {
              console.log('hii000')
                $scope.dec();
             });
             
           });
           $scope.$watch('count',function  () {
             $scope.quantity = $scope.count;
           })
           $scope.$watch('cart',function  () {
            if($scope.cart){
              //var img = $scope.cart[0].TImageFileName.replace('./','');
            //$scope.PImage = 'http://166.62.119.178/'+img;
            //console.log('show data'+JSON.stringify($scope.cart));
            }
            
           })
           $scope.addToCart = function  () {
             $scope.confirmcart();
           }
           
               
            
           // $scope.errorModal = errorModalService.getErrorModal();

            //console.log('messsss: '+JSON.stringify($scope.errorModal));
        }
    };
    }

    cartModal.$inject=[];

    return cartModal;

});



