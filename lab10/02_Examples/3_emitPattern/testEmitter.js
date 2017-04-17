var eventEmitter = require('events');

class Ticker extends eventEmitter {

  foo() {
    var self=this;
    var count = 0;
    setInterval(function() {
      count++;
      self.emit('tick', count);
      if (count == 10) {
        self.emit('tock');
        count=0;
      }
    }, 100);
  }

}

module.exports = Ticker;


