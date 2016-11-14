define([], function(app){
    'use strict';

    function datetopicker($filter){
       return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
                 console.log('hiii')
                $(function() {
         $( ".datepicker" ).datepicker({
                minDate:-7,
                maxDate:'today',
                onSelect: function() {
                var date = $(this).datepicker("getDate");
                var max = new Date(date);
                console.log(max);
                var update = $filter('date')(new Date(date),'MM/dd/yyyy');
                $('.datepicker1').datepicker('option', 'maxDate', max);
                scope.$apply(function() {
                        ngModel.$setViewValue(update);
                    });
                 }
            });
        });
        
       
        }
    }
}
    datetopicker.$inject=['$filter'];

    return datetopicker;

});
