//---------------------------------------------------------------
// The purpose is to introduce you to websockets
// This is a SERVER that is SEPARATE from the http server.
//
// Your webpage (in this case the index.html in this directory)
// will be SERVED by the http server. THEN, it will connect to the 
// websocket server. Then - they will talk to each other!
//
// Note that in regular http - the server cannot initiate a conversation
// Here, the websocket server sends a message to the client browser.
//
// This example has THREE parts
// 1) The http server code (which is same as what we did earlier)
// 2) This code - this is the web socket server
// It prints what it got from client. It also sends a message to the
// client after every 1 second.
// 3) The html or client code. Note how it connects to the websocket
// and how it sends and receives messages
//
// To RUN THIS EXAMPLE
// First, run node httpServer.js on one terminal
// Next, run node 1_ws.js on another terminal
// Next, type localhost:4000/index.html on some browser
//
//---------------------------------------------------------------
var io = require('socket.io').listen(5000);

io.sockets.on('connection', function(socket) {
  socket.on('myEvent', function(content) {
    console.log(content); 
    socket.emit('server', "This is the server: got your message");
    var num = 3;
    var interval = setInterval( function() {
        socket.emit('server', num + ": message from server");
        if (num-- == 0) { 
          clearInterval(interval); // stops timer
        }
    }, 1000); // fire every 1 second
  });
});
