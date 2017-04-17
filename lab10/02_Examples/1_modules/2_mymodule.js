//---------------------------------------------------------------
// The purpose is to learn to create our OWN modules or libraries
// (just like fs or path etc)
// The key is to set module.exports appropriately
//---------------------------------------------------------------

// You can set this to whatever you want, but usually objects
// we create an object that has two functions
// The first one is sayHello
// The second one is filterDirectory
//
//exports.test = {
module.exports = {
  sayHello: function () {
    console.log("hello!");
  },

  filterDirectory : function (dir, ext, callback) {
     var fs = require('fs');
     var path = require('path');
     var retValue =[]; // empty array
     fs.readdir(dir, function(err, data) {
        if (err) { callback(err); }
        else { 
          retValue = data.filter(function(filename) {
            return path.extname(filename) === "." + ext;
          }); // note that filter is an operation provided on arrays
          callback(null, retValue);
        } // end else on error
    });
  }
}; // end of object for module.exports
