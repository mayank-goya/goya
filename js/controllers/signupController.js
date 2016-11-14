define([], function(app) {
    'use strict';

    function signupCtrl($rootScope,requestManager) {

        var vm = this;
        initRootScope();

        function initRootScope() {
            $rootScope.login = false;
        }

        function goBack() {
            localStorage.setItem('path','/signup');
        }
        goBack();
       
        vm.user     = {usertype:    [{id: 1,Name: 'Admin'}, {id: 2,Name: 'User'}, {id: 3,Name: 'Customer'}]}
        vm.city     = {jerseyCity:  [{id: 1,Name: 'ABC'},   {id: 2,Name: 'XYZ'}, {id: 3,Name: 'PQR'}]}
        vm.state    = {unitedState: [{id: 1,Name: 'ABC'},   {id: 2,Name: 'XYZ'}, {id: 3,Name: 'PQR'}]}
        vm.select   = {picklist:    [{id: 1,Name: 'ABC'},   {id: 2,Name: 'XYZ'}, {id: 3,Name: 'PQR'}]}

        vm.submitRequest = {
            selectUsertype: vm.user.usertype[0].Name,
            selectJerseycity: vm.city.jerseyCity[0].Name,
            username: '',
            password: '',
            confirmpass: '',
            name: '',
            street: '',
            city: '',
            state: '',
            selectUnitedstate: vm.state.unitedState[0].Name,
            email: '',
            imei: '',
            organization: '',
            contactperson: '',
            contactpersonemail: '',
            selectPicklist: vm.select.picklist[0].Name,
            order: false,
            attachorder: false
        }
        vm.singupFunction = function(req) {

            requestManager.signupRequest(req).then(function(result) {
                console.log('signup response: ' + result);
            });
        }
    }

    signupCtrl.$inject = ['$rootScope','requestManager'];

    return signupCtrl;
});