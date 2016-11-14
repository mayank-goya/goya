define([], function(app) {
    'use strict';

    function setHeaderItem($q, $http,$state,$rootScope) {
    	return {
    		setItems: function (request) {
    			$rootScope.$broadcast('setItems',request);
    		}
            
    	  }
    	}

    setHeaderItem.$inject = ['$q', '$http','$state','$rootScope'];

    return setHeaderItem;
});