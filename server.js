//server.js

// load in the express module
var express = require('express');
// load in the request module
var request = require('request');
// load in bodyParser for form data
var bodyParser = require('body-parser');

// load in dotenv module
// don't need to save this one to a var
// just pull in the dotenv module's code and run its load method
require('dotenv').load();  

// create app object
var app = express();

// CONFIG
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
request.debug = true; // <- great for debugging, see the request and response

// giphy api
var giphySearchBaseURL = "http://api.giphy.com/v1/gifs/search?";
// var GIPHY_API_KEY = "dc6zaTOxFJmzC";  //public giphy key, but we're pretending it's secret
// note: if we had a session secret, would also put it in .env

// GA books api
var dareToDiscoverBaseURL = "http://daretodiscover.herokuapp.com/books";

// ROUTES

// serve index with its 2 forms (to search for gifs and post books)
app.get('/', function(req, res){
	res.render('index.ejs');
});


app.post('/search', function(req, res){
	// check our form data from user
	console.log(req.body);
	console.log(req.body.queryInput);
	// goal url format is 'http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC'
	// set up query string as object (request module will format for us)
	var queryStringObj = {
		q: req.body.queryInput, // used to be 'funny cat', before using form
		api_key: process.env.GIPHY_API_KEY
	};
	// set up options (see https://github.com/request/request#requestoptions-callback)
	var requestOptions = {
		url: giphySearchBaseURL,
		method: "GET", // not required because it's the default request type, and we're using request.get later
		qs: queryStringObj
	};
	// send the get request
	request.get(requestOptions, function(error, apiResponse, body){
		// view the whole response (already logged if request.debug is true)
		// console.log(apiResponse);
		// body comes back as a string, change to json
		var JSONbody = JSON.parse(body);
		// send back the body as our server's response
		res.json(JSONbody);
	});
});

app.post('/books', function(req, res){
	// check our form data from user
	console.log(req.body);
	// set up options (see https://github.com/request/request#requestoptions-callback)
	var requestOptions = {
		url: dareToDiscoverBaseURL,
		method: "POST",	// not necessary since we're using request.post method below
		body: req.body,  // could modify object from user form before sending, if we wanted
		json: true	// using json format allows us to send body as an object
	};

	// send the post request
	request.post(requestOptions, function(error, apiResponse, body){
		// view the whole response (already logged if request.debug is true)
		console.log(apiResponse);
		// body for daretodiscover came back as a json already (weird)
		console.log('type of body: ', typeof body);  // <- use typeof to check type
		// // send back the body as our server's response
		res.json(body);
	});
	// res.send('user trying to post new book');
})


app.listen(3000);