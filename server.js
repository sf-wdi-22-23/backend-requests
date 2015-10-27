//server.js

// load in the express module
var express = require('express');
// load in the request module
var request = require('request');
// request.debug = true;

// don't need to save this one to a var
// just pull in the dotenv module's code and run its load method
// you can save to a variable to check what is being requried if curious
require('dotenv').load();  

// create app object
var app = express();

// don't keep actual secrets on github! move to .env file and GITIGNORE THE .ENV FILE!!!!!
GIPHY_API_KEY = 'dc6zaTOxFJmzC';  
giphySearchBaseURL = 'http://api.giphy.com/v1/gifs/search?';


app.get('/', function(req, res){
	var queryStringObj = {
		api_key: process.env.GIPHY_API_KEY || GIPHY_API_KEY, // still works if using the public key (above) or a private api key
		q: 'cats'
	}

	var requestOptions = {
		uri: giphySearchBaseURL,
		//method: 'GET', // the default, so not required
		qs: queryStringObj
	}
	request(requestOptions, function(error, response, body){
		console.log(response);
		var JSON_body = JSON.parse(response.body);
		res.json(JSON_body);
	});
});

app.listen(3000);
