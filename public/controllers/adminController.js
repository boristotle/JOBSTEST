app.controller('adminController', ['$scope', '$cookies', function($scope, $cookies){
  // console.log('admin controller');
  $scope.checkAdminCredentials = checkAdminCredentials;
  var admin = {username: 'admin', password: 'lizardking'}

  function checkAdminCredentials() {
    if ($scope.username === admin.username && $scope.password === admin.password) {
      $cookies.put('username', $scope.username);
      $cookies.put('password', $scope.password)
      // console.log('logged in')
      window.location = '/admindashboard';
    }
    else {
      alert('login credentails incorrect')
    }
  }

}])
  