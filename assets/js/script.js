var myScheduleKey = "?key=a3812c15735a4f739f3d2de60c5fd0bd";
var scheduleApi = "https://api.sportsdata.io/v3/mlb/scores/json/Games/2022";
var statsApi = 'https://api.sportsdata.io/v3/mlb/scores/json/Standings/2022?key=a3812c15735a4f739f3d2de60c5fd0bd';
var scheduleList = document.querySelector('.scheduleList')
var standingsList = document.querySelector('.standings-list')
var currentDay = moment().format("YYYY-MM-DDThh:mm:ss")
var broadDate = moment().format("dd/MM/yyyy")
var savedTeam = document.getElementById('savedTeam')
var broadBtn = document.querySelector('.watch-game')
const selectTeam = document.getElementById('team-select')

// Function to set full name of team to save on page on refresh instead of abbreviation
selectTeam.addEventListener('change', (event) => {
  let favoriteTeam = event.target.value;
  localStorage.setItem('Team', favoriteTeam);
  location.reload("true");
});

if ( localStorage.getItem('Team')) {
  selectTeam.value = localStorage.getItem('Team'); 
}

// Fetches schedule API, returns JSON
function fetchHome() {
  fetch(scheduleApi + myScheduleKey)
    .then(function (response) {
      return response.json();
    })
    // Creates <li> for each game time, and appends the schedule data to a new <li>.
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        // Conditionals for choosing only the schedule for selected teams.
        if (data[i].HomeTeam === selectTeam.value) {
          listItem.textContent = data[i].AwayTeam + ' at ' + data[i].HomeTeam + ' Date and Time: ' + moment(data[i].DateTime).format('MM/DD/YYYY h:mma');
          scheduleList.appendChild(listItem);
        } else if (data[i].DateTime < currentDay) {
          $('li').remove();
        }}
    })
  // Save selected team (value of the select in HTML) to local storage
  console.log(localStorage)
};

function fetchAway() {
  fetch(scheduleApi + myScheduleKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        if (data[i].AwayTeam === selectTeam.value) {
          listItem.textContent = data[i].AwayTeam + ' at ' + data[i].HomeTeam + ' Date and Time: ' + moment(data[i].DateTime).format('MM/DD/YYYY h:mma');
          scheduleList.appendChild(listItem);
        } else if (data[i].DateTime < currentDay) {
          $('li').remove();
        }}
    })
  console.log(localStorage)
};

function fetchStats() {
  fetch(statsApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var standingsItem = document.createElement('li');
        if (data[i].Key === selectTeam.value) {
          standingsItem.textContent = 'Division Rank: ' + data[i].DivisionRank + ' Wins: ' + data[i].Wins + ' Losses: ' + data[i].Losses;
          standingsList.appendChild(standingsItem);
        }}
    })
  console.log(localStorage)
};

$('.show-home').click(fetchHome);

// On second click, clear local storage and remove previous schedule
$('.show-home').click(function () {
  $('li').remove()
  localStorage.clear()
}, fetchHome);
// Then fetch new schedule and set new favorite team

$('.show-away').click(function () {
  $('li').remove()
  localStorage.clear()
}, fetchAway);

$('.standingBtn').click(function () {
  $('li').remove();
}, fetchStats);