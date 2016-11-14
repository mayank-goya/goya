
define([], function(app){
    'use strict';

    function headerController($scope,$rootScope,$location, $state,requestManager,FactoryIndexedDBLoad,$window,checkAuthorization,checkBrowserDetails){
        var vm = this;
        var perrr = [];

        function initRootScope() {
            //after login set login variable in root scope
             vm.showList = [];
             vm.showList1 = [];
             vm.reqChangePass = {
              userId:localStorage['user_id'],
              oldPassword:'',
              newPassword:''
             }
             vm.notShowableList = [];
            if(!localStorage['access_token']){
              $rootScope.login = false;
            }
            vm.case = 0;
            vm.username = localStorage['user_id']+"-"+localStorage['userName'];
            vm.userId = localStorage['user_id'];
            if(localStorage['access_token']){
            permission();

            }
            vm.setHeaderCol = true;
            
        }
        initRootScope();
        $scope.$on('setItems',function (evt,res) {
          if(localStorage['path'] == '/order-entry'){
               vm.EOR = res.eor;
               vm.case = res.case;
               vm.setHeaderCol = true;
            }else{
              vm.setHeaderCol = false;
            }
           
        })
        vm.sendTrackData = function () {
        var userTrackData = eval(localStorage['userTrack']);
       // console.log('check'+JSON.stringify(userTrackData));
         /*requestManager.sendUserTackingData(JSON.stringify(userTrackData)).then(function (result) {
            localStorage.removeItem('userTrack');
            })*/
       }
       vm.sendTrackData();
       $scope.$on('userTacking',function (evt) {
         vm.sendTrackData();
       })
   $scope.$on('userClickingData',function (evt,data,event) {
    console.log('nnnn')
     checkBrowserDetails.setTrackerDetails(data.target,event)
   })
         function permission() {
            if($rootScope.online == true){
                var req = {
                     userId: localStorage['user_id'],
                     appId: '23'
                }
                 $rootScope.isLoading = true;

                requestManager.permissionRequestPost(req).then(function (result) {  
                console.log('show res***'+JSON.stringify(result));                    
                     if(!localStorage['access_token']){
                     $rootScope.isLoading = false;
                
            }
           // vm.sendTrackData()
             var perList = checkAuthorization.getPermissionMenu(result);
             for(var i =0 ;i<perList.length;i++){
              if(perList[i].AccessName == "ezorder" || perList[i].AccessName == "reports" || perList[i].AccessName == "cashmanagement" || perList[i].AccessName == "adminmanagement"){
                        vm.notShowableList.push(perList[i]);
                        
                      }else{
                        vm.showList.push(perList[i]);
                      }
             }
            // console.log("show"+JSON.stringify(showList));
                    vm.per = vm.showList;
                    var lists = vm.notShowableList;
                    vm.otherPer = lists; 
                    console.log("show"+JSON.stringify(vm.otherPer));        
                })
             }
            }
            
        function getPermisssionList(){
                if($rootScope.online == false){
                    $rootScope.stopCall = true;
                     $rootScope.isLoading = true;
            FactoryIndexedDBLoad.getPermissionIndexDb().then(function(result) {
                if(result){
                    $rootScope.isLoading = false;
                       var perList1 = checkAuthorization.getPermissionMenu(result);
                     for(var i =0 ;i<perList1.length;i++){
                      if(perList[i].AccessName == "ezorder" || perList[i].AccessName == "reports"){
                         vm.notShowableList.push(perList1[i]);
                      }else{
                        vm.showList1.push(perList1[i]);
                      }
                     }
              
                   //  console.log("show"+JSON.stringify(showList));
                    vm.per = vm.showList1;
                     var lists = vm.notShowableList;
                    vm.otherPer = {
                        reports:lists[1].IsAccess,
                        ezorder:lists[0].IsAccess
                      }
                    }
                })
            }
        }

   getPermisssionList();  
   vm.userClickDetails = [];
   
        $scope.$on('usersend',function  (event,res) {
           initRootScope();
        })
        $scope.$on('permit',function (event,data) {
            vm.per = data;
        })
        vm.passwordConfirm = function (req) {
         console.log(req);
        }
        vm.close = function () {
          vm.reqChangePass = {
              userId:localStorage['user_id'],
              oldPassword:'',
              newPassword:''
             }
             $('#passwordChange').modal('hide');
        }
        vm.logout = function () {
             $rootScope.isLoading=false;
            localStorage.removeItem('access_token');
            localStorage.removeItem('token_type');
            localStorage.removeItem('user_Id');
            localStorage.removeItem('user_id');
            localStorage.removeItem('Cust_id');
            localStorage.removeItem('Cust_Name');
            localStorage.removeItem('userName');
            localStorage.removeItem('menuPer');
              var indexedDB = $window.indexedDB;
                var request =  indexedDB.open("GOYAOMS",4);
                indexedDB =  indexedDB ||  mozIndexedDB || webkitIndexedDB ||  msIndexedDB;
                //prefixes of window.IDB objects
                window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
                window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

                if (!indexedDB) {
                    //console.log("Your browser doesn't support a stable version of IndexedDB.")
                }

                var DBDeleteRequest = indexedDB.deleteDatabase("GOYAOMS");
                DBDeleteRequest.onerror = function(event) {
                  console.log("Error deleting database.");
                };
                 
                DBDeleteRequest.onsuccess = function(event) {
                  console.log("Database deleted successfully");
                    
                };     
            $state.go("login");


            /*requestManager.logOut().then(function(result) {
                    console.log('logOut response: ' + JSON.stringify(result));
                    //$rootScope.login = true;
                    //$location.url('/order-entry');
                    //$state.go("login");
            });*/
        }
        vm.getOrderDataFromIndexDB = function(){
          if($rootScope.online == true){
            var con = confirm('Are you sure want to Syncronize these Orders?');
          console.log(con)
          if(con==true){
            FactoryIndexedDBLoad.getOrderData().then(function (result) {
            var indexdbOrderData = result[0];
                vm.dbOrderData=result;
            console.log('orderData****'+JSON.stringify(vm.dbOrderData));
              if(indexdbOrderData!=undefined){
                indexDBAddItemOrder(vm.dbOrderData);
              }
              
                });  
            }  
          }      
        }
       
        

        function indexDBAddItemOrder(data){
          var reqObject=data;
          console.log('Order Data****'+JSON.stringify(reqObject));
            $rootScope.isLoading = true;
            for(var i=0;i<data.length;i++){
               requestManager.AddItemToOrder(reqObject[i]).then(function(result) 
               { 
                     if(i == data.length){
                        location.reload();
                        $rootScope.isLoading = false;
                     }                         
                 }); 
            }
            
         
        }

         
    }

    headerController.$inject=['$scope','$rootScope','$location', '$state','requestManager','FactoryIndexedDBLoad','$window','checkAuthorization','checkBrowserDetails'];

    return headerController;
});
