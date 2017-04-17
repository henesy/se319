// ------------------------------------------------------------
// The purpose is to go over some basics
// 1. nodejs code is javascript
// 2. cannot use DOM related calls as that would be "client-side"
// 3. process.argv is arguments from command line
//
// RUN THIS PROGRAM by typing the following on the command line 
// node 1_basics.js 1 2 3 4 5
// ------------------------------------------------------------

// CHECK ARGUMENTS -------------
if (process.argv.length <= 2) {
  // note that argv is an array and consists of the
  // word node followed by 1_basics followed by other args
  console.log("usage: node 1_basics.js 1 2 3 4 5");
  return;
}

// DO SOME SIMPLE CALCULATIONS -----------
// calculate sum of numbers provided as command line arguments
var sum = 0;
var i;
for (i = 2; i < process.argv.length; i++) {
  //sum = sum + process.argv[i]; // this will concatenate strings
  sum = sum + Number(process.argv[i]);
}
console.log("The sum of command-line numbers is : ", sum)


// PLAY WITH SIMPLE LIBRARIES --------------
// the require keyword lets us use some module
// fs module (or file system module lets us operate on files and dirs)
var fs = require('fs'); 
  
// path module lets us operate on path
var path = require('path');

// fs.readdir allows us to provide a callback that is called when
// directory has been read
// The below code FILTERS the directory listing and only prints
// js files. It looks at current directory i.e. "."
var buf = fs.readdir(".",
  function(err, data) {
    if (err) { console.log ("error: ", err.message); }
    else {
      // data should have array of files at this point
      console.log("The filtered listing for current directory is:");
      for (i = 0; i < data.length; i++) {
        var s = path.extname(data[i]); // get the extension
        if (s === ".js") { // check if the extension is .js
          console.log(data[i]); // printing js file name
        }
      }
    }
  } // end of callback function
); // end of readdir

