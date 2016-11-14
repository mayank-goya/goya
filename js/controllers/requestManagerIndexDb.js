define([], function(app) {
    'use strict';
    
    function requestDB() 
    {
         return 
         { 
              requestCustData: function() 
              {
                  console.log('request');
              }
            
         }
    }
     requestDB.$inject = [];
     return requestDB; 
    
});