var myScheduleKey = "?key=a3812c15735a4f739f3d2de60c5fd0bd";
var scheduleApi = "https://api.sportsdata.io/v3/mlb/scores/json/Games/2022"
var broadApi = "http://lookup-service-prod.mlb.com/json/named.mlb_broadcast_info.bam?src_type='TV'&src_comment='National'&tcid=mm_mlb_schedule&sort_by='game_time_et_asc'&home_away='H'";
var scheduleList = document.querySelector('.scheduleList')
var broadList = document.querySelector('.broadList')
var selectTeam = document.getElementById('team-select')
var currentDay = moment().format("YYYY-MM-DDThh:mm:ss")
var broadDate = moment().format("YYYYMMDD")
var savedTeam = document.getElementById('savedTeam')
var broadBtn = document.querySelector('.watch-game')

fetch(broadApi + "&start_date='" + broadDate + "'" + "&end_date='" + broadDate + "'" + "&season='2022'")
    .then(function (response) {
      return response.json();
    })
.then(function(data) {
console.log(data) 
});


// When document loads, get favorite team from local storage and 
// put the value inside of the dropdown menu.
$('document').ready(function () {
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
  localStorage.setItem('favTeam', selectTeam.value)
  console.log(localStorage)
};

function fetchBroadcast() {
  fetch(broadApi + "&start_date='" + broadDate + "'" + "&end_date='" + broadDate + "'" + "&season='2022'")
    .then(function (response) {
      return response.json();
    })
    // Creates <li> for each game time, and appends the broadcast data to a new <li>.
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var broadInfo = document.createElement('li');
        var team = localStorage.getItem('favTeam')
        // Conditionals for choosing only the broadcast for selected teams.
        if (data[i].away_team_abbrev === team) {
          broadInfo.textContent = 'You can watch' + data[i].away_team_full + 'play against' + data[i].home_team_full + 'today at' + data[i].game_time_away + 'on' + data[i].source_desc + ".";
          broadList.appendChild(broadInfo);
        } else if (data[i].home_team_abbrev === team) {
          broadInfo.textContent = 'You can watch' + data[i].home_team_full + 'play against' + data[i].away_team_full + 'today at' + data[i].game_time_home + 'on' + data[i].source_desc + ".";
          broadList.appendChild(broadInfo);
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

broadBtn.addEventListener('click', fetchBroadcast);