define([], function(app){
    'use strict';

    function datestockpicker($filter){
       return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
                 console.log('hiii')
                $(function() {
         $( ".datepickerStock" ).datepicker({
                
                maxDate:'today',
                onSelect: function() {
                     var date = $(this).datepicker("getDate");
                     var min = new Date(date);
                     var update = $filter('date')(new Date(date),'MM/dd/yyyy');
                     scope.$apply(function() {
                        ngModel.$setViewValue(update);
                    });
                 }
             
            });
        });
        
       
        }
    }
}
    datestockpicker.$inject=['$filter'];

    return datestockpicker;

});
