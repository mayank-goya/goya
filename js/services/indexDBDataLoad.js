define([], function(app) {
    'use strict';

    function FactoryIndexedDBLoad($q, $rootScope,$window) {
        
        var cust_list = [];
        var per_list = [];
        var search_list = [];
        var dept = [];
        var orderData = [];
        var db = null;
        var dd;
        
        return {
            createIndexDB: function(cust_data, search_data,per,detp) {

                var indexedDB = $window.indexedDB;
                var request =  indexedDB.open("GOYAOMS",4);
                indexedDB =  indexedDB ||  mozIndexedDB || webkitIndexedDB ||  msIndexedDB;

                //prefixes of window.IDB objects
                window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
                window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

                if (!indexedDB) {
                    //console.log("Your browser doesn't support a stable version of IndexedDB.")
                }


             /*   var DBDeleteRequest = indexedDB.deleteDatabase("GOYAOMS");
                 var DBDeleteRequest = indexedDB.deleteDatabase("GOYAOMSORDER");
                DBDeleteRequest.onerror = function(event) {
                  console.log("Error deleting database.");
                };
                 
                DBDeleteRequest.onsuccess = function(event) {
                  console.log("Database deleted successfully");
                    
                  //console.log(request.result); // should be null
                }; */    
                request.onerror = function(event) 
                {
                    //console.log("error: ");
                };

                request.onsuccess = function(event) {
                    db = request.result;

                };

                request.onupgradeneeded = function(event)
                {
                  
                    db = event.target.result;
                    event.target.transaction.onerror = indexedDB.onerror;

                    var objectStore = db.createObjectStore("customer", {
                        keyPath: "UserID"
                    });
                    var objectStore1 = db.createObjectStore("search", {
                        keyPath: "ProductCode"
                    });
                    var objectStore2 = db.createObjectStore("permission", {
                        keyPath: "AccessId"
                    });
                    var objectStore3 = db.createObjectStore("Dept", {
                        keyPath: "DepartmentCode"
                    });
                    for (var i in cust_data) {
                        objectStore.add(cust_data[i]);
                    }
                    for (var j in search_data) {
                        objectStore1.add(search_data[j]);
                    }
                    for (var k in per) {
                        objectStore2.add(per[k]);
                    }
                    for (var l in detp) {
                        objectStore3.add(detp[l]);
                    }
                }
              
            }, 
              

           addOrderIndexdb:function () {
               var indexedDB = $window.indexedDB;
                var request =  indexedDB.open("GOYAOMSORDER",10);
                indexedDB =  indexedDB ||  mozIndexedDB || webkitIndexedDB ||  msIndexedDB;
                window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
                window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
           
              request.onerror = function(event) 
                {
                    //console.log("error: ");
                };

                request.onsuccess = function(event) {
                    db = request.result;
                    
                };
           
                request.onupgradeneeded = function(event)
                {
                    //console.log("enetr: ggg");

                    db = event.target.result;
                    var objectStore4 = db.createObjectStore("AddOrderData", {keyPath: 'id', autoIncrement:true });         
                }
           },


         createAddOrderIndexDB:function(data) {
           //console.log('luke')
                var indexedDB = $window.indexedDB;
                    var request =  indexedDB.open("GOYAOMSORDER");
                
                
                indexedDB =  indexedDB ||  mozIndexedDB || webkitIndexedDB ||  msIndexedDB;
                window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
                window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
               /* var DBDeleteRequest = indexedDB.deleteDatabase("GOYAOMSORDER");
                DBDeleteRequest.onerror = function(event) {
                  console.log("Error deleting database.");
                };
                 
                DBDeleteRequest.onsuccess = function(event) {
                  console.log("Database deleted successfully");
                    
                  //console.log(request.result); // should be null
                };*/
                request.onerror = function(event) 
                {
                   // console.log("error: ");
                };

                request.onsuccess = function(event) {
                    console.log('luke')
                    db = request.result;
                    addii(db)
                };
           
               function addii(db){
                    var trans1 = db.transaction("AddOrderData", "readwrite").objectStore('AddOrderData');
                   
                        trans1.put(data);
                    
                      
               }
                   
                    //var objectStore4 = db.createObjectStore("AddOrderData", {keyPath: 'CustomerId', unique: false});         
                   // var objectStoreRequest = objectStore4.add(data);
                
                
           },

            getCustDbIndexData: function() {
                
                var indexedDB = $window.indexedDB;
                var request = window.indexedDB.open("GOYAOMS", 21);
                var defered = $q.defer();
                //console.log('ff')
                request.onerror = function(event) {
                    //console.log('err')
                };
                request.onsuccess = function(event) {
                    db = request.result;
                    //console.log(db)
                };
                setTimeout(function() {
                    var objectStore = db.transaction("customer").objectStore("customer");
                    objectStore.openCursor().onsuccess = function(event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            cust_list.push(cursor.value)
                            cursor.continue();
                        } else {
                            return defered.resolve(cust_list);
                        }
                    };
                    
                }, 2000)
                return defered.promise;
            },
            getPermissionIndexDb: function () {
                   var indexedDB = $window.indexedDB;
                var request = window.indexedDB.open("GOYAOMS", 35);
                var defered = $q.defer();
                request.onerror = function(event) {
                    //console.log("error: ");
                };
                request.onsuccess = function(event) {
                    db = request.result;
                };
            setTimeout(function() {
              var objectStore1 = db.transaction("permission").objectStore("permission");
              objectStore1.openCursor().onsuccess = function(event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            per_list.push(cursor.value)
                            cursor.continue();
                        } else {
                            return defered.resolve(per_list);
                        }
                    };
                },2000)  
                return defered.promise; 
                 
            },
            getItemsData: function (){
                var indexedDB = $window.indexedDB;
                var request = window.indexedDB.open("GOYAOMS", 36);
                var defered = $q.defer();
                request.onerror = function(event) {
                    //console.log("error: ");
                };
                request.onsuccess = function(event) {
                    db = request.result;
                };
            setTimeout(function() {
              var objectStore2 = db.transaction("search").objectStore("search");
              objectStore2.openCursor().onsuccess = function(event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            search_list.push(cursor.value)
                            cursor.continue();
                        } else {
                            return defered.resolve(search_list);
                        }
                    };
                },2000)  
                return defered.promise;
            },
            getDeptData: function (){
                var indexedDB = $window.indexedDB;
                var request = window.indexedDB.open("GOYAOMS", 37);
                var defered = $q.defer();
                request.onerror = function(event) {
                    //console.log("error: ");
                };
                request.onsuccess = function(event) {
                    db = request.result;
                };
            setTimeout(function() {
              var objectStore3 = db.transaction("Dept").objectStore("Dept");
              objectStore3.openCursor().onsuccess = function(event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            dept.push(cursor.value)
                            cursor.continue();
                        } else {
                            return defered.resolve(dept);
                        }
                    };
                },2000)  
                return defered.promise;
         }, 
         getOrderData: function (){
                
                var indexedDB = $window.indexedDB;
                var request = window.indexedDB.open("GOYAOMSORDER", 39);
                var defered = $q.defer();
                request.onerror = function(event) {
                    //console.log("error: ");
                };
                request.onsuccess = function(event) {
                    db = request.result;
                };
            setTimeout(function() {
              var objectStore5 = db.transaction("AddOrderData", "readwrite").objectStore("AddOrderData");
              objectStore5.openCursor().onsuccess = function(event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            orderData.push(cursor.value)
                            cursor.continue();
                        } else {
                            var objectStoreRequest = objectStore5.clear();
                            return defered.resolve(orderData);
                            //console.log('error**')
                        }
                    };
                },2000)  
                return defered.promise;
            }
         }

        
    }

    FactoryIndexedDBLoad.$inject = ['$q', '$rootScope','$window'];

    return FactoryIndexedDBLoad;
});