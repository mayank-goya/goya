define([], function(app) {
    'use strict';
    function salesCommunicatorController($state,$location,$rootScope,requestManager,$scope,setHeaderItem,$filter,checkBrowserDetails) {
        var vm = this;
        vm.cmd = false;
        vm.showUploadSection = false;
        vm.showFromDate = '';
        vm.showToDate = '';
        vm.uploadFiles = '';
         vm.filePath='';
         vm.filePathURL='';

        vm.status = [{id:1,option:'active',value:true},{id:2,option:'inactive',value:false}];
        vm.path = 'http://166.62.119.178/omsdev';
           $rootScope.headerUrl = 'includes/footer1.html';
        function initialData(){
        	if(localStorage['access_token']){
        		localStorage.setItem('path', '/sales-communicator');
                setHeaderItem.setItems();
        		$rootScope.login = true;
        	}else{
        		$state.go('login');
        	}
        }
        initialData();
        
        vm.setSalesData = function(){
            vm.communicatorData = {
            showToDate: '',
            showFromDate: '',
            weeks: '',
            uploadFiles: '',
            comment: ''
          }
          vm.Srl = '';
          vm.isEditable = false;
          vm.communicatorData.Selected = vm.status[0];
        }
        vm.setSalesData();
        function getInitialData()
        {
            
              vm.filePath = $location.absUrl();
              vm.filePathURL = vm.filePath.split("#/");

            var req = {
                WeekNo:0
            }
            $rootScope.isLoading = true;  
            requestManager.salesCommunicator(req).then(function (result) {               
                if(result.Status == 'True'){
                    $rootScope.isLoading = false;  
                    vm.salesData = result.Payload; 
                    for(var i = 0;i<vm.salesData.length;i++){
                        vm.salesData[i]['fullFile'] = vm.path+vm.salesData[i].FilePath;                   
                    }
                }               
               console.log('show det'+JSON.stringify(result)); 
            })
        }
        getInitialData();
        vm.setFromDate = function(fromToDate) {
            var fromDate = new Date(fromToDate);

            var sevenDay = 604800000;
            var newTimeInMilli = fromDate.getTime();
            fromDate = newTimeInMilli + sevenDay;
            var newFromDate = new Date(fromDate);
            var date = newFromDate.getDate();
            var month = newFromDate.getMonth() + 1;
            var year = newFromDate.getFullYear();
            var hh = newFromDate.getHours();
            var mm = newFromDate.getMinutes();
            var ss = newFromDate.getSeconds();
            vm.firstDate = true;
            fromDate = month + "/" + date + "/" + year + " " + "00" + ":" + "00" + ":" + "00";

            vm.communicatorData.showFromDate = $filter('date')(new Date(fromDate), 'MM/dd/yyyy');
        }

        vm.setToDate = function(fromDate) {
            var toDate = new Date(fromDate);
            var date = toDate.getDate();
            var month = toDate.getMonth() + 1;
            var year = toDate.getFullYear();
            var hh = toDate.getHours();
            var mm = toDate.getMinutes();
            var ss = toDate.getSeconds();
            toDate = month + "/" + date + "/" + year + " " + "00" + ":" + "00" + ":" + "00";
            vm.communicatorData.showToDate = $filter('date')(new Date(toDate), 'MM/dd/yyyy');
            vm.weeks = 0;
            vm.setFromDate(vm.communicatorData.showToDate);
            vm.calculateWeeksYear(fromDate);
        }
        var getDays = 0;
        vm.calculateWeeksYear = function(ToDate){
            var todate = new Date(ToDate);
            var year = todate.getFullYear();
            var month = todate.getMonth()+1;
            var currentDay = todate.getDate();
            for (var i = 0; i < month-1; i++) {
              getDays = getDays+parseInt(getNumberOfDays(year,i));
              
            }            
            getDays = currentDay+getDays;
            vm.communicatorData.weeks = getDays/7;
            if((vm.communicatorData.weeks - Math.floor(vm.communicatorData.weeks)) != 0){
                vm.communicatorData.weeks = Math.floor(vm.communicatorData.weeks)+1;
            }
            getDays = 0;
        }
        function getNumberOfDays(year, month) {
        var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
        return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
            }
        vm.activateUploadSection=function() {
           vm.showUploadSection = true;
        }

        vm.closeUploadSection=function() {
            vm.showUploadSection = false;
            vm.setSalesData();
        }


        vm.resetClass = function(){
            console.log('hffff');
             vm.cmd = false;           
        }
        vm.setEvent = function (index) {
            console.log(index);
            vm.cmd = false;
            //vm.cmd[index]=true;
        }
        vm.preview = function(file,index){
          var w = window.open(vm.filePathURL+file);
       
            w.print();
           // console.log(file)
           
            //  $('#'+index).attr('src','http://166.62.119.178/omsdev'+file);

        }
        vm.addSalesCommunicatorData = function(salesData){
            var path = $location.absUrl();
            var newPath = path.split("#/")
            console.log(newPath);
            $rootScope.isLoading = true; 
            if(vm.isEditable == false){
                var reqObj = {
                WeekNo: salesData.weeks,
                Year: new Date(salesData.showToDate).getFullYear(),
                StartDate: salesData.showToDate,
                EndDate: salesData.showFromDate,
               // PdfFilePath: newPath[0]+'Data/SalesCommunicator/'+vm.FileName,
                PdfFilePath: 'Data/SalesCommunicator/',
                FileName: vm.FileName,
                UserID: localStorage['user_id'],
                IsActive: salesData.Selected.value,
                Comments: salesData.comment

            }
              requestManager.insertSalesCommunicatorData(reqObj).then(function(){
                    vm.chunkUploadFileData();
                   
                })  
          }else{
             var reqObj = {
                Srl: vm.Srl,
                WeekNo: salesData.weeks,
                Year: new Date(salesData.showToDate).getFullYear(),
                StartDate: salesData.showToDate,
                EndDate: salesData.showFromDate,
                UserID: localStorage['user_id'],
                IsActive: salesData.Selected.value,
                Comments: salesData.comment

            }
            console.log(reqObj);
            requestManager.editSalesCommunicatorData(reqObj).then(function (response) {
                    vm.closeUploadSection();
                    getInitialData();
            })

          }          
               
            

        }
        vm.chunkUploadFileData = function () {  
              
            var reader = new FileReader();
                reader.onload = function(e)
                {
                    var chunkSize = 10000;
                    vm.lastChunck = false;
                    var b_blob = event.target.result;
    console.log(b_blob)
                      var bblob = b_blob.split('base64,');
                      var imageData = bblob[1];
                      var imageLength = imageData.length;
                      vm.chunk;  
               
                    for(var i=0;i<=imageLength; i+= chunkSize)
                    {
                      if(imageData.length > i + chunkSize) 
                      {
                        vm.chunk = imageData.substr(i, chunkSize); 
                        vm.sendUploadData();                            
                      } else 
                      {
                        vm.chunk = imageData.substr(i,chunkSize);
                        vm.lastChunck = true;
                        vm.sendUploadData();             
                      }
                        
                    }                
            }
            reader.readAsDataURL(vm.file);            
        }
        vm.sendUploadData = function () {

            var reqObj = {
                FileName: vm.FileName,
                FileType: vm.FileType,
                FileData: vm.chunk,
                SentDate: new Date() 
            }
            console.log(reqObj);           
           requestManager.sendFileData(reqObj).then(function (response) {
              if(vm.lastChunck == true){
                    vm.closeUploadSection();
                    getInitialData();
                }  
            })
        }
        vm.setDataForEdit = function(data){
            var StartDate = $filter('date')(new Date(data.StartDate), 'MM/dd/yyyy');
            var endDate =   $filter('date')(new Date(data.EndDate), 'MM/dd/yyyy');
            vm.showUploadSection = true;
            vm.isEditable = true;
            vm.communicatorData = {
            showToDate: StartDate,
            showFromDate: endDate,
            weeks: data.WeekNo,
            uploadFiles: data.FileName,
            comment: data.Comments
          }
          vm.Srl = data.Srl;
          if(data.Active == "True"){
            vm.communicatorData.Selected = vm.status[0]; 
           }else{
            vm.communicatorData.Selected = vm.status[1];
           } 
          

        }

        vm.setDataForDelete = function (Sid) {
            var reqObj = {
                Srl: Sid,
                UserID: localStorage['user_id']
            }
            $rootScope.isLoading = true;
            requestManager.deleteSalesCommunicatorData(reqObj).then(function (response) {
                getInitialData();
            })
        }

        $scope.uploadFile = function (event) {
            console.log('file');            
            vm.file = event.target.files[0];
            vm.FileName = vm.file.name;
            vm.FileType = vm.file.type;
            console.log(vm.file);            
        }
        $scope.$on('resetSetting',function (event) {
            vm.resetClass();
        })
       
    }

    salesCommunicatorController.$inject = ['$state','$location','$rootScope','requestManager','$scope','setHeaderItem','$filter','checkBrowserDetails'];

    return salesCommunicatorController;
});