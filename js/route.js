"use strict";
angular.module('socialCopsDemo', ['ngRoute']);
/**
 * This is the routing service for the application.
 * @param $routeProvider It is used to configure routes.
 */
angular.module('socialCopsDemo')
  .config(['$routeProvider', function($routeProvider){
    console.log("Inside the router");
    $routeProvider
      .when('/',{
        templateUrl: 'view/debut.html',
        controller: ''
      })
      .when('/playedBigTeams', {
        templateUrl: 'view/playedBigTeams.html',
        controller: 'playedBigTeamsController'
      })
      .when('/battingStats', {
        templateUrl: 'view/battingStats.html',
        controller: 'battingStatsController'
      })
      .when('/teamPerformance', {
        templateUrl: 'view/teamPerformance.html',
        controller: 'teamPerformanceController'
      })
      .when('/masterBlaster', {
        templateUrl: 'view/masterBlaster.html',
        controller: ''
      })
      .otherwise ({
        redirectTo: '/'
      });
  }]);
