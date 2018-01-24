console.log("=========================================================================================================================================================================================================================================================================================================================================================")

// grabs the user command
var userCommand = process.argv[2];
console.log("userCommand", userCommand);	

// checks the userCommand vs available options
switch (userCommand) {

	// generates a list of most recent tweets
	case "my-tweets": 
		// imports the twitter key info from keys.js and creates an object for the twitter module
		var keys = require("./keys.js");
		var Twitter = require("twitter");
		var twitterUser = new Twitter(keys);
		twitterUser.get('statuses/home_timeline', function(error, tweets, response) {
			if (!error) {
				for (var i = 0; i < tweets.length; i++) {
					console.log((i+1) + ": '" + tweets[i].text + "' - posted by @" + tweets[i].user.screen_name + " on " + tweets[i].user.created_at);
				}
			} 
			else {
				console.log(error);
			}
		});
		break;

	case "spotify-this-song":
		console.log("spotify-this-song");
		var searchSong = process.argv[3];
		console.log("searchSong", searchSong);

		var Spotify = require("node-spotify-api");
		var spotify = new Spotify({
			id: "7b29b2971c6d4970a33b8b9183b35148",
			secret: "d4ac8e40d9534340839dc72f053e3ebb"

		// var spotifyID = "7b29b2971c6d4970a33b8b9183b35148";
		// var spotifySecret = "d4ac8e40d9534340839dc72f053e3ebb";

		});

		console.log("spotify", spotify);

		// spotify.search({
		// 	type: "track",
		// 	query: searchSong,
		// 	function(err, data) {
		// 		if (err) {
		// 			console.log("spotify error");
		// 			console.log("err", err);
		// 		}
		// 		else {
		// 			console.log(data);
		// 		}
		// 	}
		// })

		spotify.search({
			type: "track",
			query: searchSong,
		})
		.then(function(response) {
			// console.log(response);
			// console.log(response.tracks);
			console.log("Artist: " + response.tracks.items[0].artists[0].name);
			console.log("Song name: " + response.tracks.items[0].name);
		})
		.catch(function(err) {
			console.log(err);
		});
		break;

	// when no valid option is input, shows an error code
	default: 
		console.log("Please enter a valid command");
}



