define([], function(app) {
    'use strict';

    function SearchOrderController($scope,$rootScope, requestManager, checkAuthorization, $state, $filter, errorModalService,$window,$location,setHeaderItem,checkBrowserDetails) 
    {
         $rootScope.headerUrl = 'includes/footer1.html';
        var vm = this;
        vm.constumerDetails = '';
        vm.itemsPerPage = 10;
        vm.currentPage = 0;
        vm.custData = [];
        vm.stat = 0;
        vm.custId = 0;
        vm.setNumber = '';
        vm.deleteItem = [];
        vm.delOnew = [];
        vm.fromDate = fromDate();
        vm.toDate = toDate();
        vm.bulkDel = false;
        vm.setClass = 0;
        vm.mob = false;
        var output;
        var callback;
        vm.setValid = true;
        vm.DelSUcc = false;
        vm.setFromValid = true;
        vm.delteMob = [];
        vm.checkSelection = false;
        vm.OrderPreview='';
        vm.BrokerManager=false;
        vm.AdminBrokerList='';
        vm.SelectedBrokerValue='';

        vm.custSelected = {
            "Name": "All",
            "id": ""
        }
        vm.dropPick = [{
            Name: 'All',
            Val: 'All'
        }, {
            Name: 'Regular',
            Val: 'false'
        }, {
            Name: 'Pickup',
            Val: 'true'
        }];
        //vm.Selected = {"StatusNo":"1","OrderStatusName":"Open"};
        vm.dropSelected = vm.dropPick[0];
        
        function initRootScope() {
            //after login set login variable in root scope
            if(localStorage['access_token']){
              $rootScope.login = true;
            }
            checkAuthorization.Authentication();
            
            // Load Pending Order redirected from Create Order Screen
            var pendingOrderListing = $location.search();
            
            // Check last two Digit(01) for the Broker Manager 
           
            var BrokerData = localStorage['user_id'];
            var last2 = BrokerData.slice(-2);
            if(last2=='01')
            {
                vm.BrokerManager = true;
                getBrokerListByAdmingBrokerID(); // Get Admin Broker List
            }
            
           if(pendingOrderListing.custID !='' && pendingOrderListing.isPending )
           {

            
             vm.custId = pendingOrderListing.custID;
            
             vm.stat = '1';
             vm.Selected = '1';
             //vm.customerData
             var name = '';
              /* for(var i=0;i<vm.customerData.length;i++)
                {
                   if(vm.customerData[i].UserID == localStorage['Cust_id'])
                   {
                      name = vm.customerData[i].Name;
                      break;
                   }
                } */
             vm.custSelected = pendingOrderListing.custID +'-'+ localStorage['Cust_Name'] ;            
             loadPendingOrder('m');
           }      
           else
           {
               goSearchOrder();
           }     
        }

        initRootScope();

        // Get Brokers List by Admin Broker ID
        function getBrokerListByAdmingBrokerID()
        {
             var req = 
             {
                BrokerId: localStorage['user_id'],                
             }

             requestManager.getBrokerListByAdmingBroker(req).then(function(result) 
             {
                vm.AdminBrokerList1 = result.Payload;
                
            });
        }

        // Load Pending Order redirected from Create Order Screen
        function loadPendingOrder(check)
        { 

              // Set Last 60 Days Date on filters
              setLast60DaysDate();

     
              var req = {
                BrokerId: localStorage['user_id'],
                CustomerId: vm.custId,
                OrderNumber: vm.setNumber,
                Status: '1',//vm.stat,
                FromDate: $filter('date')(new Date(vm.fromDate), 'MM/dd/yyyy'),
                ToDate: $filter('date')(new Date(vm.toDate), 'MM/dd/yyyy'),
                CompanyId: 2
            }
            $rootScope.isLoading = true;
            requestManager.searchOrder(req).then(function(result) {
                $rootScope.isLoading = false;
                vm.orderHistoryData = result.Payload;
                vm.Data = angular.copy(vm.orderHistoryData);
                console.log('sel drop' + JSON.stringify(vm.dropSelected));
                vm.itemsPerPage = 10;
                vm.currentPage = 0;
                // console.log('show values'+JSON.stringify(vm.orderHistoryData));

                if (check == 'm') {
                    vm.pickDropMob(vm.dropSelected);
                } else {
                    vm.pickDrop(vm.dropSelected);
                }
                 vm.pickDrop(vm.dropSelected);
                //console.log('show resp' + JSON.stringify(result))
            });    
        }

        function setLast60DaysDate()
        {
              var fromDate = new Date();
                var sevenDay = 5184000000;
                vm.setClass = 60;
                var newTimeInMilli = fromDate.getTime();
                fromDate = fromDate - sevenDay;
                var newFromDate = new Date(fromDate);
                var date = newFromDate.getDate();
                var month = newFromDate.getMonth() + 1;
                var year = newFromDate.getFullYear();
                vm.firstDate = false;
                fromDate = month + "/" + date + "/" + year + " " + "00" + ":" + "00" + ":" + "00";
                vm.showFromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
                vm.fromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
        }

        function goBack() {
            localStorage.setItem('path', '/search-order-entry');
            setHeaderItem.setItems();
        }
        goBack();

        function goSearchOrder() {
            
            var req = {
                BrokerId: localStorage['user_id'],
                CustomerId: 0,
                OrderNumber: '',
                Status: 0,
                FromDate: fromDate(),
                ToDate: toDate(),
                CompanyId: 2
            }
            $rootScope.isLoading = true;

            requestManager.searchOrder(req).then(function(result) {
                vm.orderHistoryData = result.Payload;
                vm.Data = angular.copy(vm.orderHistoryData);
                vm.dateFilterData(vm.orderHistoryData);
                console.log('show data' + JSON.stringify(vm.orderHistoryData.length));
                for (var i = 0; i < vm.orderHistoryData.length; i++) {
                    vm.orderHistoryData[i]['checks'] = false;
                }
                // console.log('searchOrder response: ' + JSON.stringify(vm.orderHistoryData));
                $rootScope.isLoading = false;
                vm.range = function() {
                    var rangeSize = 5;
                    var ps = [];


                    var start = vm.currentPage;

                    //  console.log(start)
                    //console.log(vm.pageCount(),vm.currentPage)
                    if (start > vm.pageCount() - rangeSize) {
                        start = vm.pageCount() - rangeSize + 1;
                    }

                    for (var i = start; i < start + rangeSize; i++) {
                        if (i >= 0)
                            ps.push(i);
                    }
                    // console.log(ps)
                    return ps;

                };

                vm.prevPage = function() {
                    if (vm.currentPage > 0) {
                        vm.currentPage--;

                    }
                };

                vm.DisablePrevPage = function() {
                    return vm.currentPage === 0 ? "disabled" : "";
                };

                vm.pageCount = function() {
                    if (vm.orderHistoryData) {
                        return Math.ceil(vm.orderHistoryData.length / vm.itemsPerPage) - 1;
                    }
                };

                vm.nextPage = function() {
                    if (vm.currentPage < vm.pageCount()) {
                        vm.currentPage++;
                    }

                };

                vm.DisableNextPage = function() {
                    return vm.currentPage === vm.pageCount() ? "disabled" : "";
                };

                vm.setPage = function(n) {
                    //console.log(n)
                    vm.currentPage = n;
                };

                // console.log('searchOrder response: ' + JSON.stringify(result));
            });
        }

        function fromDate() {
            var fromDate = new Date();
            var sevenDay = 604800000;
            var newTimeInMilli = fromDate.getTime();
            fromDate = fromDate - sevenDay;
            var newFromDate = new Date(fromDate);
            var date = newFromDate.getDate();
            var month = newFromDate.getMonth() + 1;
            var year = newFromDate.getFullYear();
            var hh = newFromDate.getHours();
            var mm = newFromDate.getMinutes();
            var ss = newFromDate.getSeconds();
            vm.firstDate = true;
            fromDate = month + "/" + date + "/" + year + " " + "00" + ":" + "00" + ":" + "00";
            vm.showFromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
            return $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
        }

        function toDate() {
            var toDate = new Date();
            var date = toDate.getDate();
            var month = toDate.getMonth() + 1;
            var year = toDate.getFullYear();
            var hh = toDate.getHours();
            var mm = toDate.getMinutes();
            var ss = toDate.getSeconds();
            toDate = month + "/" + date + "/" + year + " " + "00" + ":" + "00" + ":" + "00";
            vm.showToDate = $filter('date')(new Date(toDate), 'MM/dd/yyyy');
            return $filter('date')(new Date(toDate), 'MM/dd/yyyy');
        }
        vm.deleteOrder = function(id, baskId, index,check) {
            //console.log('hiiii');
            vm.deleteOrderId = id;
            vm.basketId = baskId;
            vm.bulkDel = true;
            vm.ind = index;
            if(check=='m'){
                vm.newMobCheck = 'n';
            }
            $('.errorModal').modal('show');

        }


        // Filter Data using Broker ID - test
        vm.setBrokerID = function(selectedBrokerID)
        {
          
        }


        vm.confirmDeleteOrder = function() {
            //console.log('yooo'+vm.deleteOrderId);
            var req = {
                brokerId: localStorage['user_id'],
                orderNumber: vm.deleteOrderId,
                BasketId: '',
                message: ''
            }
          //  alert(JSON.stringify(req));
            $rootScope.isLoading = true;
            // console.log('searchOrder req: ' + JSON.stringify(req));
            requestManager.deleteOrder(req).then(function(result) {
                $('.errorModal').modal('hide');
                vm.orderHistoryData.splice(vm.ind, 1);
                if(vm.newMobCheck == 'n'){
                    goSearchOrder();
                    vm.newMobCheck = '';
                }
                $rootScope.isLoading = false;
                //  console.log('searchOrder response: ' + JSON.stringify(result));
            });
        }
        vm.bulkDeleteOrder = function() {
            for (var i = 0; i < vm.delOnew.length; i++) {
                vm.deleteBulkOrder(vm.delOnew[i].orderNum, i);
            }

        }
        vm.bulkReset = function() {
            vm.delOnew = [];
            for (var i = 0; i < vm.orderHistoryData.length; i++) {
                vm.orderHistoryData[i]['checks'] = false;
                vm.orderHistoryData[i]['setDelId'] = false;
                if (vm.orderHistoryData[i].Pickup == 'true') {
                    var IE = angular.element(document.querySelector('#w' + vm.orderHistoryData[i].PONumber));
                    IE.addClass('pickOrder');
                    $('.bulkModal').modal('hide');
                }
            }
        }


        vm.deleteBulkOrder = function(id, i, check) {
            var req = {
                brokerId: localStorage['user_id'],
                orderNumber: id,
                BasketId: '',
                message: ''
            }
            $rootScope.isLoading = true;
            // console.log('searchOrder req: ' + JSON.stringify(req));
            requestManager.deleteOrder(req).then(function(result) {
                $('.bulkModal').modal('hide');
                angular.forEach(vm.orderHistoryData, function(item, $index) {
                    if (item.PONumber == id) {
                        vm.orderHistoryData.splice($index, 1);
                    }
                    if (check == 'm') {
                        vm.delteMob = [];
                        vm.DelSUcc = true;
                        vm.dateFilterData(vm.orderHistoryData);
                    }
                })
                $rootScope.isLoading = false;
                //  console.log('searchOrder response: ' + JSON.stringify(result));
            });
        }
        vm.delteOrder = function() {
            vm.mob = 'mm';
            $('.bulkModal').modal('show');
        }
        vm.getOrderStatus = function() {
            requestManager.getOrderStatPost().then(function(result) {
                vm.orderStatus = result.Payload;
                // console.log('searchOrder stat response: ' + JSON.stringify(result));
            });
        }
        vm.getOrderStatus();
        vm.setStatus = function(val, check) {
            //console.log(val);
            if (val == null) {
                vm.stat = 0;
            } else {
                vm.stat = val.StatusNo;
            }
            if (check != 'm') {
                vm.setFilterOrder();
            }
        }

        vm.setOrderNumber = function(val, check) {
            vm.setNumber = val;
            if (check != 'm') {
                vm.setFilterOrder();
            }
        }
        vm.setFilterOrder = function(check) 
        {       
           
            // Check for the admin broker filter for Broker
            var currentBrokerID = localStorage['user_id'];
             if(vm.BrokerManager)
             {
                 if(vm.AdminBrokerList!=null && vm.AdminBrokerList !='' && vm.AdminBrokerList !='0')
                        currentBrokerID = vm.AdminBrokerList;
             }

            var req = {
                BrokerId: currentBrokerID,
                CustomerId: vm.custId,
                OrderNumber: vm.setNumber,
                Status: vm.stat,
                FromDate: $filter('date')(new Date(vm.fromDate), 'MM/dd/yyyy HH:mm:ss'),
                ToDate: $filter('date')(new Date(vm.toDate), 'MM/dd/yyyy HH:mm:ss'),
                CompanyId: 2
            }
            $rootScope.isLoading = true;
            requestManager.searchOrder(req).then(function(result) {
                $rootScope.isLoading = false;
                vm.orderHistoryData = result.Payload;
                vm.Data = angular.copy(vm.orderHistoryData);
                console.log('sel drop' + JSON.stringify(vm.dropSelected));
                vm.itemsPerPage = 10;
                vm.currentPage = 0;
                // console.log('show values'+JSON.stringify(vm.orderHistoryData));

                if (check == 'm') {
                    vm.pickDropMob(vm.dropSelected);
                } else {
                    vm.pickDrop(vm.dropSelected);
                }

                //console.log('show resp' + JSON.stringify(result))
            });
        }
        vm.constumerDetails = function(callback) {

                     var req = {
                BrokerId: localStorage['user_id']
            }
             
                requestManager.customerDetailPost(req).then(function(result) {
                    vm.customerData = result.Payload;
                    for (var i = 0; i < vm.customerData.length; i++) {
                        if(vm.customerData[i].STATUS == 'A'){
                                vm.custData.push({
                                UserID: vm.customerData[i].USERID,
                                Name: vm.customerData[i].USERID + "-" + vm.customerData[i].NAME
                            })
                                
                        }
                      
                    }
                    //console.log('show customerList Data'+JSON.stringify(vm.customerData[i]));
                    callback(vm.custData);
                    
                });

            }
            // vm.constumerDetails()
        vm.setCustId = function(val, check) {
            if (val.Name == 'All') {
                vm.custId = 0;
            } else {
                vm.custId = val.UserID;
            }
            if (check != 'm') {
                vm.setFilterOrder();
            }
        }
        vm.setToDate = function(val, check) {
            console.log('sssdddd' + val)
                //vm.setToDate = $filter('date')(new Date(val),'MM/dd/yyyy hh:mm:ss');
            vm.toDate = $filter('date')(new Date(val), 'MM/dd/yyyy');
            if (check != 'm' && vm.setValid == true) {
                vm.setFilterOrder();
            }
        }
        vm.setFromDate = function(val, check) {
            console.log('ss' + val)
                //vm.setFromDate = $filter('date')(new Date(val),'MM/dd/yyyy hh:mm:ss');
            vm.fromDate = $filter('date')(new Date(val), 'MM/dd/yyyy');
            if (check != 'm') {
                vm.setFilterOrder();
            }
        }
        vm.checkPick = function(val) {
            if (val == "true") {
                return 'Pickup'
            } else {
                return 'Regular';
            }
        }

        vm.pickDrop = function(val) {
            vm.orderHistoryData = [];
            console.log(vm.Data.length);
            for (var i = 0; i < vm.Data.length; i++) {
                if (vm.Data[i].Pickup == val.Val) {
                    vm.orderHistoryData.push(vm.Data[i]);
                }
            }
            if (val.Val == 'All') {
                vm.orderHistoryData = vm.Data;
            }
            if (vm.orderHistoryData.length) {
                if (vm.orderHistoryData[0].CustomerID == "-") {
                    console.log('no data')
                    vm.orderHistoryData = [];
                }
            }
        }
        vm.pickDropMob = function(val) {
            vm.orderHistoryData = [];
            for (var i = 0; i < vm.Data.length; i++) {
                if (vm.Data[i].Pickup == val.Val) {
                    vm.orderHistoryData.push(vm.Data[i]);
                }
            }
            if (val.Val == 'All') {
                vm.orderHistoryData = vm.Data;
            }
            if (vm.orderHistoryData.length) {
                if (vm.orderHistoryData[0].CustomerID == "-") {
                    console.log('no data')
                    vm.orderHistoryData = [];
                }
            }
            vm.dateFilterData(vm.orderHistoryData);
        }
        vm.checkAll = function() {
            angular.forEach(vm.orderHistoryData, function(item, $index) {
                if (vm.Allcheck == true) {
                    if (item.StatusText == 'Open') {
                        vm.orderHistoryData[$index]['checks'] = true;
                        vm.deleteItem.push()
                    }
                } else {
                    vm.orderHistoryData[$index]['checks'] = false;
                }

            })
        }
        vm.swipe = function (val,index) {
            for(var i=0;i<vm.finalData.length;i++){
                for(var j=0;j<vm.finalData[i].data.length;j++){
                    if(vm.finalData[i].data[j].PONumber == val.PONumber){
                        vm.resetSwipe();
                        vm.finalData[i].data[j].checks = true;
                    }
                }
                 
            }            
        }
        vm.resetSwipe = function () {
            for(var i=0;i<vm.finalData.length;i++){
                for(var j=0;j<vm.finalData[i].data.length;j++){
                        vm.finalData[i].data[j].checks = false;
                }
                 
            }  
        }
        vm.checkOne = function(val, index, order) {
            console.log(index);
            if (val == true) {
                vm.delOnew.push({
                    orderNum: order.PONumber,
                    ind: index
                });
                vm.orderHistoryData[index]['setDelId'] = true;
                if (order.Pickup == 'true') {
                    var IE = angular.element(document.querySelector('#w' + order.PONumber));
                    IE.removeClass('pickOrder');
                }
            } else {
                for (var i = 0; i < vm.delOnew.length; i++) {
                    if (vm.delOnew[i].ind == index) {
                        vm.delOnew.splice(i, 1);

                    }

                }
                vm.orderHistoryData[index]['setDelId'] = false;
                if (order.Pickup == 'true') {
                    var IE = angular.element(document.querySelector('#w' + order.PONumber));
                    IE.addClass('pickOrder');
                }
            }
            console.log(vm.delOnew);
        }
        vm.reset = function(val) {
            vm.getOrderStatus();
            //vm.constumerDetails()
            vm.itemsPerPage = 10;
            vm.currentPage = 0;
            vm.custData = [];
            vm.delteMob = [];
            vm.orderStatus = [];
            vm.custSelected = {
                "Name": "All",
                "id": ""
            }
            vm.dropSelected = vm.dropPick[0];
            vm.stat = 0;
            vm.custId = 0;
            vm.fromDate = fromDate();
            vm.toDate = toDate();
            vm.setNumber = '';
            vm.deleteItem = [];
            vm.delOnew = [];
            goSearchOrder();
        }
        vm.daysFilter = function(val, check) {
            if (val == 7) {
                var fromDate = new Date();
                var sevenDay = 604800000;
                var newTimeInMilli = fromDate.getTime();
                fromDate = fromDate - sevenDay;
                var newFromDate = new Date(fromDate);
                var date = newFromDate.getDate();
                var month = newFromDate.getMonth() + 1;
                var year = newFromDate.getFullYear();
                fromDate = month + "/" + date + "/" + year + " " + "00" + ":" + "00" + ":" + "00";
                vm.firstDate = true;
                vm.showFromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
                vm.fromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
            }
            if (val == 15) {
                var fromDate = new Date();
                vm.setClass = 15;
                var sevenDay = 1296000000;
                var newTimeInMilli = fromDate.getTime();
                fromDate = fromDate - sevenDay;
                var newFromDate = new Date(fromDate);
                var date = newFromDate.getDate();
                var month = newFromDate.getMonth() + 1;
                var year = newFromDate.getFullYear();
                vm.firstDate = false;
                fromDate = month + "/" + date + "/" + year + " " + "00" + ":" + "00" + ":" + "00";
                vm.showFromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
                vm.fromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
            }
            if (val == 30) {
                var fromDate = new Date();
                var sevenDay = 2592000000;
                vm.setClass = 30;
                var newTimeInMilli = fromDate.getTime();
                fromDate = fromDate - sevenDay;
                var newFromDate = new Date(fromDate);
                var date = newFromDate.getDate();
                var month = newFromDate.getMonth() + 1;
                var year = newFromDate.getFullYear();
                fromDate = month + "/" + date + "/" + year + " " + "00" + ":" + "00" + ":" + "00";
                vm.firstDate = false;
                vm.showFromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
                vm.fromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
            }
            if (val == 45) {
                var fromDate = new Date();
                var sevenDay = 3888000000;
                vm.setClass = 45;
                var newTimeInMilli = fromDate.getTime();
                fromDate = fromDate - sevenDay;
                var newFromDate = new Date(fromDate);
                var date = newFromDate.getDate();
                var month = newFromDate.getMonth() + 1;
                var year = newFromDate.getFullYear();
                vm.firstDate = false;
                fromDate = month + "/" + date + "/" + year + " " + "00" + ":" + "00" + ":" + "00";
                vm.showFromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
                vm.fromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
            }
            if (val == 60) {
                var fromDate = new Date();
                var sevenDay = 5184000000;
                vm.setClass = 60;
                var newTimeInMilli = fromDate.getTime();
                fromDate = fromDate - sevenDay;
                var newFromDate = new Date(fromDate);
                var date = newFromDate.getDate();
                var month = newFromDate.getMonth() + 1;
                var year = newFromDate.getFullYear();
                vm.firstDate = false;
                fromDate = month + "/" + date + "/" + year + " " + "00" + ":" + "00" + ":" + "00";
                vm.showFromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
                vm.fromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
            }
            if (check != 'm') {
                vm.setFilterOrder();
            }


        }
        vm.dateFilterData = function(val) {
            var newData = val;
            //console.log('show res'+JSON.stringify(val));
            var res = _.groupBy(newData, "OrderDate")
            var finalData = _.map(res, function(value, key) {
                return {
                    displayDate: $filter('date')(new Date(key),'dd MMMM,yyyy'),
                    data: value
                }
            });
            vm.finalData = finalData;
            vm.initiatData = angular.copy(vm.finalData);
            //console.log('show res' + JSON.stringify(finalData));
        }
        vm.sortData = function(from, custM) {
            console.log('hiiii' + from + " " + custM);
            if (from == undefined) {
                from = '';
            }
            if (custM == undefined) {
                custM = '';
            }
            var data = _.filter(vm.orderHistoryData, function(item) {
                return item.OrderDate === from || item.CustomerName === custM;
            });
            console.log('show data' + JSON.stringify(data))
            vm.dateFilterData(data);
        }
        vm.deleteItemMob = function(val, index) {
                   if(val.StatusText!='Submitted'){
                    if (vm.delteMob.indexOf(val) == -1) {
                    vm.delteMob.push(val);
                    for (var i = 0; i < vm.finalData.length; i++) {
                        for (var j = 0; j < vm.finalData[i].data.length; j++) {
                            if (vm.finalData[i].data[j].PONumber == val.PONumber) {
                                vm.finalData[i].data[j]['setDelId'] = true;
                                var Il = angular.element(document.querySelector('#m' + val.PONumber));
                                Il.removeClass('pickOrder');

                                }
                            }
                        }
                    }else{
                        for (var i = 0; i < vm.finalData.length; i++) {
                            for (var j = 0; j < vm.finalData[i].data.length; j++) {
                            if (vm.finalData[i].data[j].PONumber == val.PONumber) {
                            vm.finalData[i].data[j]['setDelId'] = false;                             
                           }
                          }
                        }
                        for(var k = 0;k<vm.delteMob.length;k++){
                            if (vm.delteMob[k].PONumber == val.PONumber) {
                            vm.delteMob.splice(k,1);
                         }
                        }
                       
                     if (val.Pickup == 'true') {
                        var Il = angular.element(document.querySelector('#m' + val.PONumber));
                        Il.addClass('pickOrder');
                         }

            
                          
                    }
                } 
            console.log(JSON.stringify(vm.finalData));
        }
        vm.cancel = function() {
            for (var i = 0; i < vm.finalData.length; i++) {
                for (var j = 0; j < vm.finalData[i].data.length; j++) {
                    vm.finalData[i].data[j]['setDelId'] = false;
                }
            }
            for (var k = 0; k < vm.delteMob.length; k++) {
                if (vm.delteMob[k].Pickup == 'true') {
                    var Il = angular.element(document.querySelector('#m' + vm.delteMob[k].PONumber));
                    Il.addClass('pickOrder');
                }

            }
            vm.delteMob = [];
            $('.bulkModal').modal('hide');
        }
        vm.bulkDeleteOrderMob = function() {
            vm.mob = true;
            $('.bulkModal').modal('show');
        }
        vm.confirmDelMob = function() {
            for (var i = 0; i < vm.delteMob.length; i++) {
                vm.deleteBulkOrder(vm.delteMob[i].PONumber, i, 'm');
            }
            $('.bulkModal').modal('hide');
        }
       vm.showInfo = function (data) {
            localStorage.setItem('cust-details',JSON.stringify(data));
            $window.open('/#/customer-info', '_blank');
        }
        vm.showOrderDetails = function (data) {
            vm.mobViewDetail = data;
            
            $('.viewModal').modal('show');
            $('.viewModal').css('overflow-y','scroll');
        }

        vm.submitOrder = function(submitEOR,isPickup)
        {
         var submitConfirm;
         submitConfirm = confirm("Are you sure want to Submit order?")   
          if(submitConfirm)
          {
                submitOrder(submitEOR,isPickup);
               
          }
        }


                // Submit Order Detail
        function submitOrder(submitEOR,isPickup)
        { 
              // Get Order Data
               var req = 
               {
                    BasketId:submitEOR,
                    CompanyId:'2',                                     
                    Action:'P'
               } 
          
                requestManager.GetOrderPreview(req).then(function(result) 
               { 
                
                   vm.OrderPreview = result.Payload; // Load Order Data

                   // Submit Order Data
                    var req1 = 
                   {                        
                         CustomerId:vm.OrderPreview[0].CustomerID,
                         CompanyId:'2',
                         BrokerId:vm.OrderPreview[0].SalesmanID,
                         CatalogId:"1",
                         day: vm.OrderPreview[0].OrderDay,                       
                         notDay: vm.OrderPreview[0].NotDay,  
                         Comments:vm.OrderPreview[0].Comments,
                         isPickUp:vm.isPickUp,
                         EOR:vm.OrderPreview[0].PONumber,
                         AmountCollected:vm.OrderPreview[0].ActualAmount,
                         isActive:'1',
                         totalCaseQuantity:vm.OrderPreview[0].TotalOrderQty,
                         totalAmount:'3',
                         DeliveryDate:vm.OrderPreview[0].DeliveryDate,
                         ClientPONumber:vm.OrderPreview[0].ClientPONumber,                      
                         productType: '',// need to fixed .... $scope.OrderPreview[0].'',
                         templateName:'',
                         totalUnitQuantity:vm.OrderPreview[0].TotalUnitsQty,
                      } ;

             //Submit Order Data
             requestManager.SubmitOrder(req1).then(function(result) 
             {           
                 goSearchOrder();
                 alert('Order ' + vm.OrderPreview[0].PONumber+' Submitted Successfully!'); 
             });
                    
          });
        }

         
    }
    SearchOrderController.$inject = ['$scope','$rootScope', 'requestManager', 'checkAuthorization', '$state', '$filter', 'errorModalService','$window','$location','setHeaderItem','checkBrowserDetails'];

    return SearchOrderController;
});