define([], function(app) {
    'use strict';

    function factoryFunction($q, $http) {
        var endPointUrl = 'http://166.62.119.178/';
        return {
            sendRequest: function(request,method) {
                //console.log('show Request: '+JSON.stringify(request));
                var requestMethod = method;
                var UserId   = request.payload.UserId;
                var BrokerId = request.payload.BrokerId;
                //console.log('user id : '+UserId);
                var API  = endPointUrl + request.requestApi;
                

                request.clientData = {
                    apiVersion: "0.0.1",
                    webAppVersion: "1.0.0",
                    timezoneOffset: (new Date()).getTimezoneOffset()
                };
                console.log('Request Method : ' + JSON.stringify(request));
                console.log('Request Api : ' + API);
                


                var deferred = $q.defer();
                switch (requestMethod) {

                    case "POST":
                        console.log('POST Api Here.....');
                        var data = $.param(request.payload);
                        /*var configPost = {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                            }
                        }*/
                        $http({
                            method:"POST",
                            url:API,
                            data:data,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                            }
                        }).success(function(data, status, headers, config) {
                                if (data) {
                                    //console.log('data');
                                    return deferred.resolve(data);
                                } else {
                                    console.log('errr errr: ');
                                    deferred.reject('message');
                                }

                            })
                            .error(function(data, status, header, config) {
                                console.log('failedd..');
                        });
                        break;

                    case "GET":
                        console.log('GET Api Here.....');
                        /*var configGet = {
                            headers: {
                                'Authorization': request.payload.token_type + ' ' + request.payload.access_token
                            }
                        } */
                        var access_token = localStorage.getItem('access_token');
                        var token_type   = localStorage.getItem('token_type');
                        //console.log(access_token);
                        //console.log(token_type);
                        /*var config = {
                            headers: {
                                'Authorization': token_type + ' ' + access_token
                            }
                        }*/
                        var data = {};

                        $http({
                            method:"GET",
                            url:API,
                            data:data,
                            headers: {
                                'Authorization': token_type + ' ' + access_token
                            }
                        }).success(function(data, status, headers, config) {
                                if (data) {
                                    //console.log('data');
                                    return deferred.resolve(data);
                                } else {
                                    console.log('errr errr: ');
                                    deferred.reject('message');
                                }

                        })
                        .error(function(data, status, header, config) {
                                console.log('failedd..');
                        });

                        break;

                    case "PUT":
                        console.log('PUT Api Here.....');

                        break;

                    case "DELETE":
                        console.log('DELETE Api Here.....');

                        break;

                }

                return deferred.promise;
            }
        }
    }

    factoryFunction.$inject = ['$q', '$http'];

    return factoryFunction;
});