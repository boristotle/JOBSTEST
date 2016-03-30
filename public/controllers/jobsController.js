app.controller('jobsController', ['$scope', '$http', function($scope, $http){
  $scope.searchJobs = searchJobs;
  $scope.changeStart = changeStart;
  $scope.saveUserStats = saveUserStats;
  $scope.showAdminLogin = showAdminLogin;
  $scope.getAnalyticsCode = getAnalyticsCode;
  getAnalyticsCode();
  $scope.start = 0;
  getUserIP();
  $scope.showAdmin = false;
  var publisherID = 2119082322650455  //2878037053725137
  var CHNL = "" //'FJR' 

  function showAdminLogin() {
    window.location = '/adminlogin';
  }

  function getUserIP() {
    $.getJSON('//jsonip.com/?callback=?', function(data){
      $scope.ipAddress = data.ip;
    })
  }

  function getAnalyticsCode() {
    $http({
    method: 'GET',
    url: '/analytics',
    }).then(function successCallback(response) {
      if (response.data !== null) {
        $scope.analyticsCode = response.data.analytics.slice(8, -9);
        return loadAnalyticsScript($scope.analyticsCode);
      }
    }, function errorCallback(response) {
      console.error(response);
    });
  }

  function loadAnalyticsScript(analyticsCode) {
    var script = document.createElement('script');
    script.text = analyticsCode
    document.body.appendChild(script);
  }

  function saveUserStats() {
    var userStats = {zipCode: $scope.zipCode,
                 jobTitle: $scope.jobTitle,
                 ipAddress: $scope.ipAddress,
                 searchDate: new Date()
    }
    $http({
    method: 'POST',
    url: '/users',
    data: userStats,
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.error(response);
    });
    userStats = {};
  }

  function changeStart(num){
    $scope.start += num;
    searchJobs();
  };

  function searchJobs(){
    var zipCode = $scope.zipCode || '';
    var jobTitle = $scope.jobTitle || '';
    // var start = new Date().getTime();
    $http({
    method: 'GET',
    url: 'http://api.indeed.com/ads/apisearch?publisher=' + publisherID + '&q=' + jobTitle + '&l=' + zipCode + '&sort=&radius=25&st=&jt=&start=' + $scope.start + '&&fromage=&filter=&latlong=1&co=us&chnl=' + CHNL + '&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json'
    }).then(function successCallback(response) {
      // var end = new Date().getTime();
      $scope.jobResults = response.data.results;
      $scope.indeedClick = response.data.results[0].onmousedown
      // console.log(end - start);
    }, function errorCallback(response) {
      $scope.indeedClick = function() { console.log('hello')}
      console.error(response);
    });
  };
  
}])
  