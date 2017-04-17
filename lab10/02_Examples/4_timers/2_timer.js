//---------------------------------------------------------------
// The purpose is to show use of setInterval function
//
// TO RUN THIS EXAMPLE
// 1. type node 2_timer.js on the command line
//---------------------------------------------------------------

// setInterval calls the function repeatedly at intervals
console.log("-- Starting setInterval --");
var diff = 0, d = new Date();
var timer = setInterval(function() {
  diff = new Date() - d;
  console.log("callback called after: " + diff + "ms");
  d= new Date();
}, 2000); 
