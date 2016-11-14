define([], function(app) {
    'use strict';

    function pagination() {
        return function(input, start) {
            var start = parseInt(start, 10);
            if (input) {
                console.log(start)
                //console.log('alerttt'+JSON.stringify(input));
                return input.slice(start);
            }

        };
    }
    pagination.$inject = [];
    return pagination;
});