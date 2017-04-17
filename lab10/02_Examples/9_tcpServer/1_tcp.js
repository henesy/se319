//---------------------------------------------------------------
// The purpose of this example is to show how to create a simple
// chat server using nodejs
//
// After a server is created, it fires three events
// error   -- some error has occurred
// close   -- server is shutting down!
// connection -- some client has connected
//
// When connection, a socket that connects the CLIENT and the server is
// accessible. This socket fires two events 
// data -- this is fired whenever a data chunk is read by the server 
// close -- this is fired when the socket is being closed
//
// socket acts like a readStream and a writeStream.
// so, the socket.write() method can be used to write to the client.
//
// server has a listen method (which is like java's accept method
// except that it is non-blocking)
//
// TO RUN THIS EXAMPLE
// 1. type node 1_tcp.js on the command line
// 2. open mutiple terminals. On each of them open a telnet session
//    telnet localhost 4001
//
//    type in some text on the telnet terminals
//    This code acts like a simple chat
//---------------------------------------------------------------

var net = require('net');

// 1. Create server
var server = net.createServer();

// 2. attach handlers
server.on('error', function(err) {
  console.log("Server Error: ", err.message);
});

server.on('close', function() {
  console.log("Server closed!");
});

// create an array of clients
// when a new client connects, it will be added to this array
// when the client disconnects, it will be removed from this array
// when the client sends a message, it will be broadcast to all
// other clients that are in this array
var clients = []; // empty array

// attach the connection handler. Here is where all work is done!
server.on('connection', function(socket) {
  console.log("Server got a new connection!");
  //
  // add socket to clients list
  clients.push(socket);

  // attach handler to read data  from socket readStream
  socket.on('data', function(data) {
    console.log("got data:", data.toString());

    // broadcast data to rest of clients
    clients.forEach(function(otherSocket) {
      if (otherSocket !== socket) {
        otherSocket.write(data);
      }
    }); // end forEach
  }); // end socket on data

  // attach handler for connection closed
  socket.on('close', function() {
    console.log("Connection closed");

    // remove the client from the clients array
    var index = clients.indexOf(socket); // get index of item
    clients.splice(index, 1); // remove the item from array
  });
}); // end server on connection

// 3. LISTEN for connections
server.listen(4001);
console.log("Now Listening");
console.log("Any number of clients can connect to this server");
console.log("telnet localhost 4001 will start one client that connects");

