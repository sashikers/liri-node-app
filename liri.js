console.log("=========================================================================================================================================================================================================================================================================================================================================================")

// grabs the user command
var userCommand = process.argv[2];
console.log("userCommand", userCommand);	

// imports the twitter key info from keys.js and creates an object for the twitter module
var keys = require("./keys.js");
var twitter = require("twitter");
var twitterUser = new twitter(keys);

switch (userCommand) {
	case "my-tweets": 
		twitterUser.get('statuses/home_timeline', function(error, tweets, response) {
			if (!error) {
				for (i = 0; i < tweets.length; i++) {
					console.log((i+1) + ": '" + tweets[i].text + "' - posted by @" + tweets[i].user.screen_name + " on " + tweets[i].user.created_at);
				}
			} 
			else {
				console.log(error);
			}
		});
		break;
	default: 
		console.log("Please enter a valid command");
}



