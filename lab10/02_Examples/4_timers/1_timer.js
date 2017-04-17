//---------------------------------------------------------------
// The purpose is to show use of setTimeout function
//
// TO RUN THIS EXAMPLE
// 1. type node 1_timer.js on the command line
//---------------------------------------------------------------

// setTimeout just calls the function when the time runs out.
console.log("-- Starting setTimeout --");
var diff = 0, d = new Date();
var timer = setTimeout(function() {
  diff = new Date() - d;
  console.log("timed out after: " + diff + "ms");
}, 2000); 
