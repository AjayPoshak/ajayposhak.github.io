"use strict";
/**
 * This file is the controller of battingStats page.
 */
angular.module('socialCopsDemo')
  .controller('battingStatsController', battingStatsController);

  function battingStatsController($scope, $rootScope){
    let data = {};
    if(localStorage.getItem('data') != undefined || localStorage.getItem('data') != ''){
      data  = JSON.parse(localStorage.getItem("data"));
    }
    let runsByYear = new Array();
    let runsTossLost = 0;
    let runsTossWon = 0;
    for(let i = 0; i < data.length-1; i++){
      let responseIndex = checkYear(data[i].date.slice(-4));
      if(responseIndex == -1){
        let obj = new Object();
        obj.year = parseInt(data[i].date.slice(-4));
        obj.runs = parseInt(data[i].batting_score);
        runsByYear.push(obj);
      }
      else {
        if(!$rootScope.ifNaN(data[i].batting_score))
          runsByYear[responseIndex].runs += parseInt(data[i].batting_score);
      }
      if(!$rootScope.ifNaN(data[i].batting_score) && data[i].toss == "lost")
        runsTossLost += parseInt(data[i].batting_score);
      else if(!$rootScope.ifNaN(data[i].batting_score) && data[i].toss == "won")
        runsTossWon += parseInt(data[i].batting_score);
    }
    /**
     * This function checks whether that year has already been inserted into
     * runsByYear array.
     * @param  {string} param Year to be checked.
     * @return {Number}       -1, if year is not in array; location, if year is
     *                              already in array.
     */
    function checkYear(param){
      let loc = -1;
      for(let itr = 0; itr < runsByYear.length; itr++){
        if(runsByYear[itr].year == param){
          loc = itr;
          break;
        }
      }
      return loc;
    };
    let runsData = new Array();
    let runsYear = new Array();
    for(let i = 0; i < runsByYear.length; i++){
      runsData.push(runsByYear[i].runs);
      runsYear.push(runsByYear[i].year);
    };
    let runByYearGraph = document.getElementById('runGraphByYear');
    let runsByToss = document.getElementById('runsByToss').getContext("2d");
    let lineChartData = {
      labels: runsYear,
      datasets: [
          {
              label: "My First dataset",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: runsData,
              spanGaps: false,
          }
      ]
    };
    let runsByTossChartData = {
      labels: [
        "Runs Scored while toss was lost",
        "Runs Scored while toss was won"
    ],
    datasets: [
        {
            data: [runsTossLost, runsTossWon],
            backgroundColor: [
                "#FF6384",
                "#36A2EB"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB"
            ]
        }]
    };
    let runLineChart = new Chart(runByYearGraph, {
      type: 'line',
      data: lineChartData
    });
    let runsByTossPieChart = new Chart(runsByToss, {
      type: 'pie',
      data: runsByTossChartData
    });
  };
