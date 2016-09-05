"use strict";
angular.module('socialCopsDemo')
    .controller('playedBigTeamsController', playedBigTeamsController);
/**
 * This controller controls the view for playedBigTeams partial.
 * @param   $scope  It acts like a glue between view and controller.
 * @param  $rootScope It is parent scope for all scopes.  Used to access global
 *                     variables and functions.
 */
function playedBigTeamsController($scope, $rootScope) {
    console.log("Inside third Controller...");
    var data = {};
    if (localStorage.getItem('data') != undefined || localStorage.getItem('data') != '') {
        data = JSON.parse(localStorage.getItem("data"));
    }
    const cricketNations = ["Pakistan", "New Zealand", "Sri Lanka", "England",
        "Bangladesh", "West Indies", "South Africa", "Australia"
    ];
    let runsAgainstNations = new Array(cricketNations.length);
    let wicketsAgainstNations = new Array(cricketNations.length);
    for (let i = 0; i < data.length - 1; i++) {
        let nationIndex = checkNationIndex(data[i].opposition.substr(2));
        if (nationIndex != -1) {
            if (runsAgainstNations[nationIndex] == undefined && !$rootScope.ifNaN(data[i].batting_score))
                runsAgainstNations[nationIndex] = parseInt(data[i].batting_score);
            else if (runsAgainstNations[nationIndex] != undefined && !$rootScope.ifNaN(data[i].batting_score))
                runsAgainstNations[nationIndex] += parseInt(data[i].batting_score);
            if (wicketsAgainstNations[nationIndex] == undefined && !$rootScope.ifNaN(data[i].wickets))
                wicketsAgainstNations[nationIndex] = parseInt(data[i].wickets);
            else if (wicketsAgainstNations[nationIndex] != undefined && !$rootScope.ifNaN(data[i].wickets))
                wicketsAgainstNations[nationIndex] += parseInt(data[i].wickets);
        }

    }
    /**
     * This function returns the index of a nation from cricketNations array.
     * @param  {string} nation Nation whose index is to be searched.
     * @return {number} Index, if nation is found in array; else -1.
     */
    function checkNationIndex(nation) {
      let loc = -1;
      for (let i = 0; i < cricketNations.length; i++) {
          if (cricketNations[i] == nation) {
              loc = i;
              break;
          }
      }
      return loc;
    };
    var runsAgainstTeams = document.getElementById('runsAgainstTeams');
    var wicketsAgainstTeams = document.getElementById('wicketsAgainstTeams');
    var teamsBarChartData = {
        labels: cricketNations,
        datasets: [{
            label: 'Runs scored by Sachin against Test playing Nations',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 160, 0.2)',
                'rgba(255, 206, 186, 0.2)'
            ],
            borderWidth: 1,
            data: runsAgainstNations,
        }]
    };
    let wicketsTakenData = {
        labels: cricketNations,
        datasets: [{
            label: 'Wickets taken by Sachin against Test playing Nations',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 160, 0.2)',
                'rgba(255, 206, 186, 0.2)'
            ],
            borderWidth: 1,
            data: wicketsAgainstNations,
        }]
    };
    let runsBarChart = new Chart(runsAgainstTeams, {
        type: 'bar',
        data: teamsBarChartData
    });
    let wicketsBarChart = new Chart(wicketsAgainstTeams, {
        type: 'bar',
        data: wicketsTakenData
    });
};
