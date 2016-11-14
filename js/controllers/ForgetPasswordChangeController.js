
define([], function(app){
    'use strict';

    function ForgetPasswordChangeController($rootScope,requestManager,checkAuthorization,$state){
    	var vm = this;
        
        initRootScope();
        function initRootScope() {
        	//after login set login variable in root scope
        	//$rootScope.login = true;
            
            //checkAuthorization.Authentication();
            //goForgetPassword(); 
            localStorage['path'] = 'forget-password-change';
            vm.submitReqUser = {
                "NewPassword": "",
                "ConfirmPassword":""
             }
        }

        
        vm.forgotPasswordChange = function (req) {
              console.log(req);
              var req = {
                  "UserName": req.userId,
                  "NewPassword": req.emailId   
             }
            requestManager.forgetPassword(req).then(function(result) {
                        console.log('forgetPassword response: ' + JSON.stringify(result));
            });
              
            }
    }

    ForgetPasswordChangeController.$inject=['$rootScope','requestManager','checkAuthorization','$state'];

    return ForgetPasswordChangeController;
});
