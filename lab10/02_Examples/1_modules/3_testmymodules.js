//---------------------------------------------------------------
// The purpose of this program is to TEST our module!
// Now we will be able to create our own libraries and use them.
//
// RUN THIS PROGRAM by typing the following on the command line 
// node 3_testmymodules.js 
//---------------------------------------------------------------
  
//var x = require('./2_mymodule.js'); 
var x = require('./2_mymodule'); // ".js" is optional

x.sayHello(); // we used our module!


// Here we use our module's filterDirectory function
x.filterDirectory("abc", process.argv[2], function(err, data) {
  if (err) { console.error ("error:", err); }
  else {
    data.forEach(function(file) { // here is another array operation
      console.log (file);
    });
  }
});
