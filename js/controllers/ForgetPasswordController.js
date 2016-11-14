
define([], function(app){
    'use strict';

    function ForgetPasswordController($rootScope,requestManager,checkAuthorization,$state){
    	var vm = this;
        
        initRootScope();
        function initRootScope() {
        	//after login set login variable in root scope
        	//$rootScope.login = true;
            
            //checkAuthorization.Authentication();
            //goForgetPassword(); 
            vm.submitReqUser = {
                "userId": "",
                "emailId": ""
             }
        }

        function goForgetPassword(){
        	var req = {
	        		
	        }
        	requestManager.forgetPassword(req).then(function(result) {
                        console.log('forgetPassword response: ' + JSON.stringify(result));
            });
        }
        vm.forgotPassword = function (req) {
              console.log(req);
              
            }
    }

    ForgetPasswordController.$inject=['$rootScope','requestManager','checkAuthorization','$state'];

    return ForgetPasswordController;
});
