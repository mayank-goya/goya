define([], function(app){
    'use strict';

    function datetomobmpicker($filter){
       return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs,ngModel) {
                 console.log('hiii')
                $(function() {
         $( ".datepicker3" ).datepicker({
                showOn: "button",
                buttonImage: "./images/calendar-icon.jpg",
                buttonImageOnly: true,
                minDate:-7,
                maxDate:'today',
                onSelect: function() {
                var date = $(this).datepicker("getDate");
                var max = new Date(date);
                var update = $filter('date')(new Date(date),'MM/dd/yyyy');
                $('.datepicker4').datepicker('option', 'maxDate', max);
                scope.$apply(function() {
                        ngModel.$setViewValue(update);
                    });
                 }
            });
        });
        
       
        }
    }
}
    datetomobmpicker.$inject=['$filter'];

    return datetomobmpicker;

});
