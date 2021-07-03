var url = require('url');
var http = require('http');
var path = require('path');

var globalCounter = {};

var server = http.createServer(function(request, response) {
  var endpoint = url.parse(request.url, true).pathname;
  var property = endpoint.replace(/^\//, '');

  if (request.method === 'POST') {
    // YOUR CODE HERE
    if (request.url.includes('/dogs')) {
      globalCounter.dogs = 0;
      request.on('data', function() {
        globalCounter.dogs += 1;
      });
      response.writeHead(201, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(globalCounter.dogs));
    }
    if (request.url.includes('/cats')) {
      globalCounter.cats = 0;
      request.on('data', function() {
        globalCounter.cats += 1;
      });
      response.writeHead(201, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(globalCounter.cats));
    }
  } else if (request.method === 'GET') {
    // YOUR CODE HERE
    if (globalCounter.dogs) {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(globalCounter.dogs));
    }
    if (globalCounter.cats) {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(globalCounter.cats));
    }
  } else {
    response.statusCode = 404;
    response.end();
  }
});

// Do not edit this line
module.exports = server;


// * A **POST** to `/dogs` should set `globalCounter.dogs = 1`.
// * A subsequent **GET** to `/dogs` should return `1`.
// * A subsequent **POST** to `/dogs` should set `globalCounter.dogs = 2`.
// * A subsequent **GET** to `/dogs` should return `2`.
// * A subsequent **GET** to `/cats` should return an empty response, as it has not yet been set.
// * A subsequent **POST** to `/cats` should set `globalCounter.cats = 1`.
// * A subsequent **GET** to `/cats` should return `1`.
