
define([], function(app){
    'use strict';

    function OrderController($rootScope,requestManager,$state,checkAuthorization){
    	var vm = this;

        function initRootScope() {
            //after login set login variable in root scope
        	$rootScope.login = true;
            checkAuthorization.Authentication();
            
            //goOrderDetail();
        }
        initRootScope();

        function goBack() {
            localStorage.setItem('path','/order-entry');
        }
        goBack();

        function goOrderDetail(){
            var req = {
                    
            }
            requestManager.OrderList(req).then(function(result) {
                        console.log('OrderList response: ' + JSON.stringify(result));
            });
        }
    }

    OrderController.$inject=['$rootScope', 'requestManager','$state','checkAuthorization'];

    return OrderController;
});
