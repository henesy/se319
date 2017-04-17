module.exports =  {
   sayHi: function () { console.log("Hi"); },

   filterDirectory: function(dir, ext, callback) {
     var fs = require('fs');
     var path = require('path');

     var filterArray = [];

     fs.readdir(dir, function(err, data) {

        if (err) {
           callback(err);
        }
        else {
        
          for (i=0; i < data.length; i++) {
            if(path.extname(data[i]) === ext){
              filterArray.push(data[i]);
            }

          }

          callback(null, filterArray);
        }

     });


   }



}
