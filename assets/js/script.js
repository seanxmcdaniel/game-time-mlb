var myScheduleKey = "?key=a3812c15735a4f739f3d2de60c5fd0bd";
var scheduleApi = "https://api.sportsdata.io/v3/mlb/scores/json/Games/2022"
var scheduleList = document.querySelector('.scheduleList')
var standingsList = document.querySelector('.standings-list')
const selectTeam = document.getElementById('team-select')
var currentDay = moment().format("YYYY-MM-DDThh:mm:ss")
var broadDate = moment().format("dd/MM/yyyy")
var savedTeam = document.getElementById('savedTeam')
var broadBtn = document.querySelector('.watch-game')


// Function to set full name of team to save on page on refresh instead of abbreviation
selectTeam.addEventListener('change', (event) => {
  let favoriteTeam = event.target.value;
  localStorage.setItem('Team', favoriteTeam);
});

if ( localStorage.getItem('Team')) {
  selectTeam.value = localStorage.getItem('Team'); 
}

// Fetches schedule API, returns JSON
function fetchSchedule() {
  fetch(scheduleApi + myScheduleKey)
    .then(function (response) {
      return response.json();
    })
    // Creates <li> for each game time, and appends the schedule data to a new <li>.
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        // Conditionals for choosing only the schedule for selected teams.
        if (data[i].AwayTeam === selectTeam.value) {
          listItem.textContent = data[i].AwayTeam + ' at ' + data[i].HomeTeam + ' Date and Time: ' + data[i].DateTime;
          scheduleList.appendChild(listItem);
        } else if (data[i].HomeTeam === selectTeam.value) {
          listItem.textContent = data[i].AwayTeam + ' at ' + data[i].HomeTeam + ' Date and Time: ' + data[i].DateTime;
          scheduleList.appendChild(listItem);
        } else if (data[i].DateTime < currentDay) {
          $('li').remove();
        }}
    })
  // Save selected team (value of the select in HTML) to local storage
  console.log(localStorage)
};

function fetchStats() {
  fetch('https://statsapi.mlb.com/api/v1/standings?leagueId=103&season=2022&standingsTypes=wildCard,regularSeason&hydrate=teammlb')
	.then(function(response) {
    return response.json()
  })
    // Creates <li> for each game time, and appends the broadcast data to a new <li>.
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var statsInfo = document.createElement('li');
        // Conditionals for choosing only the broadcast for selected teams.
        if (data[i].divisionRank === 1) {
          statsInfo.textContent = date[i].name + 'Division Rank:' + data[i].divisionRank + 'Wins:' + data[i].wins + 'Losses:' + data[i].losses;
          standingsList.appendChild(statsInfo);
        }
      }
    }
  )};

$('.show-schedule').click(fetchSchedule);

// On second click, clear local storage and remove previous schedule
$('.show-schedule').click(function () {
  $('li').remove()
  localStorage.clear()
}, fetchSchedule);
// Then fetch new schedule and set new favorite team

$('standingBtn').click(fetchStats);