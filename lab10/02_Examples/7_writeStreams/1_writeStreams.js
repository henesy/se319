//---------------------------------------------------------------
// The purpose is to state that nodejs has writeStreams
// These are used in a variety of situations for example when
// writing data to a file or to a socket
//
// writeStreams do not block.
// 
// They have a drain event (which basically means that the 
// data has been flushed)
// We will not use it here.
//
// TO RUN THIS EXAMPLE
// 1. type node 1_writeStreams.js on the command line
//---------------------------------------------------------------

var fs = require('fs');
var ws = fs.createWriteStream("helloOut.txt"); 

ws.write("Hello World"); //writes as utf-8 encoded
ws.write("Hello World", "base64"); //writes as base64 encoded
ws.write(new Buffer("Hello World")); // writes as utf-8 encoded
console.log("-- DONE writing --");

console.log("Now INSPECT contents of helloOut.txt by typing");
console.log("od -t xC -c helloOut.txt");
console.log("// this means show one Character at a time in hexadecimal and as char");
