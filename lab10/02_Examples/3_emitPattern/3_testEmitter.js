//---------------------------------------------------------------
// The purpose of this program is to check if our emitter
// was working properly!
//
// TO RUN THIS EXAMPLE
// 1. type node 3_testEmitter.js on the command line
//---------------------------------------------------------------
function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

var Ticker = require("./2_myEmitter"); // that's a function

var start =  new Date().getTime();
var ticker = new Ticker(); // here we construct an object
ticker.foo();
var tickerOn=  new Date().getTime();

sleepFor(1000);

// attach handlers
//console.log("time till tickerOn: "+(tickerOn-start));
ticker.on ('tick', function(cnt) {
   var end =  new Date().getTime();
   console.log("time till ding" + cnt + ": "+(end-tickerOn));
});

setTimeout(function() {
ticker.on ('dong', function() {
   var end =  new Date().getTime();
   console.log("time till dong: "+(end-tickerOn));
});
}, 500);

var end =  new Date().getTime();
console.log("time till end: "+(end-start));
