require("dotenv").config();
const Spotify = require('node-spotify-api');
const request = require('request');
const keys = require('./keys.js');
const fs = require('fs');


const spotify = new Spotify(keys.spotify);

let command = process.argv[2];

switch(command) {
    case "concert-this":
        getConcert(process.argv[3]);
        break;
    case 'spotify-this-song':
        console.log('spotify')
        getSpotify(process.argv[3]);
        break;
    case 'movie-this':
        console.log('movie')
        getMovie(process.argv[3]);
        break;
    case 'do-what-it-says':
        console.log('do it')
        getDoIt(process.argv[3]);
        break;
    default:
        console.log('Command Not Recognized!')
}

function getConcert(band) {
    request(`https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`,function(err,res,body){
        var arr = JSON.parse(body)
        arr.forEach(element => {
            console.log(`${element.venue.name} - ${element.venue.city}, ${element.venue.region} on ${element.datetime}`)
        });
    })
}

function getSpotify(song) {
    spotify.search({ type: 'track', query: song}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var items = data.tracks.items;
        items.forEach(element => {
            console.log(`${element.name} - ${element.artists[0].name}`);
            console.log(`${element.album.name} - ${element.preview_url}`);
            console.log("------------------------------------");          
        });
    })    
}

function getMovie(movie){
    request(`http://www.omdbapi.com/?apikey=trilogy&t=${movie}`,function(err,res,body){
        var data = JSON.parse(body);
        console.log(`${data.Title} - ${data.Year}`);
        console.log(`${data.Ratings[0].Source} - ${data.Ratings[0].Value}`);
        console.log(`${data.Ratings[1].Source} - ${data.Ratings[1].Value}`);
        console.log(`${data.Country} - ${data.Language}`)
        console.log(`Plot: ${data.Plot}`);
        console.log(`Actors: ${data.Actors}`);
        console.log('--------------------------------------------')
    })
}

function getDoIt() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (!error) {
            getSpotify(data);
        } else {
            console.log("Error occurred" + error);
        }
    });
};