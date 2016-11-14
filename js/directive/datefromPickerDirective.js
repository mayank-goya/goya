define([], function(app){
    'use strict';

    function datefrompicker($filter){
       return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
                 console.log('hiii')
                $(function() {
         $( ".datepicker1" ).datepicker({
                maxDate:'today',
                onSelect: function() {
                     var date = $(this).datepicker("getDate");
                     var min = new Date(date);
                     var update = $filter('date')(new Date(date),'MM/dd/yyyy')
                     $('.datepicker').datepicker('option', 'minDate', min);
                     scope.$apply(function() {
                        ngModel.$setViewValue(update);
                    });
                 }
             
            });
        });
        
       
        }
    }
}
    datefrompicker.$inject=['$filter'];

    return datefrompicker;

});
