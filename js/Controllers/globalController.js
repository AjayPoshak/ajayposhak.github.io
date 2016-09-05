"use strict";
/**
 *  This is the global controller for whole application.
 */
angular.module('socialCopsDemo')
  .controller('globalController', globalController);
/**
 * globalController controls the global functions and variables in the app.
 * @param  $rootScope Parent scope, all other scopes are descendants of rootScope
 * @param  $location  Exposes the current url in address bar, and also
 *                    synchronises the changes done to url.
 */
  function globalController($rootScope, $location){
    /**
     * This function checks if a number is NaN or not.
     *  NaN is a special type in JS which is not equal to itself.
     * @param  {string} param String to be checked for NaN
     * @return {Boolean}  true, if NaN; false, if not NaN
     */
    $rootScope.ifNaN = function(param){
      if(parseInt(param) === parseInt(param)){
        return false;
      }
      else {
        return true;
      }
    };
    /**
     * Previous page button's functionality.  It updates the URL of application
     * on the click of previous button by using $location service.
     * @param  {string} param Name of current partial in the view.
     */
    $rootScope.previousPage = function(param){
      if(param === 'playedBigTeams') $location.path('/debut');
      else if(param === 'battingStats') $location.path('/playedBigTeams');
      else if(param === 'teamPerformance') $location.path('/battingStats');
      else if(param === 'masterBlaster') $location.path('/teamPerformance');
      else console.log("Invalid Path Request");
    };
    /**
     * Next page button's functionality.  It updates the URL of application
     * when the next button is clicked.
     * @param  {string} param Name of current partial in the view.
     */
    $rootScope.nextPage = function(param){
      if(param === 'debut') $location.path('/playedBigTeams');
      else if(param === 'playedBigTeams') $location.path('/battingStats');
      else if(param === 'battingStats') $location.path('/teamPerformance');
      else if(param === 'teamPerformance') $location.path('/masterBlaster');
      else console.log("Invalid Path Request");
    };
  };
