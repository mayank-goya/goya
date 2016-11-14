define([], function(app){
    'use strict';

function userclick($rootScope){
	return{
		restrict:'A',
		link: function($scope,element,attribute){	
		console.log('inside me')		
			element.on('click',function ($event) {
				var userData = $event;
				var userEventDetails = 'click';			 		
			 	if($($event.target).is("input") || $($event.target).is("a") || $($event.target).is("li") || $($event.target).is("button")){
			 		console.log($event);
			 		//$rootScope.$broadcast('userClickingData',userData,userEventDetails);
			 	}			
							
			})
			element.on('change',function ($event) {
				var userData = $event;
				var userEventDetails = 'select';			 		
			 	if($($event.target).is("select")){
			 		console.log('select');
			 		console.log($event);
			 		//$rootScope.$broadcast('userClickingData',userData,userEventDetails);
			 	}			
							
			})
		}
	}
}
userclick.$inject = ['$rootScope'];
return userclick;
});