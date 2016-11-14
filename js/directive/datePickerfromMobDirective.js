define([], function(app){
    'use strict';

    function datefrommobpicker($filter){
       return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs,ngModel) {
                 console.log('hiii')
                $(function() {
         
         $( ".datepicker4" ).datepicker({
                showOn: "button",
                buttonImage: "./images/calendar-icon.jpg",
                buttonImageOnly: true,
                maxDate:'today',
                onSelect: function() {
                      var date = $(this).datepicker("getDate");
                     var min = new Date(date);
                     var update = $filter('date')(new Date(date),'MM/dd/yyyy')
                     $('.datepicker3').datepicker('option', 'minDate', min);
                      scope.$apply(function() {
                        ngModel.$setViewValue(update);
                    });
                 }
             
            });
        });
        
       
        }
    }
}
    datefrommobpicker.$inject=['$filter'];

    return datefrommobpicker;

});
