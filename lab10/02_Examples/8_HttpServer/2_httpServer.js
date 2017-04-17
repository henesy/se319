//---------------------------------------------------------------
// The purpose is to understand the request object
//
// request.url -- requested URL as string
// request.method -- POST/GET etc
// request.headers -- like host, connection, etc
//
// you can LISTEN for the body of the request by attaching handler
// it is just a readStream!
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
  // attach handler to get BODY of request
  // this will be mostly from forms etc
  // or on post
  request.on('data', function(data) {
    console.log("Got data from client: ",data);
  });

  response.writeHead(200, {'Content-Type': 'text/plain'}); // header

  // see what all information is sent in the request object from
  // the browser!
  response.write(util.inspect(request));
  response.end(); // done - send the data
});

server.listen(4000);
