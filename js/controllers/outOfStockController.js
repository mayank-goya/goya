
define([], function(app){
    'use strict';

    function outOfStockController($scope,$rootScope,requestManager,$state,$filter,checkBrowserDetails){
    	var vm = this;
        vm.invalDate = false;
        vm.outOfStock = {
            showToDate:$filter('date')(lastMonthDate(), 'MM/dd/yyyy'),
            showFromDate:$filter('date')(new Date(), 'MM/dd/yyyy')
        }
        function goBack() {
           
            if(localStorage['access_token']){
              localStorage.setItem('path','/outOfStock');
              $rootScope.login = true;
            }else{
                $state.go('login');
            }
        }
        goBack();
        vm.getOutOfStockItemList = function(){
            var req = {
               CompanyId:2,
               FromDate: vm.outOfStock.showToDate,
               ToDate: vm.outOfStock.showFromDate    
            }
            console.log(req);
            $rootScope.isLoading = true;
            requestManager.getOutOfStockItemList(req).then(function(result){
                console.log(JSON.stringify(result));
                vm.noStockData = result.Payload;
                $rootScope.isLoading = false;

            })
           
        }
        vm.getOutOfStockItemList();
        function lastMonthDate(){
          var x = new Date();
          x.setDate(x.getDate());
          x.setMonth(x.getMonth()-1);
          return x;
         }
         vm.checkDate = function () {
            var fromDate = new Date(vm.outOfStock.showToDate).getTime();
            var toDate = new Date(vm.outOfStock.showFromDate).getTime();
             console.log(fromDate);
            console.log(toDate);
            if(fromDate>toDate){
                vm.invalDate = true;
            }else{
                 vm.invalDate = false;
                 vm.getOutOfStockItemList();
            }
         }
    }


    outOfStockController.$inject=['$scope','$rootScope', 'requestManager','$state','$filter','checkBrowserDetails'];

    return outOfStockController;
});
