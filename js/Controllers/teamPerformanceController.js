"use strict";
angular.module('socialCopsDemo')
    .controller('teamPerformanceController', teamPerformanceController);
/**
 * This controllers controls the view for teamPerformanceController.
 * @param   $scope  It acts like a glue between view and controller.
 * @param  $rootScope It is parent scope for all scopes.  Used to access global
 *                     variables and functions.
 */
function teamPerformanceController($scope, $rootScope) {
    let data = {};
    let underFifty = 0;
    let fifty = 0;
    let hundred = 0;
    let wonFifty = 0;
    let wonHundred = 0;
    let wonUnderFifty = 0;
    let twoHundred = 0;
    let wonTwoHundred = 0;
    let matchesSachinBowled = 0;
    let bowledWonMatches = 0;
    let oneWick = 0;
    let twoWicks = 0;
    let threeWicks = 0;
    let moreThanThreeWicks = 0;
    let oneWickWon = 0;
    let twoWicksWon = 0;
    let threeWicksWon = 0;
    let moreThanThreeWicksWon = 0;
    if (localStorage.getItem('data') != undefined || localStorage.getItem('data') == '') {
        data = JSON.parse(localStorage.getItem("data"));
    }
    for (let i in data) {
        if (!$rootScope.ifNaN(data[i].batting_score) && parseInt(data[i].batting_score) < 50) {
            underFifty++;
            if (data[i].match_result == "won") wonUnderFifty++;
        } else if (!$rootScope.ifNaN(data[i].batting_score) && parseInt(data[i].batting_score) >= 50 &&
            parseInt(data[i].batting_score) <= 99) {
            fifty++;
            if (data[i].match_result == "won") wonFifty++;
        } else if (!$rootScope.ifNaN(data[i].batting_score) && parseInt(data[i].batting_score) > 100 &&
            parseInt(data[i].batting_score) < 200) {
            hundred++;
            if (data[i].match_result == "won") wonHundred++;
        } else if (!$rootScope.ifNaN(data[i].batting_score) && parseInt(data[i].batting_score) >= 200) {
            twoHundred++;
            if (data[i].match_result == "won") wonTwoHundred++;
        }
        if (!$rootScope.ifNaN(data[i].wickets) && data[i].wickets == 2) {
            oneWick++;
            if (data[i].match_result == "won") oneWickWon++;
        }
        if (!$rootScope.ifNaN(data[i].wickets) && data[i].wickets == 2) {
            twoWicks++;
            if (data[i].match_result == "won") twoWicksWon++;
        }
        if (!$rootScope.ifNaN(data[i].wickets) && data[i].wickets == 3) {
            threeWicks++;
            if (data[i].match_result == "won") threeWicksWon++;
        }
        if (!$rootScope.ifNaN(data[i].wickets) && data[i].wickets > 3) {
            moreThanThreeWicks++;
            if (data[i].match_result == "won") moreThanThreeWicksWon++;
        }
    }
    let winningPercent = document.getElementById("winningPercent");
    let winningPercentWicks = document.getElementById("winningPercentWicks");
    let graphBatData = {
        labels: ["Run < 50", "Fifty", "Hundred", "Two Hundred"],
        datasets: [{
            label: 'Team Winning Percent when Sachin make runs',
            data: [(wonUnderFifty / underFifty) * 100, (wonFifty / fifty) * 100,
                (wonHundred / hundred) * 100, (wonTwoHundred / twoHundred) * 100
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };
    let graphWicksData = {
        labels: ["1 wicket", "Two Wickets", "Three Wickets", "More than 3 Wickets"],
        datasets: [{
            label: 'Team Winning Percent when Sachin bowls',
            data: [(oneWickWon / oneWick) * 100, (twoWicksWon / twoWicks) * 100,
                (threeWicksWon / threeWicks) * 100, (moreThanThreeWicksWon / moreThanThreeWicks) * 100
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };
    let myBarChart = new Chart(winningPercent, {
        type: 'horizontalBar',
        data: graphBatData
    });
    let myBarChartWicks = new Chart(winningPercentWicks, {
        type: 'horizontalBar',
        data: graphWicksData
    });
};
