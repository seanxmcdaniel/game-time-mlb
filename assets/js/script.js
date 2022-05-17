var myScheduleKey = "?key=a3812c15735a4f739f3d2de60c5fd0bd";
var scheduleApi = "https://api.sportsdata.io/v3/mlb/scores/json/Games/" // + {season}
var selectTeam = document.getElementById('team-select')
var selectTeamValue = selectTeam.options[selectTeam.selectedIndex].selectTeamValue;
var scheduleList = document.querySelector('.scheduleList')
var scheduleBtn = document.querySelector('.show-schedule')

fetch(scheduleApi+ '2022' + myScheduleKey)
  .then(response => response.json())
  .then(data => console.log(data));

function fetchSchedule() {
  fetch(scheduleApi+ '2022' + myScheduleKey)
  .then(function(response) {
    return response.json();
  })
  .then(function(data){
    for (var i = 0; i < data.length; i++) {
      var listItem = document.createElement('li');
      if(data[i].AwayTeam === selectTeam.value){
        listItem.textContent = data[i].AwayTeam + ' at ' + data[i].HomeTeam;
        scheduleList.appendChild(listItem);
      } else if(data[i].HomeTeam === selectTeam.value) {
        listItem.textContent = data[i].AwayTeam + ' at ' + data[i].HomeTeam;
        scheduleList.appendChild(listItem);
      }

    }
  })
};

scheduleBtn.addEventListener('click', fetchSchedule);
