var crisis_config = JSON.parse(Assets.getText('crisisnetConfig.json')) ;
var schedule = crisis_config.schedule;

var crisisSearch = new Cron(function() {

  console.log("another minute has passed, search(crisis.net api)");


}, schedule);


