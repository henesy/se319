<script>

// -----------------
// Factory pattern
// issues: instanceof does not work
// -----------------
function createStudent() {
  var o = new Object();
  o.name = "Tom";
  o.foo = function() { console.log("hi");};
  return o;
}

var obj3 = createStudent();


// -----------------
// Constructor pattern
// resolved: instanceof works
// issues: functions duplicated
// -----------------

function Student () { // called a constructor
  this.name = "Tom";
  this.foo = function() {console.log("hi"); };
};

var stu1 = new Student(); // create a new object, assign this, do, return
stu1.name = "Sally";

console.log(JSON.stringify(stu1));
console.log(stu1 instanceof Student);
console.log(stu1 instanceof Object);

var stu2 = new Student();
console.log(JSON.stringify(stu2));

// ONE PROBLEM: the function is duplicated!
console.log(stu1.foo === stu2.foo); // this is FALSE (i.e. methods are duplicated)

// -----------------
// Prototype pattern
// resolved: functions not duplicated
// issues: do not put put references (as they are shared)
// -----------------
function Person() {};

Person.prototype.name = "Nicholas";
Person.prototype.foo = function() {console.log("hi");};
Person.prototype.friends = ["Tom","Sally"];

var p1 = new Person();
var p2 = new Person();




















// -----------------
// Mixture of Constructor and Prototype pattern
// declare data in Constructor and Methods in prototype
// resolved: references not shared
// issues: not like class declarations
// -----------------

function Person() {
  this.name = "Nicholas";
  this.friends = ["Sam","Molly"];
}
Person.prototype.foo = function() {alert("hi");};
var p1 = new Person();
p1.name = "Sally";
var p2 = new Person();

alert("p1's constructor is " + p1.constructor);
alert("p1's prototype is " + p1.prototype);
alert("p2's constructor is " + p2.constructor);
alert("p2's prototype is " + p2.prototype);

p1.friends.push("Jerry");
alert("p1's friends are: " + p1.friends
  + "\np2's friends are: " + p2.friends);

// -----------------
// Class 
// resolved: this is syntactic sugar for above
// -----------------
class Person {
  constructor(s) {
    this._name = s;
    this._friends = ["Sam", "Molly"];
  }

  foo() {
    console.log("hi " + this._name);
    console.log(this._friends);
  }

}

let p1 = new Person("John");
let p2 = new Person("Jane");

p1._friends.push("Folly");

p1.foo();
p2.foo();


class Manager extends Person {

  constructor(s) {
    super(s);
    this._employee = [];
  }

  addEmployee(s) {
    this._employee.push(s);
  }
  

}

m1 = new Manager("Tom");
m1.addEmployee("John");
