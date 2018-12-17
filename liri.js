require("dotenv").config();  


var keys = require ("./keys.js");

var fs = require("fs");
var Spotify = require ("node-spotify-api");
var request = require ("request");
var moment = require ("moment");
var spotify = new Spotify(keys.spotify);


if (command === "spotify-this-song") {
  spotifySearch();
}else if (command === "concert-this") {
  concertSearch();
}else if (command === "movie-this") {
  movieSearch();
}else (command = "do-what-it-says") {
  doWhatItSays();
};


function spotifySearch() {
  var spotify = process.argv.slice(3).join(" ");
  spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
    var songs = data.tracks.items;
    for(var i=0; i<songs.length; i++){
      console.log(i);
      console.log('artist(s) : ' + songs[i].artists.map(getArtistNames));
      console.log('song name: ' + songs[i].name);
      console.log('preview song: ' + songs[i].preview_url);
      console.log('album: ' + songs[i].album.nam);
      console.log('---------------------------------------------------------');
    }
    fs.appendFile("log.txt", songData + "\n\n");
    console.log(data);
  });

}

function concertSearch(){
  var artis = process.argv.slice(3).join(" ");
  request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (err, response, body) {
    var bandData = JSON.parse(body);
    for (var i = 0; i<artis.length; i++){
      console.log("venue: " + bandData[0].venue.name),
      console.log("city: " + bandData[0].venue.city + "," + + bandData[0].venue.region),
      console.log("date: " + bandData[0].venue.datetime)
    }
    fs.appendFile("log.txt", logData + "\n\n")
    console.log(logData);
  });
}

function movieSearch(){
  var title = process.argv.slice(3).join(" ");
  request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy", function (error, response, body) {
  var movieData = JSON.parse(body);
    for (var i = 0; i < title.length; i++){
      console.log("title: " + movieData.Title),
      console.log("release year: " + movieData.Year),
      console.log("imdb rating: " + movieData.imdbRating),
      console.log("rotten tomato score: " + movieData.Ratings[1].Value),
      console.log("produced in: " + movieData.Country),
      console.log("language: " + movieData.Language),
      console.log("plot: " + movieData.Plot),
      console.log("actors: " + movieData.Actors)
    }
    fs.appendFile("log.txt", logData + "\n\n\n")
    console.log(logData);
    }
  }
}


function doWhatItSays () {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if(err) {
      return console.log(error)
    }
    var textArr = data.split(",");
    var input = textArr[1];
    if (textArr[0] === "spotify-this-song"){
      spotifySearch();
    }else if (textArr[0] === "concert-this") {
      concertSearch();
    }else (textArr[0] === "movie-this") {
      movieSearch();
    }
  })
}