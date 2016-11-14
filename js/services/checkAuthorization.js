define([], function(app) {
    'use strict';

    function checkAuthorization($q, $http,$state,$rootScope) {
    	return {
    		Authentication: function (request) {
    			if(localStorage.getItem('access_token') == null && localStorage.getItem('user_id') == null){
	        		$state.go("login");
	            }else{  
	                //goOrderDetail();	
	            }
    		},
            permissionAdmin: function (data) {
                $rootScope.$broadcast('permit',data)
            },
            showInfo: function (data) {
                $rootScope.$broadcast('info',data)
            },
            getPermissionMenu: function(list){
                var list =  _.filter(list.Payload,function (item) {
                    return item.AccessControl == "Menu" && item.IsAccess == "True" && item.AccessType == "Required_Access"
                })
                
               /* var SortList = _.sortBy(list,'AccessId');*/
                return list;   
            }
            
    	  }
    	}

    checkAuthorization.$inject = ['$q', '$http','$state','$rootScope'];

    return checkAuthorization;
});