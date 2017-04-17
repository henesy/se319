//---------------------------------------------------------------
// The purpose is to show use of nodejs's Buffer class
// This is important as javascript cannot handle binary and
// so this is a mechanism to handle binary data
// Each buffer corresponds to some RAW memory allocated outside of V8
// engine which stores things in binary. Basically BYTEs of data
//
// TO RUN THIS EXAMPLE
// 1. type node 1_buffer.js on the command line
//---------------------------------------------------------------

//- Example 1
var buf = new Buffer("Hello World", "ascii"); // ascii is 8 bit
console.log(buf);
// prints <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
// converts ascii to binary
  
//- Example 2
buf = new Buffer("Hello World"); // utf-8
console.log(buf);
// <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
// converts utf-8 to binary

//- Example 3
buf = new Buffer("SGVsbG8gV29ybGQ=",'base64');
console.log(buf);
// <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
// converts base64 to binary
// Note that SGVsbG8gV29ybGQ= in base64 is Hello World in ascii

//- Example 4
buf = new Buffer("Kölniऄ"); // utf-8 is a multi-byte encoding
console.log(buf);
//<Buffer 4b | c3 b6 | 6c | 6e | 69 | e0 a4 84 |>
// converts utf-8 to binary. Note that utf-8 is a multi-byte encoding

//- Example 5
buf = new Buffer("8b76fde713ce",'base64'); // base64 is 6-bit encoding
console.log(buf);
//<Buffer f1 be fa 7d d7 bb d7 77 1e>
// Here is the explanation
// 8 is 60  and b is 27 (from base64 table)
// 60 is 111100 and 27 is 011011
// 111100 concatenated with 011011 gives 1111 0001 1101 etc
// same as f 1 b  ... etc


//---------------------------------------------------------------
// OTHER BUFFER OPERATIONS
//---------------------------------------------------------------
//var buf = new Buffer(1024); // 1024 random bytes (not zeroed)
//buf.length // gives length of a buffer
//buf.slice(8,10);  // gives a new buffer from the given indices inclusive
//buf.copy(target,target start, source start, source end);
//buf.toString() // converts binary to utf string
//buf.toString('base64'); // converts binary to base64
//console.log(buf[10]); // this is how one can access a byte


