define([], function(app) {
    'use strict';
    
    function FactoryIndexedDBLoad() 
    {
         return 
         { 
              createIndexDB: function(cust_data) 
            {
              console.log(cust_data);
          window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
         
         //prefixes of window.IDB objects
         window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
         window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
         
         if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.")
         }
         
         var db;
         var request = window.indexedDB.open("GoyaEMS", 1);
         
         request.onerror = function(event) {
            console.log("error: ");
         };
         
         request.onsuccess = function(event) {
            db = request.result;
            console.log("success: "+ db);
         };
         
         request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("cust_data", {keyPath: "id"});
            
            for (var i in cust_data) {
               objectStore.add(cust_data[i]);
            }
         }
 
              }
            
         }
    }
     FactoryIndexedDBLoad.$inject = [];
     return FactoryIndexedDBLoad; 
    
});