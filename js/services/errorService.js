

define([], function(app) {
    'use strict';

    function errorService(errorModalService) {
        return {
            validateUserResponse: function (request) {
            //console.log('errorService: '+response);
            var msg = request;
            console.log("msg: "+msg);
           //var msg = response[0]._id;
//            msg = msg.split(/(?=[A-Z])/).join(" ");
//            msg = msg.toLowerCase();
//            msg = msg[0].toUpperCase() + msg.substring(1) + '!';
            //var msg=response.status.displayMessage;

            if (request == "") {
                return true;
            }
            else {
                if(request==msg){
                    //console.log('gggggg');
                    errorModalService.setErrorModal('Oops!', msg);
                    $('.errorModal').modal('show');
                }
                else{
                errorModalService.setErrorModal('Oopssssss!', msg);
                $('.errorModal').modal('show');
                return false;
                }
            }

               
            }
          }
        }

    errorService.$inject = ['errorModalService'];

    return errorService;
});