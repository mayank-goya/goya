define([], function(app) {
    'use strict';

    function loginController($rootScope,requestManager, $state,setUser,checkAuthorization,FactoryIndexedDBLoad,setHeaderItem) {
        var vm = this;
          vm.checkMsz=true;
        function initRootScope() {
          if(!localStorage['access_token']){
             $rootScope.login = false;
          }
           
            vm.authMsg = false;

        }
        function checkUserAuth(){
            if(localStorage['access_token']){
              
                $state.go('home');
            }
            setHeaderItem.setItems();
        }
        checkUserAuth();
        initRootScope();

        function goBack() {
            localStorage.setItem('path','/login');
        }
        goBack();
        
        
        vm.submitRequest = {
            grant_type: 'password',
            userId: '',
            password: ''
        }
     //$rootScope.isLoading = true;
        vm.checkLogin = function(req) {

           /* var auth = {
                user_id:req.userId
            }*/
            //console.log(JSON.stringify(req))
            localStorage.setItem('user_id',req.userId);
            $rootScope.isLoading = true;  
            requestManager.loginRequest(req).then(function(result) {
                //console.log('ress'+JSON.stringify(result));
                $rootScope.isLoading = false;  
               if(result.Payload[0].Authorization == 'Success'){
                 vm.permission();
                    vm.text = result.Payload[0].token_type;
               $rootScope.isLoading = false;
                vm.userName = result.Payload[0].userName;
               // console.log(vm.text);
                vm.Token_Type = vm.text.substring(0, 1).toUpperCase() + vm.text.substring(1);
                localStorage.setItem("access_token", result.Payload[0].access_token);
                localStorage.setItem("token_type", vm.Token_Type);
                localStorage.setItem("userName",vm.userName);

                vm.authMsg = false;
                vm.getEORnumber();
                setUser.checkUser(vm.userName);
                vm.customerIndexDbData();
              /*  auth['access_token'] = result.Payload[0].access_token;
                auth['token_type'] = vm.Token_Type;
                localStorage.setItem('auth',JSON.stringify(auth));*/
                //localStorage.setItem("user_id", '013030');

                vm.getProfile();
               }else{
                vm.authMsg = true;
               }
                
            });
            
            vm.customerIndexDbData = function () {
                $rootScope.isLoading = true; 

                  var req = {
                BrokerId: localStorage['user_id']
            }

                requestManager.customerDetailPost(req).then(function(result) {
                    $rootScope.isLoading = false;
                    vm.custDet = result;
                    vm.searchItemData();
                })
            }
            vm.searchItemData = function () {
                var req = {
                CustomerId: '816625'
            }
            $rootScope.isLoading = true;
                requestManager.ItemList(req).then(function(result) {
                     $rootScope.isLoading = false;
                     vm.searchItemData = result;
                     vm.getDepartmentDetails();
                     
                })
            }
            vm.getDepartmentDetails = function() 
           {
          $rootScope.isLoading = true;
            requestManager.GetDepartmentsPost().then(function(result) {
                $rootScope.isLoading = false;  
                if (result.Payload) {
                    vm.Departments = result;  
                    //console.log('customerDetail Payload: ' + JSON.stringify(vm.Departments));
                     setDataIndex(vm.custDet,vm.searchItemData,vm.check_per,vm.Departments);                 
                     addOrder();

                }
            });
        }
            function addOrder() {
            FactoryIndexedDBLoad.addOrderIndexdb();

            }
            function setDataIndex(custData,searchData,per,dept){
               console.log('enterrr');
                //debugger;
                 var permissionJSON = {"Domain":"GetToken","Event":"GetToken","ClientData":"test2","Status":"True","Payload":[{"AccessId":"6","AccessName":"Home","Description":"Home Page","AccessType":"Common","AccessControl":"Menu","IsAccess":"True"},{"AccessId":"7","AccessName":"About Us","Description":"About Us Page","AccessType":"Common","AccessControl":"Menu","IsAccess":"True"},{"AccessId":"8","AccessName":"Contact Us","Description":"Contact Us Page","AccessType":"Common","AccessControl":"Menu","IsAccess":"True"},{"AccessId":"9","AccessName":"Login","Description":"Login page  Authentication","AccessType":"Common","AccessControl":"Menu","IsAccess":"True"},{"AccessId":"10","AccessName":"Sign Up","Description":"Sign up page  new user","AccessType":"Common","AccessControl":"Menu","IsAccess":"True"},{"AccessId":"11","AccessName":"Login","Description":"Login Button","AccessType":"Common","AccessControl":"Button","IsAccess":"True"},{"AccessId":"12","AccessName":"Forgot Password?","Description":"Forgot Password link","AccessType":"Common","AccessControl":"Link","IsAccess":"True"},{"AccessId":"13","AccessName":"Customers","Description":"Customer Page","AccessType":"Required_Access","AccessControl":"Menu","IsAccess":"True"},{"AccessId":"14","AccessName":"Create Order","Description":"Quick Order Entry Page","AccessType":"Required_Access","AccessControl":"Menu","IsAccess":"True"},{"AccessId":"15","AccessName":"Order History","Description":"Order History Page","AccessType":"Required_Access","AccessControl":"Menu","IsAccess":"True"},{"AccessId":"16","AccessName":"Search Items","Description":"Search Items Page","AccessType":"Required_Access","AccessControl":"Menu","IsAccess":"True"},{"AccessId":"17","AccessName":"Logout","Description":"Logout Link","AccessType":"Common","AccessControl":"Link","IsAccess":"True"},{"AccessId":"21","AccessName":"Test Button","Description":"Test Button","AccessType":"Required_Access","AccessControl":"Button","IsAccess":"False"},{"AccessId":"45","AccessName":"Sales Communicator","Description":"Sales Communicator","AccessType":"Required_Access","AccessControl":"Menu","IsAccess":"True"}]}
                 //FactoryIndexedDBLoad.createIndexDB(custData.Payload,searchData.Payload,per.Payload,dept.Payload);
                 FactoryIndexedDBLoad.createIndexDB(custData.Payload,searchData.Payload,permissionJSON.Payload,dept.Payload);
            }
            vm.permission = function () {

                var req = {
                     userId: localStorage['user_id'],
                     appId: '23'
                }
                //console.log('show ')
                requestManager.permissionRequestPost(req).then(function (result) {
                    console.log('show res***'+JSON.stringify(result));
                  //  debugger;
                    if(result){
                      vm.permit = {
                        home:'True',//result.Payload[0].IsAccess,
                        customer:'True',//result.Payload[7].IsAccess,
                        orderEntry:'True',//result.Payload[8].IsAccess,
                        orderHistory:'True',//result.Payload[9].IsAccess,
                        searchItem:'True',//result.Payload[10].IsAccess
                         }
                         vm.check_per = result;
                       
                        checkAuthorization.permissionAdmin(vm.permit);  
                    }
                    
                    //console.log('show res'+JSON.stringify(vm.permit));
                })
            }
               vm.getEORnumber = function () {
                var req = {
                     BrokerId: localStorage['user_id'],
                     pageTitle: 'ORDERNO',
                     CompanyId: 2
                }
                //console.log('showReqObj* '+JSON.stringify(req));
                requestManager.getEOR(req).then(function (result) {
                    console.log('show res*'+JSON.stringify(result));
                    if(result){
                        var lasteor=parseInt(result.Payload[0].LastEOR);
                      localStorage.setItem('EORKEY',lasteor);
                    }
                })
            }
            

        vm.getProfile = function() {
                $rootScope.login = true;
                //$location.url('/order-entry');
                $state.go("home");
        }


        }
    }

    loginController.$inject = ['$rootScope', 'requestManager', '$state','setUser','checkAuthorization','FactoryIndexedDBLoad','setHeaderItem'];

    return loginController;
});