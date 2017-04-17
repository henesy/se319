//1 just run, process command line args
//

// 2 show debugger

// 3 use fs module fs.readdir(dir, handler)
// path.extname(path) gives extension
//




// 4 create own module sayHello and
// filterDirectory + callback pattern

  
// 5 sync read and async read   
// readFileSync(f), readFile(f, callback)

// 6 createReadStream(f) + attach handlers
// data error end

var fs = require('fs');

var rs = fs.createReadStream("testxcxc.js");

rs.on('error', function(err) {
  console.log(err);
})
rs.on('data', function(d) {
  console.log(d);
})
rs.on('end', function() {
  console.log("--- DONE ---");
})



// 7 creating event emitters
  
