define([], function(app) {
    'use strict';

    function SearchItemController($scope,$rootScope, requestManager, checkAuthorization, $state,$location,FactoryIndexedDBLoad,setHeaderItem,checkBrowserDetails) {
        var vm = this;
        vm.itemsPerPage = 10;
        vm.currentPage = 0;
        vm.addCartItem = [];
        vm.count = 0;
        vm.sumQuantity = 0;
        vm.quantity = 1;
        vm.duplCart = false;
        vm.custId = localStorage['Cust_id'];
        vm.custName = localStorage['Cust_Name'];
         vm.caseTotal = 0;
		vm.orderItemData = [];
	    vm.EOR = '';
        vm.ItemCode='';
        vm.CaseQuantity='';
        vm.Departments='';
        vm.SelectedDepartment='';
     $rootScope.headerUrl = 'includes/footer1.html';
        function initRootScope() {
            //after login set login variable in root scope
            if(localStorage['access_token']){
              $rootScope.login = true;
            }
            if (!localStorage['Cust_id']) {
                $state.go('customerdetails');
            }
            
            checkAuthorization.Authentication();
            //goSearchItemList();
            if($rootScope.online == true){
               getDepartmentDetails();
            vm.selectedDepartmentValue = "GR";
            vm.SelectedDepartment="GR";
            var queryStringObject = $location.search();

           if(queryStringObject.EOR > 0)
           {
              vm.EOR = queryStringObject.EOR;
              addItem('','0');  // Load Item List

           } 
            }
            

        }
        initRootScope();
       
        function goBack() {
            localStorage.setItem('path', '/search-item');
            setHeaderItem.setItems();
        }
        goBack();

         // Get Deaprtment Details
          function getDepartmentDetails() 
           {
          //$rootScope.isLoading = true;
            requestManager.GetDepartmentsPost().then(function(result) {
               // $rootScope.isLoading = false;  
                if (result.Payload) {
                    vm.Departments = result.Payload;                   
                }
            });
        }

        function goSearchItemList() {
            var req = {
                CustomerId: localStorage['Cust_id']
            }
            //console.log('json' + JSON.stringify(req))
            $rootScope.isLoading = true;
            if($rootScope.online == true){
            requestManager.ItemList(req).then(function(result) {
                vm.searchItem = result.Payload;


                $rootScope.isLoading = false;
               // console.log('SearchItemList response: ' + JSON.stringify(result.Payload));
                vm.range = function() {
                    var rangeSize = 5;
                    var ps = [];


                    var start = vm.currentPage;
                    //  console.log(start)
                    //  console.log(vm.pageCount(),vm.currentPage)
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
                    return Math.ceil(vm.searchItem.length / vm.itemsPerPage) - 1;
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
                    vm.currentPage = n;
                };

            });
          }
        }
        goSearchItemList();
        vm.addCart = function(item, index) 
		{
            vm.ItemCode = item.ProductCode;
			vm.newCartItem = item;
            $('.cartModal').modal('show');
            vm.custId = localStorage['Cust_id'];
        }
        vm.plusCount = function() {
            //console.log('hii');
            vm.quantity = vm.quantity + 1;

        }
        vm.minusCount = function() {
           // console.log('hii');
            vm.quantity = vm.quantity - 1;

        }
        vm.resetCart = function(index) {
           // console.log('hello');
          //  vm.addCartItem.splice(index, 1);
            /// vm.newCartItem.splice(vm.indexItem,1);
           // vm.count = vm.count - 1;
           // vm.quantity = 1;
        }
        vm.confirmCart = function() {
            $('.cartModal').modal('hide');
          /*  if (vm.addCartItem.indexOf(vm.newCartItem) == -1) 
            {
                vm.addCartItem.push(vm.newCartItem);

                // vm.indexItem = vm.addCartItem.length-1;
               // vm.count = vm.count + 1;
                for (var i = 0; i < vm.addCartItem.length; i++) {
                    if (vm.addCartItem[i].ProductCode == vm.newCartItem.ProductCode) {
                        vm.addCartItem[i]['quantity'] = vm.quantity;
                    }
                }
                vm.reOrdering(vm.newCartItem);

            } else 
            {
                // vm.indexItem = vm.addCartItem.length-1;
                for (var i = 0; i < vm.addCartItem.length; i++) {
                    if (vm.addCartItem[i].ProductCode == vm.newCartItem.ProductCode) {
                        vm.addCartItem[i]['quantity'] = vm.quantity;
                    }
                }
                vm.reOrdering(vm.newCartItem);
            } */
            vm.sumQuantity = 0;
            vm.totalQuantity();
            //vm.quantity = 1;
			
			// Add Item to Pending Order
			addItem(vm.ItemCode,vm.quantity);
          
        }
        vm.reOrdering = function () {
          /*  for(var i=0;i<vm.addCartItem.length;i++)
            {
                if(vm.addCartItem[i].ProductCode == vm.newCartItem.ProductCode){
                    vm.addCartItem.splice(i,1);
                    vm.addCartItem.splice(0,0,vm.newCartItem);
                }
            } */
        }
        vm.totalQuantity = function () {
          //  _.forEach(vm.addCartItem,function (item) {
          //      vm.sumQuantity = vm.sumQuantity + item.quantity;
          //  })          
        }
		
		               // Item Item 
        function addItem(ItemCode,CaseQuantity)
        {
                //debugger; 
 
                 // Check EOR 
                 if(vm.EOR=='undefined' || vm.EOR==null || vm.EOR =='')
                       vm.EOR = ''; 
                 
                // check Item Code or UPC
                var Action;
                if(ItemCode.length >4)
                      Action = 'UPC';
                  else
                       Action = '';

                   if(vm.SelectedDepartment=='')
                        vm.SelectedDepartment="GR";
          //   alert($scope.SelectedCustomer);
                   
                      var req = 
                      {
                         
                         CustomerId:vm.custId,
                         EOR: vm.EOR,
                         CaseQuantity: CaseQuantity,
                         ItemCode:vm.ItemCode, 
                         BrokerId: localStorage['user_id'],
                         OrderNumber:'',
                         Status: "0",                         
                         CompanyId: 2,
                         UnitQuantity: '',
                         LanguageId: "en-US",
                         CatalogId: "1",
                         SearchText: "%%",
                         WarehouseId: "01",
                         BasketId: '',
                         Message: '',
                         Dept:vm.SelectedDepartment,
                         SalesManID: localStorage['user_id'],
                         WHID: "01",
                         chkPickup: false,
                         clientPONumber: '',
                         day:'',                       
                         notDay:'',    
                         deliveryDate:'2016-05-18',  
                         promoCode:'', 
                         Action:'',   
                         strCases:'1',   
                         Comments:'', 
                         Result:'',   
                         Units:'1' 

                     }
                requestManager.AddItemToOrder(req).then(function(result) 
                {
                  // debugger;
                 if (result.Payload)
                 { 
                   vm.orderItemData =  result.Payload;
                   vm.addCartItem1 = result.Payload;
                    vm.quantity = 1;
                  if(vm.orderItemData.length>0)
                  {                    
                      // Get generated EOR                 
                      vm.EOR = vm.orderItemData[0].PONumber;
                      // Reset Values 
                    
                      vm.ItemCode = '';
                       vm.caseTotal = 0;

                       for(var i = 0; i<vm.orderItemData.length;i++)
                      {
                          vm.caseTotal += parseInt(vm.orderItemData[i].Quantity);
                       }
                      //   vm.CaseQty = '';
                 }
                          

                }
            });

        }

          // Delete Item       
         vm.deleteItem = function(productCode) 
         {    
            var req = 
                      {
                         ItemCode:productCode,
                         CustomerId:vm.custId,
                         EOR:vm.EOR
                      } 
             requestManager.DeleteOrderItem(req).then(function(result) 
             {  
                  vm.DeletedItem =  productCode;                  
                  addItem('','0')

             });
          }
          function indexDbSearchItem(){
            if($rootScope.online == false){
                $rootScope.isLoading = true;
                   FactoryIndexedDBLoad.getItemsData().then(function (result) {
                    vm.searchItem = result;
                    vm.dept();
                    
                   
                })  
            }
           
          }
          indexDbSearchItem()
          vm.dept = function () {
              FactoryIndexedDBLoad.getDeptData().then(function (result) {
                  vm.Departments = result;
                  vm.SelectedDepartment = result[0].DepartmentCode;
                  $rootScope.isLoading = false;
              })
          }
        
        }

    SearchItemController.$inject = ['$scope','$rootScope', 'requestManager', 'checkAuthorization', '$state','$location','FactoryIndexedDBLoad','setHeaderItem','checkBrowserDetails'];

    return SearchItemController;
});