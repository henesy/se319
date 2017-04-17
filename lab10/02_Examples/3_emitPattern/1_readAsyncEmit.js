//---------------------------------------------------------------
// The purpose is to show how EVENTS based programming is done in node
// In this example, createReadStream fires different events and 
// we program event-handlers.
//
// Events thrown:
// error  - when error is encountered
// data   - when data chunk is read. Several data events can be thrown
// end    - when entire stream has been read
//
// TO RUN THIS EXAMPLE
// 1. type readAsyncEmit.js on the command line
//---------------------------------------------------------------
  
var fs = require('fs');
var file = fs.createReadStream('./' + "hello.txt");

file.on('error', function(err) {  // attach handler using on
  console.log("-- Error:" + err + " --");
  throw err;
});

file.on('data', function(data) {
  console.log("-- Data event handler1 --");
  console.log("" + data); // "" + converts Buffer to string
});

file.on('data', function(data) { // example of handling multiple handlers
                                 // for the the same event
  console.log("-- Data event handler2 --");
  console.log("read ", data.length, "chars");
});

file.on ('end', function() {
  console.log("-- End event handler --");
  console.log("finished reading all of data");
});
