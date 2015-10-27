
var express = require('express');
var request = require('request');
// request.debug = true;

// don't need to save to a var
// just pull in the dotenv module's code and run its load method
// you can save to a variable to check what is being requried if curious
require('dotenv').load();  


var app = express();

GIPHY_API_KEY = 'dc6zaTOxFJmzC';
giphySearchBaseURL = 'http://api.giphy.com/v1/gifs/search?';


var queryStringObj = {
	api_key: process.env.GIPHY_API_KEY,
	q: 'cats'
}

var requestOptions = {
	uri: giphySearchBaseURL,
	//method: 'GET', // the default, so not required
	qs: queryStringObj
}


app.get('/', function(req, res){
	request(requestOptions, function(error, response, body){
		console.log(response);
		var JSON_body = JSON.parse(response.body);
		res.json(JSON_body);
	});
});

app.listen(3000);