define([], function(app) {
    'use strict';
    function cashManagementController() {
    	function init(){
    		if(localStorage['access_token']){
    			localStorage['path'] = '/cash-management';
    		}
    	}
    	init();
    }
 cashManagementController.$inject = ['$scope','$rootScope','$timeout','requestManager','FactoryIndexedDBLoad'];

    return cashManagementController;

});

