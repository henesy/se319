var util = require('util');
var eventEmitter = require('events').EventEmitter;

var Ticker = function() {
  var self = this;
  setInterval(function() {
    self.emit('tick');
  }, 1000);
  setInterval(function() {
    self.emit('tock');
  }, 5000);

}

util.inherits(Ticker, eventEmitter);

module.exports = Ticker;
