define([], function(app){
    'use strict';

    function datepicker(){
       return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
                 console.log('hiii')
                $(function() {
         $( ".datepicker" ).datepicker({
                showOn: "button",
                buttonImage: "/images/calendar-icon.jpg",
                buttonImageOnly: true
            });
         $( ".datepicker1" ).datepicker({
                showOn: "button",
                buttonImage: "/images/calendar-icon.jpg",
                buttonImageOnly: true
             
            });
        });
        
       
        }
    }
}
    datepicker.$inject=[];

    return datepicker;

});
