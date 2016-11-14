define([], function(app) {
    'use strict';
        function homeController($scope,$rootScope,$location,$timeout,requestManager,FactoryIndexedDBLoad,setHeaderItem,checkAuthorization,checkBrowserDetails) {
        	var vm = this;
            var perrr = [];
            $scope.headerUrl = 'includes/footer1.html';

        	function getInitial(){
                console.log('hiigo');

        		if(localStorage['Cust_id']){
        			vm.custId = localStorage['Cust_id'];
        			vm.custName = localStorage['Cust_Name'];
        		}else{
        			vm.custId ='';
        			vm.custName ='';
        		}
              
                vm.userId = localStorage['user_id'];
                
                if(localStorage['access_token']){
                  $rootScope.login = true;
                localStorage['path'] = '/home';
                setHeaderItem.setItems();
                console.log('hii'+JSON.stringify(vm.per) )
            }
                
        		
        	} 
        	getInitial();
            var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
function success(pos) {
  var crd = pos.coords;

  alert('Current Position:' +'Latitude : ' + crd.latitude + 'Longitude: ' + crd.longitude + 'More or less ' + crd.accuracy + ' meters.');
  GetAddress(crd.latitude,crd.longitude);
};
function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};
function GetAddress(latitude,longitude) {
            var lat = parseFloat(latitude);
            var lng = parseFloat(longitude);
            var latlng = new google.maps.LatLng(lat, lng);
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        alert("Location: " + results[1].formatted_address);
                    }
                }
            });
        }

            vm.getLocation = function (argument) {
            if (navigator.geolocation) {
                console.log(navigator.geolocation);
                navigator.geolocation.getCurrentPosition(success, error, options);
                
              }
            }
            vm.showList = [];
        vm.notShowableList = [];
            vm.permission = function () {
            
                if($rootScope.online == true){
                    var req = {
                     userId: localStorage['user_id'],
                     appId: '23'
                }
                
                 $rootScope.isLoading = true;
                requestManager.permissionRequestPost(req).then(function (result) {
                   
                     $rootScope.isLoading = false;
                       var perList = checkAuthorization.getPermissionMenu(result);
                     for(var i =0 ;i<perList.length;i++){
                      if(perList[i].AccessName == "ezorder" || perList[i].AccessName == "reports" || perList[i].AccessName == "cashmanagement" || perList[i].AccessName == "adminmanagement"){
                         vm.notShowableList.push(perList[i]);
                      }else{
                        vm.showList.push(perList[i]);
                      }
                     }
                   //  console.log("show"+JSON.stringify(showList));
                    vm.per = vm.showList;
                     var lists = vm.notShowableList;
                    vm.otherPer = lists;
                   
                    })  
                }
                
            }
            vm.permission();
            function getPermisssionList(){
                console.log('conn online or offline'+$rootScope.online);
                if($rootScope.online == false){
                     $rootScope.isLoading = true;
            FactoryIndexedDBLoad.getPermissionIndexDb().then(function(result) {
                if(result){
                    $rootScope.isLoading = false;
                    console.log('get PerlistOnline'+JSON.stringify(result));
                         vm.per = {
                            home:result[0].IsAccess,
                            customer:result[7].IsAccess,
                            orderEntry:result[4].IsAccess,
                            orderHistory:result[9].IsAccess,
                            searchItem:result[10].IsAccess
                        }
                    }
                })
            }
        }

   getPermisssionList();
   $scope.$on('userClickingData',function (evt,data,event) {
     checkBrowserDetails.setTrackerDetails(data.target,event)
   })
   
            
        }
 homeController.$inject = ['$scope','$rootScope','$location','$timeout','requestManager','FactoryIndexedDBLoad','setHeaderItem','checkAuthorization','checkBrowserDetails'];

    return homeController;
});