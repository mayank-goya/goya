define([], function(app){
    'use strict';
  function OrderPreviewController(requestManager)
   {
      
       return {
        restrict: 'E',
        replace: true,
        scope: {
            mobDetails:"="
        },
     
        templateUrl: 'html/pages/customer-info.html',
        link: function ($scope,$rootScope) 
        {
            $scope.brokerName = localStorage['userName'];             
            $scope.Action = '';
            $scope.PONumber='';
            $scope.TotalOrderQty = 0;
            $scope.isPickUp = false;
            $scope.DeliveryDate='';
            $scope.totalCasePrice = 0;
            
             $scope.setPreview = function () {              
               var modal_height = $('.item-dtlnew').height()*$scope.tot*3+500;
               var printStyle  = $('#print');
               var style = '@media print { body{ visibility: hidden !important; page-break-after:always; } .amm{ visibility: hidden !important; } .visible-area { visibility: visible !important; width:100% !important} .modal{ position: absolute !important; top: -20px !important; height:'+modal_height+'px !important; } .new-modal{ margin-top:0px !important; padding-top: 1px; } .over-nww{ width: 50% !important; } .print_r{ display: none; }.cart-fxt{margin-top:0px !important;} }}}';
               printStyle.text(style);             
               window.print();
             } 
       
            // Submit Order Data
            $scope.submitOrder = function()
            {
              var submitConfirm;
              submitConfirm = confirm("Are you sure want to Submit order?")   
              if(submitConfirm)
                   submitOrderData();
            }

        // Submit Order Detail
        function submitOrderData()
        {            
       // debugger;
               var req = 
                      {                        
                         CustomerId:$scope.OrderPreview[0].CustomerID,
                         CompanyId:'2',
                         BrokerId:$scope.OrderPreview[0].SalesmanID,
                         CatalogId:"1",
                         day: $scope.OrderPreview[0].OrderDay,                       
                         notDay: $scope.OrderPreview[0].NotDay,  
                         Comments:$scope.OrderPreview[0].Comments,
                         isPickUp:$scope.isPickUp,
                         EOR:$scope.OrderPreview[0].PONumber,
                         AmountCollected:$scope.OrderPreview[0].ActualAmount,
                         isActive:'1',
                         totalCaseQuantity:$scope.TotalOrderQty,
                         totalAmount:'3',
                         DeliveryDate:$scope.OrderPreview[0].DeliveryDate,
                         ClientPONumber:$scope.OrderPreview[0].ClientPONumber,                      
                         productType: '',// need to fixed .... $scope.OrderPreview[0].'',
                         templateName:'',
                         totalUnitQuantity:$scope.TotalUnitsQty,

                      } ;

             requestManager.SubmitOrder(req).then(function(result) 
             {           
                            $scope.mobDet.StatusText = "Submitted";
                           alert('Order ' + $scope.OrderPreview[0].PONumber+' Submitted Successfully!'); 
                         

                           //resetOrderScreen();     
             });

        }

           $scope.$watch('mobDetails',function () 
           {
            //debugger;
            if($scope.mobDetails){
              console.log('show mob details'+JSON.stringify($scope.mobDetails));
              if($scope.mobDetails.Pickup == "true")
              {
                $scope.mobDet = $scope.mobDetails;
                $scope.pickup = 'Pickup';
                $scope.isPickUp = true;

              }else
              {
                $scope.mobDet = $scope.mobDetails;
                $scope.pickup = 'Regular';
                $scope.isPickUp = false;
              } 
              console.log('customerDetail Payload: ' + JSON.stringify($scope.mobDet));

              if($scope.mobDet.BasketID !='')
              {
                 $scope.PONumber = $scope.mobDet.BasketID;
                 $scope.Action='B';
              }
              else
              {
                 $scope.PONumber = $scope.mobDet.PONumber;
                 $scope.Action='P';
              }
   
               var req = 
               {
                    BasketId:$scope.PONumber,
                    CompanyId:'2',                                     
                    Action:$scope.Action
                } 
           $rootScope.isLoading = true;
           $scope.totalCasePrice = 0;
            requestManager.GetOrderPreview(req).then(function(result) 
            {                         
                $rootScope.isLoading = false;  
                if (result.Payload) 
                {     
                    $scope.tot = result.Payload.length; 
                          
                   $scope.OrderPreview = result.Payload;

                    console.log(JSON.stringify($scope.OrderPreview)); 
                   // Order Header Details console.log($scope.tot)  
                   $scope.TotalOrderQty = result.Payload[0].TotalOrderQty;
                   for(var i = 0;i<$scope.OrderPreview.length;i++){
                    $scope.totalCasePrice = $scope.totalCasePrice+parseFloat(result.Payload[i].CasePrice);

                   }
                   if($scope.isPickUp)
                      $scope.TotalUnitsQty = result.Payload[0].TotalUnitsQty;
                    else
                      $scope.TotalUnitsQty = '';
                    
                   $scope.Address = result.Payload[0].Street +","+result.Payload[0].City+","+result.Payload[0].State+","+result.Payload[0].Zip;
                   $scope.PhoneNo = result.Payload[0].ContactNo;
                   $scope.Comments = result.Payload[0].Comments;
                   $scope.DeliveryDate = result.Payload[0].DeliveryDate;
                   $scope.ClientPONumber = result.Payload[0].ClientPONumber;
                   $scope.PromoName = result.Payload[0].PromoName;
                   $scope.OrderDay = result.Payload[0].OrderDay;
                   $scope.NotDay = result.Payload[0].NotDay;
                   $scope.PromoName = result.Payload[0].PromoName;
                   $scope.ActualAmount = result.Payload[0].ActualAmount;

                   if($scope.ActualAmount=='')
                        $scope.ActualAmount='0';


                    
                   //  console.log('customerDetail Payload: ' + JSON.stringify($scope.OrderPreview));
                }
            });
            /////////////////////////////


            }
           })
             

           
      }
      
            
        }

      };
     


    OrderPreviewController.$inject=['requestManager'];

    return OrderPreviewController;
 
});



