console.log("=========================================================================================================================================================================================================================================================================================================================================================");

// grabs the user command
var userCommand = process.argv[2];
console.log("userCommand", userCommand);

var Spotify = require("node-spotify-api");
var spotify = new Spotify({
	id: "7b29b2971c6d4970a33b8b9183b35148",
	secret: "d4ac8e40d9534340839dc72f053e3ebb"

});	

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

		spotify.search({
			type: "track",
			query: searchSong,
		})
		.then(function(response) {
			// console.log(response.tracks.items[0].preview_url);
			
			console.log("Artist: " + response.tracks.items[0].artists[0].name);
			console.log("Song name: " + response.tracks.items[0].name);
			console.log("Preview link: " + response.tracks.items[0].preview_url);
			console.log("Album name: " + response.tracks.items[0].album.name);
		})
		.catch(function(err) {
			console.log(err);
		});
		break;

	case "movie-this": 
		var request = require("request");
		var searchMovie = process.argv[3];
		console.log(searchMovie, "searchMovie");

		var queryURL = "http://www.omdbapi.com/?t=" + searchMovie + "&y=&plot=short&apikey=40e9cece";

		request(queryURL, function(error, response, body) {
			if (!error) {
				console.log("Title: " + JSON.parse(body).Title);
				console.log("Year: " + JSON.parse(body).Year);
				console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
				console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
				console.log("Country: " + JSON.parse(body).Country);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Plot: " + JSON.parse(body).Plot);
				console.log("Actors: " + JSON.parse(body).Actors);
			}
			else {
				console.log(error);
				// I've never seen Mr Nobody and don't feel right defaulting to it!
				// jk but i'm limited on time and would rather explore the other functions available
				// i will return to this
			}
		});

		break;

	case "do-what-it-says": 
		var fs = require("fs");
		fs.readFile("random.txt", "utf8", function(error, data) {
			if (error) {
				console.log("do-what-it-says error", error);
			}

			console.log("data", data);
			var doItArray = data.split(",");
			console.log("doItArray", doItArray);

			var randomMethod = doItArray[0];
			var searchSong = doItArray[1];

			console.log("randomMethod", randomMethod);
			console.log("searchSong", searchSong);

			if (randomMethod === "spotify-this-song") {
				spotify.search({
					type: "track",
					query: searchSong,
				})
				.then(function(response) {
					console.log("Artist: " + response.tracks.items[0].artists[0].name);
					console.log("Song name: " + response.tracks.items[0].name);
					console.log("Preview link: " + response.tracks.items[0].preview_url);
					console.log("Album name: " + response.tracks.items[0].album.name);
				})
				.catch(function(err) {
					console.log(err);
				});
			}
			else {
				console.log("Invalid command in random.txt");
			}
		})
		break;


	// when no valid option is input, shows an error code
	default: 
		console.log("Please enter a valid command");
}



