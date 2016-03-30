var app = angular.module('myApp', ['ngRoute', 'ngCookies'])

app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/partials/jobs.html',
    controller: 'jobsController'
  })
  .when('/adminlogin', {
    templateUrl: '/partials/adminLogin.html',
    controller: 'adminController'
  })
  .when('/admindashboard', {
    templateUrl: '/partials/adminDashboard.html',
    controller: 'dashController'
  })
  $locationProvider.html5Mode(true)
})