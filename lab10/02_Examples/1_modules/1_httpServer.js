//---------------------------------------------------------------
// The purpose is to show how to build a http server using nodejs
//
// http servers fire a 'request' event
//
// TO RUN THIS EXAMPLE
// 1. type node 1_httpServer.js on the command line
// 2. type http://localhost:4000 on a browser
//---------------------------------------------------------------


var http = require('http');
var server = http.createServer();

// attach handler
server.on('request', function (request,response) {
  response.writeHead(200, {'Content-Type': 'text/plain'}); // header
  response.write('Hello World'); // data
  response.end(); // done - send the data
});

server.listen(4000);
