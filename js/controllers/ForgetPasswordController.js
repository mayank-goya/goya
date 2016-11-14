
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
            localStorage['path'] = 'forget-password';
            vm.submitReqUser = {
                "userId": "",
                "emailId": ""
             }
        }

        function goForgetPassword(){
        	
        }
        vm.forgotPassword = function (req) {
              console.log(req);
              var req = {
                  "UserName": req.userId,
                  "Email": req.emailId   
             }
            requestManager.forgetPassword(req).then(function(result) {
                        console.log('forgetPassword response: ' + JSON.stringify(result));
            });
              
            }
    }

    ForgetPasswordController.$inject=['$rootScope','requestManager','checkAuthorization','$state'];

    return ForgetPasswordController;
});
