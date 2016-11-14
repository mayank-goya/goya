define([], function(app) {
    'use strict';

    function salesfilter($filter,$parse) {
        return function(input,check) {
            if (input) {
                 if(check == 'StartDate'){
                    return $filter('date')(new Date(input),'MM/dd/yyyy');
                 }
                 if(check == 'EndDate'){
                    return $filter('date')(new Date(input),'MM/dd/yyyy');
                 }
                 if(check == 'Status'){
                    if(input == 'True'){
                        return 'Active'
                    } else{
                        return 'InActive'
                    }
                 }
                 if(check == 'File'){
                    
                    return input;
                 }
                 
                
               
            }


        };
    }
    salesfilter.$inject = ['$filter','$parse'];
    return salesfilter;
});