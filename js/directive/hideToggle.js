

define([], function(app){
    'use strict';

    function hideToggle(){
        return {
            restrict: 'A',
            replace: true,
            link: function(scope, element, attrs) {     
                 $(document).ready(function() {
                    if ($(".wrapper").hasClass("toggled")) {
                        //console.log('ddddddddd');
                        $('.wrapper').toggleClass('toggled');
                    } else {
                        //console.log('ffffff');
                    }
                 });
            }
        }
    }

    hideToggle.$inject=[];

    return hideToggle;

});
