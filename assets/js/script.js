var myScheduleKey = "?key=a3812c15735a4f739f3d2de60c5fd0bd";
var scheduleApi = "https://api.sportsdata.io/v3/mlb/scores/json/Games/2022"
var scheduleList = document.querySelector('.scheduleList')
var scheduleBtn = document.querySelector('.show-schedule')
var selectTeam = document.getElementById('team-select')
var selectTeamValue = selectTeam.options[selectTeam.selectedIndex].selectTeamValue;

fetch(scheduleApi + myScheduleKey)
  .then(response => response.json())
  .then(data => console.log(data));

function fetchSchedule() {
  fetch(scheduleApi + myScheduleKey)
  .then(function(response) {
    return response.json();
  })
  .then(function(data){
    for (var i = 0; i < data.length; i++) {
      var listItem = document.createElement('li');
      if(data[i].AwayTeam === selectTeam.value){
        listItem.textContent = data[i].AwayTeam + ' at ' + data[i].HomeTeam + ' ' + data[i].Day;
        scheduleList.appendChild(listItem);
      } else if(data[i].HomeTeam === selectTeam.value) {
        listItem.textContent = data[i].AwayTeam + ' at ' + data[i].HomeTeam + ' ' + data[i].Day;
        scheduleList.appendChild(listItem);
      } 
    }
  })
};

$('.show-schedule').click(fetchSchedule);
