

module.exports = {

  sayHello: function() {
    console.log("Hello");
  },

  filterDirectory: function(dir, ext, callback) {
     var fs = require('fs');
     var path = require('path');
     var retValue = [];

     fs.readdir(dir, function(err, data) {
        for (i=0; i<data.length; i++) {
          // retValue = data.filter(function(f) {
          //    return path.extname(f) === '.' + ext
          // });
          if (path.extname(data[i]) === '.' + ext) {
            retValue.push(data[i]);
          }
        }
        callback(null,retValue);

     });


  }






};
