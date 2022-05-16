var myScheduleKey = "?key=a3812c15735a4f739f3d2de60c5fd0bd";
var scheduleApi = "https://api.sportsdata.io/v3/mlb/scores/json/Games/" // + {season}

fetch('https://api.sportsdata.io/v3/mlb/scores/json/Games/2022?key=a3812c15735a4f739f3d2de60c5fd0bd')
  .then(response => response.json())
  .then(data => console.log(data));