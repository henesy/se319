//---------------------------------------------------------------
// The purpose is to state that nodejs has readStreams and writeStreams
// These are used in a variety of situations for example when
// reading data from a file or from a socket.
//
// readStreams do not block
// readStreams have three events
// data
// error
// end
//
// readStreams also have a pause() and a resume() method.
// We will not use these here.
//
// TO RUN THIS EXAMPLE
// 1. type node 1_readStreams.js on the command line
//---------------------------------------------------------------

var fs = require('fs');
var rs = fs.createReadStream("hello.txt"); // default is buffer

//attach handler for data event
rs.on('data', function(data) {
  console.log("READ DATA FROM STREAM-1!");
  console.log(data.toString()); // note this is a buffer
});

//attach handler for end event
rs.on('end', function() {
  console.log("DONE READING STREAM-1 OF DATA!");
});



var rs2 = fs.createReadStream("hello.txt"); 
// Note that there are many options that can be set when reading
// or writing - including specifying the data encoding of the file
// and also which byte is to be read etc.
rs2.setEncoding('base64');
  
//attach handler for 
rs2.on('data', function(data) {
  console.log("READ DATA FROM STREAM-2!");
  console.log(data); // base64 string
});

//attach handler
rs2.on('end', function() {
  console.log("DONE READING STREAM-2 OF DATA!");
});
