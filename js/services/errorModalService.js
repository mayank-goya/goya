
define([], function(app) {
    'use strict';

    function errorModalService() {
        return {
            errorModal: {title: "Oops!", info: "Something went wrong."},
              /*getErrorModal:function(title,error) {
                  var msg = {title:title,error:error}
                  return msg;
              }*/

            setErrorModal: function (title, error) {
                //console.log('ddddd: '+title);
                //console.log('eeeee: '+error);
                this.errorModal.title = title;
                this.errorModal.error = error;
            },
            getErrorModal: function () {
                return this.errorModal;
            }
        }
    }

    errorModalService.$inject = [];

    return errorModalService;
});