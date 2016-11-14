define([], function(app) {
    'use strict';

    function pickfilter($filter) {
        return function(input) {
        	if(input){
        		var newDate = new Date(input);
                return $filter('date')(newDate,'dd,MM yyyy')
        	}
           
            /**/
        };
    }
    pickfilter.$inject = ['$filter'];
    return pickfilter;
});