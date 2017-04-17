//---------------------------------------------------------------
// The purpose is to understand the response object
//
// response.writeHead -- write Header
// ONLY WORKS BEFORE a response.write
//
// Here we will send a chunked response back to the client
// This is by default for nodejs when Content-Length header is not set
// send response.end() closes the connection
//
// TO RUN THIS EXAMPLE
// 1. type node 1_httpServer.js on the command line
// 2. type http://localhost:4000 on a browser
//---------------------------------------------------------------


var util = require('util');
var http = require('http');
var server = http.createServer();

// attach handler
server.on('request', function (request,response) {

  response.writeHead(200, {'Content-Type': 'text/html'}); // header

  var left = 10;
  var interval = setInterval (function () {
    for (var i = 0; i < 10; i++) {
      response.write(left + ":" + Date.now() + " ");
    }
    response.write("<br>"); // new line in html
    if (left-- === 0) {
      clearInterval(interval); // stop the timer!
      response.end();
    }
  }, 1000);

});

server.listen(4000);
