var express = require('express');
var bodyParser = require('body-parser');

require('dotenv').load();

var app = express();

var request = require('request');
request.debug = true;

// CONFIG
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var giphySearchBaseURL = "http://api.giphy.com/v1/gifs/search?";
// var GIPHY_API_KEY = "dc6zaTOxFJmzC";  //public giphy key

var dareToDiscoverBaseURL = "http://daretodiscover.herokuapp.com/books";

app.post('/books', function(req, res){
	console.log(req.body);
	var requestOptions = {
		url: dareToDiscoverBaseURL,
		method: "POST",
		body: req.body,
		json: true
	};

	request.post(requestOptions, function(error, apiResponse, body){
		console.log(apiResponse);
		res.json(apiResponse);
	});
	// res.send('user trying to post new book');
})

app.get('/', function(req, res){
	res.render('index.ejs');
});

app.post('/search', function(req, res){
	console.log(req.body);
	console.log(req.body.queryInput);
	// http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC 
	var queryStringObj = {
		q: req.body.queryInput, //'funny cat',
		api_key: process.env.GIPHY_API_KEY
	};
	var requestOptions = {
		url: giphySearchBaseURL,
		method: "GET",
		qs: queryStringObj
	};
	request.get(requestOptions, function(error, apiResponse, body){
		console.log(apiResponse);
		// body is a string, change to json
		var JSONbody = JSON.parse(body);
		res.json(JSONbody);
	});
});


app.listen(3000);