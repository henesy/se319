//---------------------------------------------------------------
// The purpose is to show how to sequence repeated calls using timeout 
// so that they do not overlap
// This is a technique by which the next run of a task is started some
// fixed interval AFTER a previous run is completed 
//
// Key idea is that setInterval might not have worked because once in a
// while the someRandomTimeFunction would run longer than the firing
// interval and so you could have overlaps of the function execution
//
// TO RUN THIS EXAMPLE
// 1. type node 3_timer.js on the command line
// wait for at least 30 seconds.
//---------------------------------------------------------------


function someRandomTimeLongFunction(callback) {
  console.log("start task");
  // do something
  // then call the callback
  callback();
}

console.log("-- starting sequence --");
(function schedule() {
  setTimeout(function () {
    someRandomTimeLongFunction(function() {
      console.log("completed task");
      schedule();
    });
  }, 5000);
}());


