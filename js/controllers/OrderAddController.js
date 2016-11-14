
define([], function(app){
    'use strict';

    function OrderAddController($rootScope,requestManager,$state,checkAuthorization,$scope,$location,$filter,FactoryIndexedDBLoad,$window,$interval,setHeaderItem,checkBrowserDetails){
        var vm = this;
        $scope.ctDisabled = false;
        vm.custSelected = {"Name": "All", "id": ""}
        vm.custData = [];
        vm.CaseQty = '';
        vm.UnitQty = 0;
        vm.SelectedDepartment='';
        vm.SelectedPromotion = '';
        vm.SelectedDay = 0;
        vm.SelectedNotDay=0;
        vm.ExtraInfo=true;
        vm.orderItemData='';
        vm.ClientPONumber='';
        vm.BrokerId = localStorage['user_id'];
        vm.setItemCodeFocus = true;
        vm.AmountCollected = '';
        vm.SelectedDay='0';
        vm.SelectedNotDay='0';
        vm.tempItemCode='';
        vm.tempEOR='';
        vm.pendingOrderCount=0;
        vm.Message='';
        vm.isDeleted = false;
        vm.DeletedItem='';
        vm.Comment='';
        vm.IsMobile=true;
        vm.TemplateName='';
        vm.isScan=false;
        vm.DisablePlusBtn=false;
        vm.DisableMinusBtn=false;
        vm.iOS = false;
        vm.IsRestricted = false;
        vm.CustomerName='';
       

        vm.SelectedCustomer = {
                "Name": "",
                "id": ""
            }
          if($rootScope.online == false){
            vm.DisablePlusBtn=true;
            vm.DisableMinusBtn=true;
          }else{
            vm.DisablePlusBtn=false;
            vm.DisableMinusBtn=false;
     }
         
        
   initRootScope();

  // Check the Current date and set delivery date 
function dateTimeCheck()
{
            var d = new Date(); // Get Date
            

            var weekday = new Array(7);
          
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            weekday[7] = "Sunday";

            var todayIndexValue = d.getDay();


            var dayIndex = weekday[d.getDay()]; // Get Day Index

            var addDays = 0;

            d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
            var parts = d.match(/(\d+):(\d+) (AM|PM)/);
            var hours = parseInt(parts[1]);
            var tt = parts[3];
            if(tt == 'PM' && hours == 12){
              hours = 0;
            }
            console.log(parts[1]);
            if (parts) 
            {
                    if (tt === 'PM' && hours >=4)
                    {
                       
                      if(dayIndex=='Thursday' || dayIndex=='Friday')
                            addDays = 4 ;
                      else if(dayIndex=='Saturday')
                            addDays = 3 ;
                      else
                        addDays = 2;

                      // Check for Order Day Selection
                      
                      if(vm.SelectedDay!='0')
                      {
                         if(vm.SelectedDay>(todayIndexValue+1))  // If selected day greater then today's day
                         {                                  // +1 because after 4 PM
                           addDays = vm.SelectedDay - (todayIndexValue); 
                           //alert('grater!');
                         }
                         else // If Selected week day less or equal today's date
                         {
                           addDays = vm.SelectedDay - (todayIndexValue)+7; 
                          //alert('Less then!');
                         }
                     
                       if((todayIndexValue == 5 || todayIndexValue == 6 || todayIndexValue == 7) && vm.SelectedDay==1)
                           addDays = (7-todayIndexValue) +8  // Set Net Monday Date
                         
                      }

                      $('#datepicker').datepicker({minDate: addDays});
                      $('#datepicker1').datepicker({minDate: addDays});
                      var tomorrowDate = $filter('date')(new Date(new Date().getTime()+(addDays*24*60*60*1000)), 'MM-dd-yyyy');        
                      vm.DeliveryDate =  tomorrowDate;
                    }
                    else
                    {
                      if(dayIndex=='Friday' || dayIndex=='Saturday')
                            addDays = 3 ;
                      else if(dayIndex=='Sunday')
                            addDays = 2 ;
                      else
                        addDays = 1;

                         // Check for Order Day Selection
                      
                      if(vm.SelectedDay!='0')
                      {
                         if(vm.SelectedDay>todayIndexValue)  // If selected day greater then today's day
                         {
                          addDays = vm.SelectedDay - todayIndexValue;
                           //alert('grater!');
                         }
                         else // If Selected week day less or equal today's date
                         {
                           addDays = vm.SelectedDay - todayIndexValue+7;
                          //alert('Less then!');
                         }

                      }
                     

                      $('#datepicker').datepicker({minDate: addDays});
                      $('#datepicker1').datepicker({minDate: addDays});
                      var tomorrowDate = $filter('date')(new Date(new Date().getTime()+(addDays*24*60*60*1000)), 'MM-dd-yyyy');        
                      vm.DeliveryDate =  tomorrowDate;
                    }
                   
                }
            
        }
        $scope.Days = [
        {Day : "--", Value : "0"},
        {Day : "Mon", Value : "1"},
        {Day : "Tue", Value : "2"},
        {Day : "Wed", Value : "3"},
        {Day : "Thu", Value : "4"},
        {Day : "Fri", Value : "5"},
        {Day : "Sat", Value : "6"},
        {Day : "Sun", Value : "7"},
        
    ];


         // On Page Load
         function initRootScope() 
         {
            
                   vm.addd=[];
            //after login set login variable in root scope
            vm.EOR = '';
            // Get Query String value
            dateTimeCheck();
            vm.ItemCode='';
            if(localStorage['access_token']){
              $rootScope.login = true;
            }
            
            checkAuthorization.Authentication();
            //goInsertOrderData();

            // Apply fast click for Item Entery Controls
           var itemCodeMobile,itemCodeDesktop;
           
           itemCodeMobile = document.getElementById('txtItemCodeMobile');
           itemCodeDesktop = document.getElementById('txtItemCode');

           FastClick.attach(itemCodeMobile);
           FastClick.attach(itemCodeDesktop);
           
           // Check for iOS devices (iPhone,iPad)
           var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
           vm.iOS = iOS;

            //////////////////////////////////////////////

            // is this an IPad ?
var isiPad = (navigator.userAgent.match(/iPad/i) != null);


// is this an iPhone ?
var isiPhone = (navigator.userAgent.match(/iPhone/i) != null);

// is this an iPod ?
var isiPod = (navigator.userAgent.match(/iPod/i) != null);


    

  
          

          ////////////////////////////////////////////////////

            goCutomerdetail();
            getDepartmentDetails();
            getPromotionDetails();
           
            
            vm.isPickup = false;
            getTemplateDetails();
            
             vm.SelectedDay='0';
             vm.SelectedNotDay='0';

            // Default 
            vm.SelectedDepartment = '1';
            vm.selectedDepartmentValue = "1";
       

            if(localStorage.getItem('access_token') == null && localStorage.getItem('user_id') == null ) {
        
                $state.go("login");
            } else 
            {
                $rootScope.login = true;
               // $rootScope.isLoading = false; 
                localStorage['path'] = '/order-entry'
                var reqItem = {
                    eor:'',
                    case:0
                   }
                   setHeaderItem.setItems(reqItem);
            }
            if(localStorage['Cust_id']!=null)
            {               
                vm.selectedCustomerValue = localStorage['Cust_id'];
                vm.SelectedCustomer = localStorage['Cust_id']+'-'+localStorage['Cust_Name'];
                vm.CustomerName = localStorage['Cust_id']+'-'+localStorage['Cust_Name'];
            } 
       
            var searchObject = $location.search();
           if(searchObject.EOR > 0)
           {
            // debugger;
             vm.EOR = searchObject.EOR;
             $scope.EOR = searchObject.EOR;
             localStorage['Cust_id'] = searchObject.custID;
             vm.selectedCustomerValue = searchObject.custID;
             vm.SelectedCustomer =  searchObject.custID+'-'+  searchObject.custNameEdit;
             vm.CustomerName = searchObject.custID+'-'+searchObject.custNameEdit;

             // Load Order Data on Edit
             loadOrderDataOnEdit(vm.EOR,vm.selectedCustomerValue);
         
           }  
           else if (searchObject.bID > 0)  // Copy Order
            {               
                 vm.selectedCustomerValue = searchObject.custID;
                 localStorage['Cust_id'] = searchObject.custID;
                 vm.SelectedCustomer =  searchObject.custID+'-'+searchObject.custNameCopy;
                 vm.CustomerName = searchObject.custID+'-'+searchObject.custNameCopy;

                 if(searchObject.isPickup =='true') // Check for Pickup Order
                 {
                      vm.isPickup =  true;
                      changeBackgroundColorForPickup();
                 }
                 copyOrder(searchObject.bID,searchObject.custID);
            }
             getPendingOrderCount();
           
        }
        
         // Show/Hide Extra Information
         vm.toggleExtraInfo = function ()
         {
           if(vm.ExtraInfo == false)
              vm.ExtraInfo = true;
           else
              vm.ExtraInfo = false;
         }

         // Copy Order
         function copyOrder(basketId,customerId)
         {
              var req = 
                      {
                         BasketId:basketId,
                         CompanyId:'2',
                         BrokerId:vm.BrokerId,
                         CustomerId:customerId,
                         LanguageId:'en-US',
                         CurrentEOR:'',
                         EOR:''
                      } 
             requestManager.CreateOrderFromTemplate(req).then(function(result) 
             {
                    vm.templateResult =  result.Payload;
 
                  if(vm.templateResult.length>0)
                  {
                      $scope.EOR = vm.templateResult[0].EOR;
                      vm.EOR = vm.templateResult[0].EOR;

                      addItem(); // Load Items from Template 
                  }
                      
                
                 
             });
         }

        // Load Order Data on Edit
        function loadOrderDataOnEdit(EOR,CustomerId)
        {
              var req = 
                      {
                         EOR:EOR,     
                         CustomerId:CustomerId                          
                      } 


          
            requestManager.GetOrderHeaderDetails(req).then(function(result) 
            {                         
                 
                if (result.Payload) {
                   vm.OrderHeader = result.Payload;
                               
                    vm.Comment = vm.OrderHeader[0].Comments; 
                    vm.SelectedDay = vm.OrderHeader[0].OrderDay; 
                    vm.SelectedNotDay = vm.OrderHeader[0].NotDay; 
                    vm.ClientPONumber = vm.OrderHeader[0].ClientPONumber; 
                    vm.SelectedPromotion = vm.OrderHeader[0].PromoCode; 
                    vm.selectedPromoValue =vm.OrderHeader[0].PromoCode; 
                    vm.AmountCollected = vm.OrderHeader[0].AmountCollected;

                    // Check for Pickup Order
                    vm.isPickup = vm.OrderHeader[0].Pickup;
                    if(vm.isPickup=="True")
                    {
                      changeBackgroundColorForPickup();
                      vm.isPickup = true;
                    }
                    else
                      vm.isPickup = false;
                    addItem();
                }
            });
        }




        function goInsertOrderData(){
            var req = {
                    
            }
            requestManager.InsertOrderData(req).then(function(result) {
            });
        }

        // Get Customer Details
         function goCutomerdetail(){
          if($rootScope.online == true){
           $rootScope.isLoading = true;
                var req = {
                BrokerId: localStorage['user_id']
            }
            requestManager.customerDetailPost(req).then(function(result) {
                $rootScope.isLoading = false;  
                if (result.Payload) {
                    vm.Customers = result.Payload;
                }
            });
           } 
        }

        // Get Deaprtment Details
      function getDepartmentDetails()  {
        if($rootScope.online == true){
          $rootScope.isLoading = true;
            requestManager.GetDepartmentsPost().then(function(result) {
                $rootScope.isLoading = false;  
                if (result.Payload) {
                    vm.Departments = result.Payload;                   
                }
            });
          }else{
              FactoryIndexedDBLoad.getDeptData().then(function (result) {
               $rootScope.isLoading = false;
               vm.Departments = result;    
                });
          }
        }

        // Get Promotion Details
          function getPromotionDetails(){
            if($rootScope.online == true){
            $rootScope.isLoading = true; 
            requestManager.GetPromotionDetailsPost().then(function(result) {
                $rootScope.isLoading = false;  
                if (result.Payload) {
                    vm.Promotions = result.Payload;                  
                }
            });
          }
        }
        
        // Get Pending Order Count by Customer Id
        function getPendingOrderCount(){
         if($rootScope.online == true){ 
          if( vm.SelectedCustomer!='undefined' || vm.SelectedCustomer!=null || vm.SelectedCustomer !='')
          {
            vm.pendingOrderCount = 0;
             var req = 
                      {
                         CustomerId: localStorage['Cust_id']
                      } 

             requestManager.GetPendingOrderCountByCustomerId(req).then(function(result) 
             {
                if (result.Payload) 
                {
                     var count = result.Payload;      
                     vm.pendingOrderCount = result.Payload[0].pendingOrderCount;            
                    // console.log('customerDetail Payload: ' + JSON.stringify(vm.Customers));

                }
            });
           }
           else
           {
               vm.pendingOrderCount = 0;
           }
          }
        }
        // Get Template Details
          function getTemplateDetails(){
          if($rootScope.online == true){  
            var req = 
                      {
                         CustomerId:'0',     
                         BrokerId:vm.BrokerId,
                         CompanyId:'2',                                     
                         isPickup:vm.isPickup
                      } 
          // $rootScope.isLoading = true;
            requestManager.GetTemplateDetails(req).then(function(result) 
            {                         
                //$rootScope.isLoading = false;  
                if (result.Payload) {
                    vm.Templates = result.Payload;
                   
                    // console.log('customerDetail Payload: ' + JSON.stringify(vm.Customers));

                }
            });
           } 
        }

        // Picku Checked
         $scope.pickUpChange = function() 
         { 
                 getTemplateDetails();
                changeBackgroundColorForPickup();


         };

          function  changeBackgroundColorForPickup()
          {
               // Change Background Color based on Pickup Check value
             var pickUpClass = angular.element( document.querySelector('#qk-remove-space'));
             var pickUpClass1 = angular.element( document.querySelector('#qk-remove-space1'));
             if(vm.isPickup)
             {   // Adding Clase for Background Color
                pickUpClass.addClass('form-color'); 
                pickUpClass1.addClass('form-color');
             }
             else
             {   // Removing Class for Background Color
                 pickUpClass.removeClass('form-color');
                 pickUpClass1.removeClass('form-color');
             }
         }

         vm.deleteItem = function(EOR,productCode)
         { 
           var deleteConfirm;
           deleteConfirm = confirm("Sure want to delete Item?")   
           if(deleteConfirm)
             deleteItem(EOR,productCode); 
        }

       // Check for the Restricted items in Order
       function checkRestrictedOrderItem()
       {
         var isValidate = true;
         for(var i=0;i<vm.orderItemData.length;i++)
         {
            if(vm.orderItemData[i].IsRestricted =='True')
                 return false; 
          }
          return true;
       }

         // Submit Order Data
        vm.submitOrder = function()
        {
          // Check for Restricted Items in Order
          var isValid = checkRestrictedOrderItem();

          if(isValid==true) // If no Resetricted items added on order
          {

              if($rootScope.online==true)
              {
                  if(vm.orderItemData.length > 0)
                  {
                     var submitConfirm;
                     submitConfirm = confirm("Are you sure want to Submit order?")   
                     if(submitConfirm)
                        submitOrderData();
                  }
                  else
                 {
                    alert('No Items added.');
                 }
             }
             else
             {
               alert("Not able to submit while offline.")
             }
            }
          else // If Resetricted items added on order
          {
            alert('Please remove Restricted items.')
          }
        
        }


        vm.constumerDetails = function(callback) {
           if($rootScope.online == true){

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
                    console.log('show customerList'+JSON.stringify(vm.customerData));
                    callback(vm.custData);
                    
                });
           }else{
              FactoryIndexedDBLoad.getCustDbIndexData().then(function (result) {
               $rootScope.isLoading = false;
                      vm.customerData = result;
                    for (var i = 0; i < vm.customerData.length; i++) {
                        vm.custData.push({
                            UserID: vm.customerData[i].USERID,
                            Name: vm.customerData[i].USERID + "-" + vm.customerData[i].NAME
                        })
                    }
                    callback(vm.custData);
                });
           }
          }

          

        vm.onCustomerChanged = function(item)
        {
          //console.log('selected item'+JSON.stringify(item));
                // localStorage['Cust_id'] =  vm.selectedCustomerValue; drpCustomer
                if(item!=undefined) {
                  localStorage.setItem('Cust_id',item.UserID);
           if($rootScope.online == false){
            vm.orderItemData =  [];
                  vm.addCartItem1 = [];
                  vm.addOrderItemData = [];
                  var new_Key = parseInt(localStorage['EORKEY']);
                  vm.newEor=new_Key+1;
                  localStorage['EORKEY'] = vm.newEor;
                  
           }
            var name='';
           for (var i=0;i<vm.customerData.length;i++)
           {    
                if(vm.customerData[i].USERID == localStorage['Cust_id'] )
                 {
                      name = vm.customerData[i].NAME;
                      break;
                 }
           }

           var reqItem = {
                    eor:'',
                    case:0
                   }
                   setHeaderItem.setItems(reqItem);
            localStorage.setItem('Cust_Name',name);
            vm.CustomerName = localStorage['Cust_id']+'-'+localStorage['Cust_Name'];
              resetOrderScreen();
              getPendingOrderCount();
                }          
           
        }

        function getCustomerNameByID()
        {


        }

    vm.customerDetails = function  (callback) {
         
         requestManager.customerDetail().then(function(result) {
             
            vm.customerData = result.Payload;
            for(var i=0;i<vm.customerData.length;i++){
              vm.custData.push({UserID:vm.customerData[i].USERID,Name:vm.customerData[i].USERID+"-"+vm.customerData[i].NAME})
            }
            callback(vm.custData);
            //console.log('show customerList'+JSON.stringify(vm.custData));
         });

        }

        vm.onTemplateSelected = function()
        {
            if(vm.orderItemData.length < 1)  // Check for added items
             {
               var confirmTemplate = confirm('Do you want to load selected template?');
                
               if(confirmTemplate == true)
                 {      
                      var req = 
                      {
                         BasketId:vm.SelectedTemplate,
                         CompanyId:'2',
                         BrokerId:vm.BrokerId,
                         CustomerId:localStorage['Cust_id'],
                         LanguageId:'en-US',
                         CurrentEOR:vm.EOR,
                         EOR:''
                     } 

             requestManager.CreateOrderFromTemplate(req).then(function(result) 
             {
                    vm.templateResult =  result.Payload;
 
                  if(vm.templateResult.length>0)
                  {
                      $scope.EOR = vm.templateResult[0].EOR;
                      vm.EOR = vm.templateResult[0].EOR;
                      addItem(); // Load Items from Template 

                  }                
                
                 
             });

                 }
                 else
             {
                    vm.SelectedTemplate = 0;   
             }
               
             }
             else
             {
               vm.SelectedTemplate = '';
                alert('Delete all Items before selecting template.')


             }
        }

        // Update Single Case Quantity Box
        $scope.updateCaseQuantityBox = function(updateQty)
        {
          var qtyCheck = 0;
          qtyCheck =parseInt(vm.CaseQty) + parseInt(updateQty);
         
           if(qtyCheck>=0)
           {              
              vm.CaseQty = parseInt(vm.CaseQty) + parseInt(updateQty);
           }

        }

          // Update Single Unit Quantity Box
        $scope.updateUnitQuantityBox = function(updateQty)
        {
          var qtyCheck = 0;
          qtyCheck =parseInt(vm.UnitQty) + parseInt(updateQty);
         
           if(qtyCheck>=0)
           {              
              vm.UnitQty = parseInt(vm.UnitQty) + parseInt(updateQty);
           }

        }

        $scope.updateCaseQuantity = function(keyEvent,itemCode,caseQty,unitQty)
        {      
              
              if(unitQty<1)
              {
              if(keyEvent == '1' )
                 caseQty = parseInt(caseQty) + 1;
              else
              {
                if(caseQty==1)
                {
                     var confirmDelete = confirm('Do you want to Delete Item?');
                     if(confirmDelete == true)
                         deleteItem(vm.EOR,itemCode); 
                      
                }
                else
                {
                  caseQty = parseInt(caseQty)- 1
                }
              }
             
               if (keyEvent.which === 13 || keyEvent.which === 0 || keyEvent=='-1' || keyEvent =='1') // On Key Press ENTER or On Blur
               {   
                  updateCaseQuantity(itemCode,caseQty);
               }
             }
              else
              {
                alert('Either Case Or Unit can be entered.');
              }
           // var target = $event.target;
           // target.blur();
        }

             $scope.updateUnitQuantity = function(keyEvent,itemCode,unitQty,caseQty)
             {    
            
              if(caseQty<1 || caseQty=='undefined')
              {
              if(keyEvent == '1' )
                 unitQty = parseInt(unitQty) + 1;
              else
              {
                if(unitQty==1)
                {
                     var confirmDelete = confirm('Do you want to Delete Item?');
                     if(confirmDelete == true)
                         deleteItem(vm.EOR,itemCode); 
                      
                }
                else
                {
                  unitQty = parseInt(unitQty)- 1
                }
              }
             
               if (keyEvent.which === 13 || keyEvent.which === 0 || keyEvent=='-1' || keyEvent =='1') // On Key Press ENTER or On Blur
               {   
                  updateUnitQuantity(itemCode,unitQty);
               }   
              }
              else
              {
                alert('Either Case Or Unit can be entered.');
              }
              
             }

        // Update Case quantity
        function updateCaseQuantity(itemCode,caseQty)
        {           
            var req = 
                      {
                         caseQuantity:caseQty,
                         ItemCode:itemCode,
                         CustomerId:localStorage['Cust_id'],
                         EOR:vm.EOR
                      } 
             requestManager.UpdateCaseQuantity(req).then(function(result) 
             {
                       vm.tempItemCode = '';
                       addItem();
                 
             });
        }

         // Update Unit Quantity
         function updateUnitQuantity(itemCode,unitQty)
        {
            
            var req = 
                      {
                         unitQuantity:unitQty,
                         ItemCode:itemCode,
                         CustomerId:vm.SelectedCustomer,
                         EOR:vm.EOR
                      } 
             requestManager.UpdateUnitQuantity(req).then(function(result) 
             {
                       vm.tempItemCode = '';
                       addItem();                 
             });
        }

        // Reset Order Screen data for New Order
        function resetOrderScreen()
        {
            vm.EOR = '';
            vm.orderItemData = '';
            vm.isPickup = false;
            $scope.ctDisabled = false; // Disable control on Pickup Check
            vm.CaseQty = '';
            vm.UnitQty = 0;       
            vm.SelectedPromotion = '';
            vm.SelectedDay = 0;
            vm.SelectedNotDay=0;
            vm.ClientPONumber='';
            vm.SelectedDay='0';
            vm.SelectedNotDay='0';
            vm.Message='';        
            vm.ExtraInfo = true;
            vm.AmountCollected='';
            vm.Comment='';
            vm.TemplateName='';
            $scope.EOR='';
            vm.IsRestricted=false;
            vm.selectedDepartmentValue = '1';
            vm.SelectedDepartment = '1';
            
            dateTimeCheck();
            changeBackgroundColorForPickup(); 
        }
       
        // Submit Order Detail
        function submitOrderData()
        {            
          
               var req = 
                      {                        
                         CustomerId:localStorage['Cust_id'],
                         CompanyId:'2',
                         BrokerId:vm.BrokerId,
                         CatalogId:"1",
                         day: vm.SelectedDay,                       
                         notDay: vm.SelectedNotDay,  
                         Comments:vm.Comment,
                         isPickUp:vm.isPickup,
                         EOR:vm.EOR,
                         AmountCollected:vm.AmountCollected,
                         isActive:'1',
                         totalCaseQuantity:$scope.getCaseQtyTotal,
                         totalAmount:'3',
                         DeliveryDate:vm.DeliveryDate,
                         ClientPONumber: vm.ClientPONumber,                      
                         productType: vm.SelectedPromotion,
                         templateName:vm.TemplateName,
                         totalUnitQuantity:$scope.getUnitQtyTotal(),

                      } ;

             requestManager.SubmitOrder(req).then(function(result) 
             {           
                           alert('Order ' + vm.EOR+' Submitted Successfully.'); 
                           resetOrderScreen();     
             });

        }

        // Delete Order Item
        function deleteItem(EOR,productCode)
        {   
            var req = 
                      {
                         ItemCode:productCode,
                         CustomerId:localStorage['Cust_id'],
                         EOR:EOR
                      } 
             requestManager.DeleteOrderItem(req).then(function(result) 
             {    
                   
                  vm.isDeleted = true;   
                  vm.DeletedItem =  productCode;  
                    vm.tempItemCode='';

                  if(vm.IsMobile)
                  {
                     document.getElementById("txtItemCodeMobile").focus();                     
                  }
                  else
                  {
                    document.getElementById("txtItemCode").focus();                   
                  }
                  addItem(); 
                  
                  vm.tempItemCode='';
             });
        }

          // Check for Quantity Validation before adding Item to Order  
        function checkQuantityValidation()
        { 
          if(vm.isPickup == false)  // Regular Order
          {
              if(vm.CaseQty < 1 && vm.CaseQty !=0)
              {
                 alert('Please enter valid quantity.');
                 return false;
              }
         }
         else
         {
             if(vm.CaseQty < 1  && vm.UnitQty < 1 && vm.CaseQty!=0 && vm.UnitQty !=0 )  // Pickup Order. Check for both Case and Unit Quantity
             {
                  alert('Please enter valid quantity.');
                 return false;
             }
             else if(vm.CaseQty > 0  && vm.UnitQty > 0)
              {
                 alert('Either Case Or Unit can be entered.');
                 return false;
              }
         }
          return true;
        }

       // Check Item Restricted
        function checkItemRestriction(ItemCode)
        {         
           // check Restricted Item
           
              
        }

        // Add Item to Order List
        function addItem()
        {    
            // checkItemRestriction(vm.tempItemCode);
             // document.getElementById("itemListTable").scrollIntoView();
               // check for customer Selected or Not
              
               if(localStorage['Cust_id']=='undefined' || localStorage['Cust_id']==null || localStorage['Cust_id'] =='')
               {
                     alert('Please select customer.');
                     return;
               }             

               // Check for ZERO quantity to Delete Item
               if(vm.CaseQty == 0 && vm.UnitQty == 0 && vm.ItemCode > 0)
               {
                    deleteItem(vm.EOR,vm.ItemCode); // delete Item
                    vm.ItemCode = '';
               }

               vm.ExtraInfo = false;  // Hide Extra Information

               var EOR = $scope.EOR;
 
                 // Check EOR 
                 if(vm.EOR=='undefined' || vm.EOR==null || vm.EOR =='')
                       vm.EOR = '';
                 else
                       vm.EOR = $scope.EOR;

                   if((vm.CaseQty=='undefined' || vm.CaseQty==null || vm.CaseQty =='') && vm.isPickup == false)
                      vm.CaseQty = 1;
                    else
                      vm.caseQty=0;

                   if(vm.UnitQty=='undefined' || vm.UnitQty==null || vm.UnitQty =='')
                      vm.UnitQty = 0;

                var Action;
                
               var ItemCodeLength = ''+vm.tempItemCode;

                if(ItemCodeLength.length > 4)
                      Action = 'UPC';
                else
                      Action = ''; 
              
               
          //   alert($scope.SelectedCustomer);
               //   if(vm.EOR=='')
                //        vm.EOR = localStorage['EORKEY'];
           


                 
               if($rootScope.online == true)
               {
                //console.log('req'+JSON.stringify(req));
                var checkIteCode = vm.tempItemCode;
                if(vm.tempItemCode=='')
                  checkIteCode = '0';

                
                   var req1 = 
                      {                        
                         CustomerId:localStorage['Cust_id'],
                         ItemCode:checkIteCode,
                         GoyaCompanyId:'01'
                        
                       };
              
                requestManager.checkRestrictedStockItem(req1).then(function(result1) 
                {   
                  
                   var QOH = parseInt(result1.Payload[0].ITEM_QOH);
                   var restrictedCheck = result1.Payload[0].ISAUTHORIZED;
                   var casePrice = result1.Payload[0].CASEPRICE;
                   var retailPrice = result1.Payload[0].RETAILERPRICE;
                   var unitForCasePrice = result1.Payload[0].PRICEUNIT;
                    console.log(result1);
                     if(restrictedCheck=='1')
                      {
                          vm.IsRestricted = false;
                      }
                      else
                      {
                          vm.IsRestricted = true;
                      }    

                   //  debugger;
                      var req = 
                      {
                         BrokerId: vm.BrokerId,
                         CustomerId:localStorage['Cust_id'],
                         OrderNumber:'',
                         Status: "0",
                         FromDate: "4/1/2015",
                         ToDate: "4/30/2016",
                         CompanyId: 2,
                         EOR: vm.EOR,
                         CaseQuantity: vm.CaseQty,
                         UnitQuantity: vm.UnitQty,
                         LanguageId: "en-US",
                         CatalogId: "1",
                         SearchText: "%%",
                         WarehouseId: "01",
                         BasketId: '',
                         Message: '',
                         Dept: vm.SelectedDepartment,
                         SalesManID: vm.BrokerId,
                         WHID: "01",
                         chkPickup: vm.isPickup,
                         isPickUp:vm.isPickup,
                         clientPONumber:vm.ClientPONumber,  
                         day: vm.SelectedDay,                       
                         notDay: vm.SelectedNotDay,    
                         deliveryDate:vm.DeliveryDate,  
                         promoCode:vm.SelectedPromotion, 
                         Action:Action,   
                         strCases:'1',   
                         Comments:vm.Comment, 
                         ItemCode:vm.tempItemCode, 
                         Result:'',   
                         Units:'1',
                         key:12,
                         AmountCollected:vm.AmountCollected,
                         isRestricted:vm.IsRestricted,
                         QOH:QOH,
                         CasePrice:casePrice,
                         RetailPrice:retailPrice,
                         UnitForCasePrice:unitForCasePrice
                }                  

                requestManager.AddItemToOrder(req).then(function(result) 
                {
                
                      if (result.Payload)
                      {                   
                         vm.orderItemData =  result.Payload;
                         vm.addCartItem1 = result.Payload;

                       
                        if(vm.orderItemData.length>0)
                             $scope.ctDisabled = true;
                         
                         // Get generated EOR 
                         $scope.EOR =  vm.orderItemData[0].PONumber;
                         var reqItem = {
                          eor:$scope.EOR,
                          case:$scope.getCaseQtyTotal()
                         }
                         setHeaderItem.setItems(reqItem);
                         localStorage['EORKEY'] = $scope.EOR;
                         vm.EOR = vm.orderItemData[0].PONumber;

                         vm.Message = vm.orderItemData[0].SuccessMessage;
                         $('#lblMessage').css("color", "green");
                         $('#lblMessage1').css("color", "green"); // Top Order Entry

                        // Unauthorized items and Item Stock check message in RED
                         if(vm.IsRestricted==true || QOH<1)
                         {
                           $('#lblMessage').css("color", "red");
                           $('#lblMessage1').css("color", "red"); // Top Order Entry

                            if(vm.isRestricted==true)
                                vm.Message = 'Restricted '+vm.orderItemData[0].SuccessMessage;
                            else
                                vm.Message = vm.orderItemData[0].SuccessMessage;                           
                         }
                         
                         // When Last Item is Deleted
                         if(vm.orderItemData[0].ProductCode=='-')
                         {
                           vm.orderItemData ='';
                           vm.Message = '';
                           vm.isDeleted = false;
                         }

                         
                      
                         if( vm.orderItemData.length>0)
                         {
                           if( vm.orderItemData[0].ISVALID=='NOT')
                           {
                              vm.Message = "Item Not Found."
                              $('#lblMessage').css("color", "red");
                              $('#lblMessage1').css("color", "red"); // Top Order Entry
                           }
                         }

                         if(vm.isDeleted == true)
                         {
                             $('#lblMessage').css("color", "red");
                             $('#lblMessage1').css("color", "red"); // Top Order Entry
                             vm.Message = "Item #" + vm.DeletedItem +" Deleted.";
                         }

                         // Reset Values 
                         vm.ItemCode = '';
                         vm.CaseQty = '';
                         vm.UnitQty = 0;
                         vm.isDeleted = false;
                         vm.IsRestricted = false;

                         //focus('ItemNo');    
                        vm.setItemCodeFocus = true;   

                        if(vm.IsMobile)
                        {
                           document.getElementById("txtItemCodeMobile").focus();                     
                        }
                        else
                        {
                          document.getElementById("txtItemCode").focus();                   
                        }

                      }
                   });
                 });
           }
           else
           {
                vm.dataa=req;
                checkItemDetails(req.ItemCode)
               
           }
        }

       /** Method start for add order item from indexdb**/
        
       /** Method end for add order item from indexdb**/

        function searchItem(){
          if($rootScope.online == false){
            FactoryIndexedDBLoad.getItemsData().then(function (result) {
            vm.searchIte = result;
            vm.addOrderItemData = [];
            });
          }
           
        }
        searchItem();

        function checkItemDetails(item){ 
            var setR = _.filter(vm.searchIte,function(items,index) {
              return item == items.ProductCode
            })
            if(setR.length){
               //console.log(JSON.stringify(setR));
               vm.dataa.ItemCode = setR[0].ProductCode;
               setAddOrderDataIndex(vm.dataa,setR);
            }
          
        }
   
        function setAddOrderDataIndex(addOderData,setR){
               var AddOderData= addOderData;
               //var new_Key = parseInt(localStorage['EORKEY']);
                
               vm.addOrderItemData.push({Dept:vm.SelectedDepartment,ProductCode:setR[0].ProductCode,DisplayName:setR[0].Name,Quantity:vm.CaseQty,CustomerId:addOderData.CustomerId})
               vm.orderItemData= vm.addOrderItemData;
               AddOderData.EOR=vm.newEor;
               
                //console.log('filterData** '+JSON.stringify(addFiltr));

              

              
               //console.log('final data '+JSON.stringify(AddOderData));

               
               FactoryIndexedDBLoad.createAddOrderIndexDB(AddOderData);
               }
          // Add Item on Item texbox ENTER click
        $scope.addItem = function(keyEvent,check) 
        {  
          
              if (keyEvent.which === 13)
              {    // Add Item on ENTER click
                  vm.tempItemCode = vm.ItemCode;
                  vm.ItemCode = '';
                 
                      
                  if(check=='m')
                  {
                     document.getElementById("txtItemCodeMobile").focus();
                     vm.IsMobile = true;
                  }
                  else
                  {
                    document.getElementById("txtItemCode").focus();
                    vm.IsMobile=false;
                  }
                   
                   // Check for Quantity Validation
                   var check = checkQuantityValidation();
                      if (check)                     
                          addItem();                   
               }
               else
               {
               
                 // Move focus to Case Quantity if Item code lenght  > 4        
                 var ItemCodeLength = vm.ItemCode.length;

             // if(vm.iOS==true)         
             //     ItemCodeLength = ItemCodeLength - 1;      


                  if(vm.isScan == false && ItemCodeLength==4)
                  {    
                     if(check=='m')
                     {      
                         // document.getElementById("txtCaseQtyMobile").select();

                         document.getElementById("txtCaseQtyMobile").focus();
                            $('input[type="number"]').on('focus',function(){
                                 document.getElementById("txtCaseQtyMobile").selectionStart = 0;
                                 document.getElementById("txtCaseQtyMobile").selectionEnd = 9999;                                 
                           })
                      
                     }
                     else
                     {
                      
                      // document.getElementById("txtCaseQtyDesktop").select();

                       document.getElementById("txtCaseQtyDesktop").focus();
                         $('input[type="number"]').on('focus',function(){
                                 
                                  document.getElementById("txtCaseQtyDesktop").selectionStart = 0;
                                 document.getElementById("txtCaseQtyDesktop").selectionEnd = 9999;
                          })
                        
                         
                           //   $('txtCaseQtyDesktop').get(0).selectionStart=0;
                            //      $('txtCaseQtyDesktop').get(0).selectionEnd=9999;
                     }

                  }
               }
           }

          // By Pass Customer. Check for the validity of customer for entered Customer ID
           $scope.validateCustomer = function(keyEvent)
           {
               var customerID = prompt("Please Enter Customer ID.");

                var req = 
                      {
                          
                         CustomerId:customerID,
                         CompanyId:2
                      } 
             requestManager.validateCustomerById(req).then(function(result) 
             {
                 
                 console.log(result.Payload);
                 if(result.Payload[0].UserID!='-' && result.Payload[0].Name!='-' )
                 {
                   vm.selectedCustomerValue = customerID;
                   vm.SelectedCustomer =  {"Name":customerID+'-'+ result.Payload[0].Name};
                    localStorage['Cust_id'] = customerID;
                    localStorage['Cust_Name'] = result.Payload[0].Name;
                    vm.CustomerName=  customerID+'-'+result.Payload[0].Name;
                 }
                  else
                  {
                    alert('Please enter valid Custoer ID.');
                  }
             });

           }


         $scope.btnAddItem = function(keyEvent)
         {
                 vm.tempItemCode = vm.ItemCode;
                 vm.ItemCode = '';
                   // Check for Quantity Validation
                  var check = checkQuantityValidation();
                
                  if(keyEvent=='m')
                  {
                     document.getElementById("txtItemCodeMobile").focus();
                     vm.IsMobile = true;
                  }
                  else
                  {
                    document.getElementById("txtItemCode").focus();
                    vm.IsMobile = false;
                  }

                  if (check)                     
                      addItem();                   
         }


            // get Case Price Total
           $scope.getCasePriceTotal = function ()
           {
              var casePriceTotal = 0;
              for(var i = 0; i<vm.orderItemData.length;i++)
              {
                 casePriceTotal += parseFloat(vm.orderItemData[i].CasePrice*vm.orderItemData[i].Quantity);
              }

             
              return casePriceTotal.toFixed(2);
           }


           // get Case Quantity Total
           $scope.getCaseQtyTotal = function ()
           {
              var caseTotal = 0;
              for(var i = 0; i<vm.orderItemData.length;i++)
              {
                 caseTotal += parseInt(vm.orderItemData[i].Quantity);
              }

             
              return caseTotal;
           }


            // get Unit Quantity Total
           $scope.getUnitQtyTotal = function ()
           {

              var unitTotal = 0;
              for(var i = 0; i<vm.orderItemData.length;i++)
              {
                 unitTotal += parseInt(vm.orderItemData[i].OrdUnits);
              }
              return unitTotal;
           }

           // Check Day & Not Day value for Same Selection
           vm.checkDaySelection = function  (Day) 
           {                   
             if(vm.SelectedDay == vm.SelectedNotDay && vm.SelectedDay!=0)
             {
                if(Day == '1')
                   vm.SelectedDay='0';
                 else
                   vm.SelectedNotDay='0';
                       
                alert('Day and Not Day can not be Same.');
             }
             else
             {
                 dateTimeCheck(); // Set Date based on Day Selected
             }
           }

          // Delete All Order Items
           vm.DeleteAllItems = function ()
           {
              if( vm.orderItemData.length>0)
              {
              var confirmDeleteAll = confirm('Are you sure want to Delete All Items?');
                
               if(confirmDeleteAll == true)
               {
                var req = 
                {                      
                         CustomerId:localStorage['Cust_id'],
                         EOR:vm.EOR
                } 
              requestManager.DeleteAllItem(req).then(function(result) 
              {               
                    vm.Message = "All Items Deleted.";
                    vm.tempItemCode='';
                   // addItem(); 
                   vm.orderItemData='';

              });
            }
            else
              {
                return false;
              }
           }
         }

        function  getSearchDataFromIndexDbData() {
            //debugger;
            $rootScope.isLoading = true;  
            if($rootScope.online == false){
               localStorage.removeItem('Cust_Name');
               localStorage.removeItem('Cust_id');
               vm.SelectedCustomer = {
                "Name": "",
                "id": ""
                }  
               FactoryIndexedDBLoad.getItemsData().then(function (result) {
               $rootScope.isLoading = false;
               vm.searchVal=result;
                }); 
            }
            
            
        }
        getSearchDataFromIndexDbData();

        $(function()
        {
  
               
        });

    }

    OrderAddController.$inject=['$rootScope','requestManager','$state','checkAuthorization','$scope','$location','$filter','FactoryIndexedDBLoad','$window','$interval','setHeaderItem','checkBrowserDetails'];

    return OrderAddController;
});
