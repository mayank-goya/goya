

define([], function(app){
    'use strict';

    function iosDblclick(){
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
               var DblClickInterval = 300; //milliseconds
                var waitingSecondClick = false;
                element.bind('click', function (e) {
                    console.log('hello ')
                    if (!waitingSecondClick) {
                        waitingSecondClick = true;

                        setTimeout(function () {
                            waitingSecondClick = false;
                        }, DblClickInterval);
                    }
                    else {
                           waitingSecondClick = false;                      
                           scope.$apply(attrs.iosDblclick);
                          }
                });
            }
        };
    }

    iosDblclick.$inject=[];

    return iosDblclick;

});



