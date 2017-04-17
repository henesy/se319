//---------------------------------------------------------------
// The purpose of this file is to show difference between
// normal synchronous calls - where we have to WAIT for i/o
// and callbacks where we do not have to wait for i/o
//
// readFileSync is a normal wait call (as in java)
// readFile takes in a callback.
//
// In the modules example, we had created a "filterDirectory"
// function that accepted a callback.
//
// TO RUN THIS EXAMPLE
// 1. type node countNewLines.js on the command line
//---------------------------------------------------------------
var fs = require('fs');

// SYNCHRONOUS CALL -------------
console.log("\n- Testing Synchronous call -");
var buf = fs.readFileSync("hello.txt"); 
// cannot do the next statement until the previous one is done.
var sArray = buf.toString().split("\n");
console.log("The number of lines in file is : ", sArray.length-1);
console.log("\n\n");


// ASYNC CALL --------------------
console.log("\n- Testing ASynchronous call -");
var buf = fs.readFile("hello.txt", 
  function(err, data) {
    var sArray = data.toString().split("\n");
    console.log("The number of lines in file is : ", sArray.length-1);
} );
console.log("We do not wait for the i/o. The callback is called when i/o is done!");
console.log("So we are printed out of sequence! Cool?");
