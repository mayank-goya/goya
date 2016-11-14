define([], function(app) {
    'use strict';

    function factoryFunction($q,$http,$rootScope) {
        var endPointUrl = 'https://portal.goya.com/'; 
        var GoyaEndPointUrl ='https://portal.goya.com/ws/goyaoms/customer/'
         
        return {
            sendRequest: function(request, method) {

                // $rootScope.isLoading = true;  
                     
                //console.log('show Request: '+JSON.stringify(request));
                var requestMethod = method;
                var API           = endPointUrl + request.requestApi;
                var access_token  = localStorage.getItem('access_token');
                var token_type    = localStorage.getItem('token_type');
                var data          = JSON.stringify(request.payload);
                var user_Id       = localStorage.getItem('user_id');
                var header;

                request.clientData = {
                    apiVersion: "0.0.1",
                    webAppVersion: "1.0.0",
                    timezoneOffset: (new Date()).getTimezoneOffset()
                };
               //console.log('Request : ' + JSON.stringify(request));
                //console.log('Request Api : ' + API);
               // console.log('Request Method : ' + method);
               // console.log('Data : ' + data);
               // console.log('user_Id : ' + user_Id);
               
                if (access_token == null) {
                    header = {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                        //'userId':     user_Id  
                    }
                } else {
                    header = {
                        'Authorization': token_type + ' ' + access_token
                        //'userId':     user_Id  
                    }
                }
               // console.log('header: ' + JSON.stringify(header));
                if(request.requestApi == 'OMSWebApiUAT/api/user' || request.requestApi == "OMSWebApiUAT/api/Account/ChangePassword"){
                    var reqObj = {
                        url: API,
                        method: requestMethod,
                        data: data,
                        header : header,
                    }
                    console.log('show req'+JSON.stringify(reqObj));
                }
                else if(request.domain=='GoyaAPI') // Check for APIs from GOYA
                {

                   var reqObj = {
                        url: GoyaEndPointUrl+ request.requestApi,
                        method: requestMethod,
                        data: data,
                        headers : header,
                    } 
                }
                
                else{
                   var reqObj = {
                        url: API,
                        method: requestMethod,
                        data: data,
                        headers : header,
                    } 
                    //console.log('show reqqqqq'+JSON.stringify(reqObj));
                }
                var deferred = $q.defer();
                if($rootScope.online == true){
                   $http(reqObj).success(function(data, status, headers, config) {
                            console.log('success');
                            // $rootScope.isLoading = false;
                            return deferred.resolve(data);            
                    })
                    .error(function(data, status, header, config) {
                       console.log('failedd..');
                        deferred.reject('message');
                    });
                return deferred.promise; 
                }
                
            }
        }
    }

    factoryFunction.$inject = ['$q', '$http','$rootScope'];

    return factoryFunction;
});