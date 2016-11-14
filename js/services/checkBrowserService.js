define([], function(app) {
    'use strict';

    function checkBrowserDetails($q, $http,$state,$rootScope,$location) {
        var userClickDetails = [];
    	return {
    		getBrowserDetails: function () {
    			 if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
                    {
                         return 'Opera';
                    }
                    else if(navigator.userAgent.indexOf("Chrome") != -1 )
                    {
                         return 'Chrome';
                    }
                    else if(navigator.userAgent.indexOf("Safari") != -1)
                    {
                         return 'Safari';
                    }
                    else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
                    {
                         return 'Firefox';
                    }
                    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
                    {
                         return 'IE'; 
                    }  
                    else 
                    {
                       return 'unknown';
                    }
    		},
            getPlatform: function () {
                var userAgent = navigator.userAgent || navigator.vendor || window.opera;
               if (/windows phone/i.test(userAgent)) {
                    return "Windows Phone";
                }
               if (/android/i.test(userAgent)) {
                    return "Android";
                }
               if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                    return "iOS";
                }else{
                    return "Desktop"
                }
               
            },
            get_browser: function(){
                var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
                if(/trident/i.test(M[1])){
                    tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
                    return 'IE'+tem[1];
                    }   
                if(M[1]==='Chrome'){
                    tem=ua.match(/\bOPR\/(\d+)/)
                    if(tem!=null)   {return 'Opera'+tem[1]}
                    }   
                M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
                if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
                return M[0]+" "+M[1]
               
             },
             setTrackerDetails: function (data,event) {
                 if($(data).is("li") || $(data).is("a") || $(data).is("button")){
                      var valueBox = $(data).text();
                      if(valueBox == 'LOGIN'){
                        event = 'LOGIN';
                      }
                      console.log('jj'+valueBox);
                    }else{
                      var valueBox = $(data).prop('value');
                      if(valueBox == 'Logout'){
                        event = 'Logout';
                      }

                      console.log('kk'+valueBox);
                    }
                    userClickDetails.push({UserID:localStorage['user_id'],ControlType:$(data).prop("tagName"),ControlID:$(data).prop("id"),ControlName:$(data).prop("name"),ActionName:event,Value:valueBox,ActionDate:new Date(),BrowserName:this.getBrowserDetails(),BrowserVersion:this.get_browser(),DeviceType:this.getPlatform(),PageURL:$location.absUrl(),PageName:$location.path().replace('/',"")});
                    console.log(JSON.stringify(userClickDetails));
                    localStorage.setItem('userTrack',JSON.stringify(userClickDetails));
             }
            
    	  }
    	}

    checkBrowserDetails.$inject = ['$q', '$http','$state','$rootScope','$location'];

    return checkBrowserDetails;
});