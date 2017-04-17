//---------------------------------------------------------------
// The purpose is to serve a file!
//
// TO RUN THIS EXAMPLE
// 1. type node 1_httpServer.js on the command line
// 2. type http://localhost:4000/index.html  on a browser
// 3. type http://localhost:4000/3_httpServer.js  on a browser
//---------------------------------------------------------------


var util = require('util');
var path = require('path');
var http = require('http');
var fs   = require('fs');
var server = http.createServer();

// attach handler
server.on('request', function (req,res) {
  var file = path.normalize('.' + req.url);

  fs.exists(file, function(exists) {
    if (exists) {
      var rs = fs.createReadStream(file);

      rs.on('error', function() {
        res.writeHead(500); // error status
        res.end('Internal Server Error');
      });


      res.writeHead(200); // ok status

      // PIPE the read stream with the RESPONSE stream
      rs.pipe(res);
    } 
    else {
      res.writeHead(404); // error status
      res.end('NOT FOUND');
    }
  });

}); // end server on handler

server.listen(4000);
