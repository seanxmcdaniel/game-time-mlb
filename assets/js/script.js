var myScheduleKey = "?key=a3812c15735a4f739f3d2de60c5fd0bd";
var scheduleApi = "https://api.sportsdata.io/v3/mlb/scores/json/Games/2022"
var scheduleList = document.querySelector('.scheduleList')
var selectTeam = document.getElementById('team-select')
var currentDay = moment().format("YYYY-MM-DDThh:mm:ss")
var savedTeam = document.getElementById('savedTeam')

$('document').ready(function() {
  for (let i = 0; i < localStorage.length; i++) {
    const favTeam = localStorage.favTeam;

    savedTeam.innerHTML += favTeam;
  }
  console.log(currentDay)
  console.log(savedTeam.value)
});

// Fetches schedule API, returns JSON
function fetchSchedule() {
  fetch(scheduleApi + myScheduleKey)
  .then(function(response) {
    return response.json();
  })
  // Creates <li> for each game time, and appends the schedule data to a new <li>.
  .then(function(data){
    for (var i = 0; i < data.length; i++) {
      var listItem = document.createElement('li');
      if(data[i].AwayTeam === selectTeam.value){
        listItem.textContent = data[i].AwayTeam + ' at ' + data[i].HomeTeam + ' ' + data[i].DateTime;
        scheduleList.appendChild(listItem);
      } else if(data[i].HomeTeam === selectTeam.value) {
        listItem.textContent = data[i].AwayTeam + ' at ' + data[i].HomeTeam + ' ' + data[i].DateTime;
        scheduleList.appendChild(listItem);
      } else if(data[i].DateTime < currentDay) {
       console.log(data[i].DateTime + 'game has passed!');
       $('li').remove();
      }
    }
  })
  // Save selected team (value of the select in HTML) to local storage
  localStorage.setItem('favTeam', selectTeam.value)
  console.log(localStorage)
};

$('.show-schedule').click(fetchSchedule);

$('.show-schedule').click(function () {
  $('li').remove()
  localStorage.clear()
}, fetchSchedule);
