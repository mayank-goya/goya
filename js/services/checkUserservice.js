define([], function(app) {
    'use strict';

    function setUser($rootScope) {
    	return {
    		checkUser: function (username) {
                $rootScope.$broadcast('usersend',username);
    		}
    	  }
    	}

    setUser.$inject = ['$rootScope'];

    return setUser;
});