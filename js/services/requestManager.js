define([], function(app) {
    'use strict';

    function factoryFunc(connectionManager,$rootScope) {
        var conn = connectionManager;
        var apiKey;
        var method;
         
        return {

            CommonHomePageNews: function(data) {
                apiKey = "api/CommonHomePageNews";
                method = "GET";
                var request = {
                    domain: "CommonHomePageNews",
                    event: "CommonHomePageNews",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);},

                        MenuName: function(data) {
               
                apiKey = "api/MenuName";
                method = "GET";
                var request = {
                    domain: "MenuName",
                    event: "MenuName",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            Language: function(data) {
               
                apiKey = "api/Language";
                method = "GET";
                var request = {
                    domain: "Language",
                    event: "Language",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            signupRequest: function(data) {
               
                apiKey = "api/Register";
                method = "POST";
                var request = {
                    domain: "signup",
                    event: "signupEvent",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            loginRequest: function(data) {
                apiKey = "OMSWebApiUAT/api/user";
                var method = "POST";
                var request = {
                    domain: "login",
                    event: "loginEvent",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            permissionRequest: function(data) {
                apiKey = "OMSWebApiUAT/api/UserAuthorizationForUser"+'/'+data.userId+'/'+data.appId;
                var method = "GET";
                var request = {
                    domain: "permission",
                    event: "permission",
                    requestApi: apiKey
                };
                return conn.sendRequest(request, method);
            },
            insertSalesCommunicatorData: function(data) {
                apiKey = "OMSWebApiUAT/api/Communicator/insertSalesCommunicatorData";
                var method = "POST";
                var request = {
                    domain: "salesCommunicator",
                    event: "salesCommunicator",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            editSalesCommunicatorData: function(data) {
                apiKey = "OMSWebApiUAT/api/Communicator/editSalesCommunicatorData";
                var method = "POST";
                var request = {
                    domain: "salesCommunicator",
                    event: "salesCommunicator",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            deleteSalesCommunicatorData: function(data) {
                apiKey = "OMSWebApiUAT/api/Communicator/deleteSalesCommunicatorData";
                var method = "POST";
                var request = {
                    domain: "salesCommunicator",
                    event: "salesCommunicator",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            sendFileData: function(data) {
                apiKey = "OMSWebApiUAT/api/Communicator/sendFileData";
                var method = "POST";
                var request = {
                    domain: "sendUploadData",
                    event: "sendUploadData",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            sendUserTackingData: function(data) {
                apiKey = "OMSWebApiUAT/api/UserStats/insertUserActivity";
                var method = "POST";
                var request = {
                    domain: "sendTrackData",
                    event: "sendTrackData",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
              permissionRequestPost: function(data) {
                apiKey = "OMSWebApiUAT/api/UserAuthorizationForUserPost";
                var method = "POST";
                var request = {
                    domain: "permission",
                    event: "permission",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
             getEOR: function(data) {
                console.log('user data*: '+JSON.stringify(data));
                apiKey = "OMSWebApiUAT/api/Order/getLastEOR";
                var method = "POST";
                var request = {
                    domain: "EORnumber",
                    event: "EORnumber",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            userProfile: function(data) {
                apiKey = "OMSWebApiUAT/api/user";
                var method = "GET";
                var request = {
                    domain: "userProfile",
                    event: "userEvent",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            logOut: function(data) {
                
                apiKey = "api/Logout";
                method = "POST";
                var request = {
                    domain: "logout",
                    event: "logout",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            changePassword: function(data) {
                
                apiKey = "OMSWebApiUAT/api/Account/ChangePassword";
                method = "POST";
                var request = {
                    domain: "changePassword",
                    event: "changePassword",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            setPassword: function(data) {
                
                apiKey = "api/SetPassword";
                method = "POST";
                var request = {
                    domain: "setPassword",
                    event: "setPassword",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            forgetPassword: function(data) {
                
                apiKey = "OMSWebApiUAT/api/Account/ForgetPasswordEmail";
                method = "POST";
                var request = {
                    domain: "forgetPassword",
                    event: "forgetPassword",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            // Customer Request Start
            customerDetail: function(data) {
               
                apiKey = "OMSWebApiUAT/api/Customer/CustomersDetailList/013030";
                var method = "GET";
                var request = {
                    domain: "CustomerDetailsList",
                    event: "CustomerDetailsList",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
             // Customer Request Start POST 
            customerDetailPost: function(data) 
            {               
                apiKey = "OMSWebApiUAT/api/Customer/CustomersDetailListPost";
                var method = "POST";
                var request = {
                    domain: "CustomerDetailsList",
                    event: "CustomerDetailsList",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            searchOrder: function  (data) {
                apiKey = "OMSWebApiUAT/api/OrderHistory/GetOrderHistory";
                var method = "POST";
                var request = {
                    domain: "SearchOrderList",
                    event: "SearchOrderList",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            deleteOrder: function  (data) {
                apiKey = "OMSWebApiUAT/api/OrderHistory/DeleteOrder";
                var method = "POST";
                var request = {
                    domain: "deleteOrder",
                    event: "deleteOrder",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            getOrderStat: function  (data) {
                apiKey = "OMSWebApiUAT/api/OrderHistory/GetAllOrderStatus";
                var method = "GET";
                var request = {
                    domain: "order status",
                    event: "order status",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },

            getOrderStatPost: function  (data) {
                apiKey = "OMSWebApiUAT/api/OrderHistory/GetAllOrderStatusPost";
                var method = "POST";
                var request = {
                    domain: "order status",
                    event: "order status",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            customerMoreDetail: function(data) {
                apiKey = "OMSWebApiUAT/api/Customer/CustomersDetailByCustomerId/" + data.userId + '/' + data.companyId;
                var method = "GET";
                var request = {
                    domain: "CustomerMoreDetailsList",
                    event: "CustomerMoreDetailsList",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },

            customerMoreDetailPost: function(data) {
                apiKey = "OMSWebApiUAT/api/Customer/CustomersDetailByCustomerIdPost";
                var method = "POST";
                var request = {
                    domain: "CustomerMoreDetailsList",
                    event: "CustomerMoreDetailsList",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            // Quick Order Request Start
            CustomerListByBrokerId: function(data) {
               
                apiKey = "api/Order/CustomerListByBrokerId";
                method = "GET";
                var request = {
                    domain: "CustomerListByBrokerId",
                    event: "CustomerListByBrokerId",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            DepartmentByCompanyId: function(data) {
               
                apiKey = "api/Order/DepartmentByCompanyId";
                method = "GET";
                var request = {
                    domain: "DepartmentByCompanyId",
                    event: "DepartmentByCompanyId",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            PromoCodeByCompanyId: function(data) {
               
                apiKey = "api/Order/PromoCodeByCompanyId";
                method = "GET";
                var request = {
                    domain: "PromoCodeByCompanyId",
                    event: "PromoCodeByCompanyId",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            LoadOrderTemplate: function(data) {
               
                apiKey = "api/Order/LoadOrderTemplate";
                method = "GET";
                var request = {
                    domain: "LoadOrderTemplate",
                    event: "LoadOrderTemplate",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            LoadOrderTemplateItem: function(data) {
               
                apiKey = "api/Order/LoadOrderTemplateItem";
                method = "GET";
                var request = {
                    domain: "LoadOrderTemplateItem",
                    event: "LoadOrderTemplateItem",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            ItemDataByEOR: function(data) {
               
                apiKey = "api/Order/ItemDataByEOR";
                method = "GET";
                var request = {
                    domain: "ItemDataByEOR",
                    event: "ItemDataByEOR",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            OpenOrder: function(data) {
               
                apiKey = "api/Order/OpenOrder";
                method = "GET";
                var request = {
                    domain: "OpenOrder",
                    event: "OpenOrder",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            InsertPendingOrderItems: function(data) {
               
                apiKey = "api/Order/InsertPendingOrderItems";
                method = "POST";
                var request = {
                    domain: "InsertPendingOrderItems",
                    event: "InsertPendingOrderItems",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            EditOrderItemQty: function(data) {
               
                apiKey = "api/Order/EditOrderItemQty";
                method = "POST";
                var request = {
                    domain: "EditOrderItemQty",
                    event: "EditOrderItemQty",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            EditOrderItemUnitQty: function(data) {
               
                apiKey = "api/Order/EditOrderItemUnitQty";
                method = "POST";
                var request = {
                    domain: "EditOrderItemUnitQty",
                    event: "EditOrderItemUnitQty",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
           
            DeleteOrderTemplate: function(data) {
               
                apiKey = "api/Order/DeleteOrderTemplate";
                method = "POST";
                var request = {
                    domain: "DeleteOrderTemplate",
                    event: "DeleteOrderTemplate",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            // Order History Request Start
            OrderList   : function(data) {
               
                apiKey = "OmsStaticWebApi/api/Order/OrderList";
                method = "GET";
                var request = {
                    domain: "OrderList",
                    event: "OrderList",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            OrderStatus: function(data) {
               
                apiKey = "OmsStaticWebApi/api/Order/OrderStatus";
                method = "GET";
                var request = {
                    domain: "OrderStatus",
                    event: "OrderStatus",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            OrderType: function(data) {
               
                apiKey = "OmsStaticWebApi/api/Order/OrderType";
                method = "GET";
                var request = {
                    domain: "OrderType",
                    event: "OrderType",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            OrderByDays: function(data) {
               
                apiKey = "api/Order/OrderByDays/id";
                method = "GET";
                var request = {
                    domain: "OrderByDays",
                    event: "OrderByDays",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            OrderByFilter: function(data) {
               
                apiKey = "api/Order/OrderByFilter";
                method = "GET";
                var request = {
                    domain: "OrderByFilter",
                    event: "OrderByFilter",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            DeletePandingOrder: function(data) {
               
                apiKey = "api/Order/DeletePandingOrder";
                method = "POST";
                var request = {
                    domain: "DeletePandingOrder",
                    event: "DeletePandingOrder",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            EditDeletePandingOrder: function(data) {
               
                apiKey = "api/Order/EditDeletePandingOrder";
                method = "POST";
                var request = {
                    domain: "EditDeletePandingOrder",
                    event: "EditDeletePandingOrder",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            CopyOrderDataByBasketId: function(data) {
               
                apiKey = "api/Order/CopyOrderDataByBasketId";
                method = "GET";
                var request = {
                    domain: "CopyOrderDataByBasketId",
                    event: "CopyOrderDataByBasketId",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            InsertOrderData : function(data) {
               
                apiKey = "api/Order/InsertOrderData";
                method = "POST";
                var request = {
                    domain: "InsertOrderData",
                    event: "InsertOrderData",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
    // Search Item Request start
            ItemList: function(data) {
                apiKey = "OMSWebApiUAT/api/Search/SearchLoad";
                method = "POST";
                var request = {
                    domain: "ItemList",
                    event: "ItemList",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            ItemByName: function(data) {
               
                apiKey = "api/Search/ItemByName";
                method = "GET";
                var request = {
                    domain: "ItemByName",
                    event: "ItemByName",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            ItemListByCategory: function(data) {
               
                apiKey = "api/Search/ItemListByCategory";
                method = "GET";
                var request = {
                    domain: "ItemListByCategory",
                    event: "ItemListByCategory",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            ItemListBySubCategory: function(data) {
               
                apiKey = "api/Search/ItemListBySubCategory";
                method = "GET";
                var request = {
                    domain: "ItemListBySubCategory",
                    event: "ItemListBySubCategory",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            TotalCartNo: function(data) {
               
                apiKey = "api/Search/TotalCartNo";
                method = "GET";
                var request = {
                    domain: "TotalCartNo",
                    event: "TotalCartNo",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            AddItemToCart: function(data) {
               
                apiKey = "api/Search/AddItemToCart";
                method = "POST";
                var request = {
                    domain: "AddItemToCart",
                    event: "AddItemToCart",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
			
              AddItemToOrder: function(data) 
              {
               
                apiKey = "OMSWebApiUAT/api/Order/getOrderItemList";
                method = "POST";
                var request = 
                {
                    domain: "getOrderItemList",
                    event: "getOrderItemList",
                    requestApi: apiKey,
                    payload: data
                };
                console.log(request);
                return conn.sendRequest(request, method);

            },

        /*     indexDBAddItemToOrder: function(data) 
              {
               
                apiKey = "OMSWebApiUAT/api/Order/getOrderItemList";
                method = "POST";
                var request = 
                {
                    domain: "getOrderItemList",
                    event: "getOrderItemList",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);

            },*/

             // Get Department Data
              GetDepartments: function(data) 
              {
               
                apiKey = "OMSWebApiUAT/api/order/getDepartments";
                method = "GET";
                var request = 
                {
                    domain: "getDepartments",
                    event: "getDepartments",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);

            },
              GetDepartmentsPost: function(data) 
              {
               
                apiKey = "OMSWebApiUAT/api/order/getDepartmentsPost";
                method = "POST";
                var request = 
                {
                    domain: "getDepartments",
                    event: "getDepartments",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);

            },


             // Get Promotion Data
              GetPromotionDetails: function(data) 
              {
               
                apiKey = "OMSWebApiUAT/api/order/getPromoCode";
                method = "GET";
                var request = 
                {
                    domain: "getPromoCode",
                    event: "getPromoCode",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);

            },


                       // Get Promotion Data
              GetPromotionDetailsPost: function(data) 
              {
               
                apiKey = "OMSWebApiUAT/api/order/getPromoCodePost";
                method = "POST";
                var request = 
                {
                    domain: "getPromoCode",
                    event: "getPromoCode",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);

            },

               // Delete Order Item
              DeleteOrderItem: function(data) 
              {
               
                apiKey = "OMSWebApiUAT/api/Order/deleteOrderItem";
                method = "POST";
                var request = 
                {
                    domain: "deleteOrderItem",
                    event: "deleteOrderItem",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);

            },

             // Submit Order Data
              SubmitOrder: function(data) 
              {
               
                apiKey = "OMSWebApiUAT/api/Order/submitOrder";
                method = "POST";
                var request = 
                {
                    domain: "submitOrder",
                    event: "submitOrder",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);

            },

            // Update Case Quantity
            UpdateCaseQuantity: function(data) 
            {
               
                apiKey = "OMSWebApiUAT/api/Order/updateItemCaseQuantity";
                method = "POST";
                var request = 
                {
                    domain: "updateItemCaseQuantity",
                    event: "updateItemCaseQuantity",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);

            },

            // Update Case Quantity
            UpdateUnitQuantity: function(data) 
            {
               
                apiKey = "OMSWebApiUAT/api/Order/updateItemUnitQuantity";
                method = "POST";
                var request = 
                {
                    domain: "updateItemUnitQuantity",
                    event: "updateItemUnitQuantity",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);

            },

            // Update Case Quantity
            GetTemplateDetails: function(data) 
            {
               
                apiKey = "OMSWebApiUAT/api/Order/loadTemplate/";
                method = "POST";
                var request = 
                {
                    domain: "loadTemplate",
                    event: "loadTemplate",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);

            },

             // Update Case Quantity
            CreateOrderFromTemplate: function(data) 
            {
               
                apiKey = "OMSWebApiUAT/api/Order/CreateOrderFromTemplate/";
                method = "POST";
                var request = 
                {
                    domain: "CreateOrderFromTemplate",
                    event: "CreateOrderFromTemplate",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },

             GetOrderHeaderDetails: function(data) 
            {
               
                apiKey = "OMSWebApiUAT/api/Order/getOrderHeaderDetails/";
                method = "POST";
                var request = 
                {
                    domain: "getOrderHeaderDetails",
                    event: "getOrderHeaderDetails",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
             DeleteAllItem: function(data) 
             {
               
                apiKey = "OMSWebApiUAT/api/Order/deleteAllOrderItems/";
                method = "POST";
                var request = {
                    domain: "DeleteAllItem",
                    event: "DeleteAllItem",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
             GetPendingOrderCountByCustomerId: function(data) 
             {
               
                apiKey = "OMSWebApiUAT/api/Order/getPendingOrderCountByCustomerId/";
                method = "POST";
                var request = {
                    domain: "GetPendingOrderCountByCustomerId",
                    event: "GetPendingOrderCountByCustomerId",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },

            GetOrderPreview: function(data) 
             {
               
                apiKey = "OMSWebApiUAT/api/OrderHistory/GetOrderPreview/";
                method = "POST";
                var request = {
                    domain: "GetOrderPreview",
                    event: "GetOrderPreview",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);
            },
            salesCommunicator: function(data)
            {
                apiKey = "OMSWebApiUAT/api/Communicator/getSalesCommunicatorData";
                method = "POST";
                var request = {
                    domain: "GetSalesCommunicator",
                    event: "SalesCommunicator",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);   
            },
             validateCustomerById: function(data)
            {
                apiKey = "OMSWebApiUAT/api/Customer/ValidateCustomerByID";
                method = "POST";
                var request = {
                    domain: "validateCustomerById",
                    event: "validateCustomerById",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);   
            },
			// Check the Restricted Item by Customer ID and Item Code
            checkRestrictedItem: function(data)
            {
                apiKey = "isauthorized/01/"+data.CustomerId+'/'+data.ItemCode;    //000180/1105";
                method = "GET";
                var request = {
                    domain: "GoyaAPI",
                    event: "validateCustomerById",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);   
            },
            getOutOfStockItemList: function(data)
            {
                apiKey = "OMSWebApiUAT/api/Search/getOutOfStockItemList";    
                method = "POST";
                var request = {
                    domain: "getOutOfStockItemList",
                    event: "getOutOfStockItemList",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);   
            },

             getBrokerListByAdmingBroker: function(data)
            {
                apiKey = "OMSWebApiUAT/api/Customer/GetBrokerListByAdminBroker";    
                method = "POST";
                var request = {
                    domain: "getBrokerListByAdmingBroker",
                    event: "getBrokerListByAdmingBroker",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);   
            },
            // Check Restricted Item + Item Stock
             checkRestrictedStockItem: function(data)
            {
                apiKey = "OMSWebApiUAT/api/Order/getItemQOH/"; 
                method = "POST";
                var request = {
                    domain: "getItemQOH",
                    event: "getItemQOH",
                    requestApi: apiKey,
                    payload: data
                };
                return conn.sendRequest(request, method);   
            },

           
			
        }
    }

    factoryFunc.$inject = ['connectionManager'];

    return factoryFunc;
});