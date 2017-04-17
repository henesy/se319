
var Ticker = require('./testEmitter.js');

var t = new Ticker();

t.foo();

t.on('tick', function(d) {
  console.log("--- Tick --- " + d);
});

t.on('tock', function() {
  console.log("--- Tock --- ");
});

console.log("The end");

