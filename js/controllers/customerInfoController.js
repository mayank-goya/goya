
define([], function(app) {
    'use strict';
        function customercInfo($scope,$rootScope,$timeout,requestManager,setHeaderItem) {
            var vm = this;
            var perrr = [];
            var obj = {};
            localStorage['path']= '/customer-info';
            function getInitial(){
                alert('tt');
                var dis = angular.element(document.querySelector('.main-header-section'));
                dis.css('display','none');
                if(localStorage['access_token']){  
                 $rootScope.isLoading = false; 
                 setHeaderItem.setItems();
                console.log('hii'+JSON.stringify(vm.per) )
                    }
                    var custInfo = localStorage['cust-details'];
                    $.each(JSON.parse(custInfo),function (key,res) {
                        //console.log(key);
                        obj[key] = res                       
                    })
                    perrr.push(obj);
                    vm.cust_data = perrr[0];
                    vm.brokerName = localStorage['userName'];
                    if(vm.cust_data.Pickup == "true"){
                        vm.custPickData = vm.cust_data;
                        $scope.pickup = 'Pickup';
                    }else{
                         vm.custData = vm.cust_data;
                        // console.log('lll'+JSON.stringify(vm.custData.CustomerID));
                         $scope.pickup = 'Regular';
                    }
                
                
            } 
            getInitial();             
            
        }
 customercInfo.$inject = ['$scope','$rootScope','$timeout','requestManager','$state','setHeaderItem'];

    return customercInfo;
});