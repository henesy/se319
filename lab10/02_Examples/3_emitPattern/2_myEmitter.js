//---------------------------------------------------------------
// The purpose here is to create your very own emitter!
// Users of your program will be able to add listeners and handle 
// events that are fired from YOUR program
// util allows you to use inherits functionality
// events allow you to use the emit functionality
//---------------------------------------------------------------

var eventEmitter = require('events')

class Ticker extends eventEmitter {

  foo() {
    var self = this;
    var count= 0;
    setInterval (function() {
       self.emit('tick', ++count);
       if (count % 10 == 0) self.emit('dong');
    }, 1) ;
  }

};
// Our function will emit TWO events
// dong - this will be fired on every TEN ticks
// tick - this will also send info on how many times tick was fired
// ** NOTE how tick sends back a parameter to the listener too!


module.exports = Ticker;

