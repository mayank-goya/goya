define([], function(app){
    'use strict';

function positionClick($rootScope){
	return{
		restrict:'A',
		link: function($scope,element,attribute){			
			element.bind('click',function ($event) {				
				$scope.$apply(function () {
					var elem = angular.element($event.target).closest('.submitted').length;
					var el = angular.element($event.target).closest('.submitted_2').length;
					var ele = angular.element($event.target).closest('.sale-prnt').length;
					if(elem == 0 && el ==0 && ele == 0){
						$rootScope.$broadcast('resetSetting');
						console.log(elem);
					}
				
				})
				
			})
		}
	}
}
positionClick.$inject = ['$rootScope'];
return positionClick;
});