var myScheduleKey = "?key=a3812c15735a4f739f3d2de60c5fd0bd";
var scheduleApi = "https://api.sportsdata.io/v3/mlb/scores/json/Games/2022"
var scheduleList = document.querySelector('.scheduleList')
var selectTeam = document.getElementById('team-select')
var currentDay = moment().format("YYYY-MM-DDThh:mm:ss")
var savedTeam = document.getElementById('savedTeam')


// When document loads, get favorite team from local storage and 
// put the value inside of the dropdown menu.
$('document').ready(function() {
  for (let i = 0; i < localStorage.length; i++) {
    const favTeam = localStorage.favTeam;

    savedTeam.innerHTML += favTeam;
  }
  // For our developing purposes, console log current day and favorite team
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
      var lineBreak = document.createElement('br');
      // Conditionals for choosing only the schedule for selected teams.
      if(data[i].AwayTeam === selectTeam.value){
        listItem.textContent = data[i].AwayTeam + ' at ' + data[i].HomeTeam;
        scheduleList.appendChild(listItem);
      } else if(data[i].HomeTeam === selectTeam.value) {
        listItem.textContent = data[i].AwayTeam + ' at ' + data[i].HomeTeam;
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

// On second click, clear local storage and remove previous schedule
$('.show-schedule').click(function () {
  $('li').remove()
  localStorage.clear()
}, fetchSchedule);
// Then fetch new schedule and set new favorite team
