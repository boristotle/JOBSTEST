app.controller('dashController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){
  if ($cookies.get('username') === 'admin' && $cookies.get('password') === 'lizardking') {
    $scope.insertAnalytics = insertAnalytics;
    $scope.getUserStats = getUserStats;
    $scope.showStatsTable = false;
    $scope.logout = logout;
  
    function logout() {
    $cookies.remove('username');
    $cookies.remove('password');
    window.location = '/';
    }

    function insertAnalytics() {
      $http({
      method: 'POST',
      url: '/analytics',
      data: {analytics: $scope.analytics},
      }).then(function successCallback(response) {
        console.log(response.data);
      }, function errorCallback(response) {
        console.error(response);
      });
    }

    function getUserStats() {
      $scope.showStatsTable = !$scope.showStatsTable;
      $http({
      method: 'GET',
      url: '/users'
      }).then(function successCallback(response) {
        $scope.userStats = response.data
        console.log(response.data);

      }, function errorCallback(response) {
        console.error(response);
      });
    }
  } 
  else {
    window.location = '/';
  } 
}])