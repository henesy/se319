
var Calc = {

Model : {
total : 0,
stack : new Array(),
mem : 0,
func : ''
},


View : {
  textRow : {id: "textRow", type: "text", value: "", onclick:""},
  add : {id: "add", type: "button", value: '+', onclick:""},
  sub : {id: "sub", type: "button", value: '-', onclick:""},
  mult : {id: "mult", type: "button", value: '*', onclick:""},
  div : {id: "div", type: "button", value: '/', onclick:""},
  dec : {id: "dec", type: "button", value: '.', onclick:""},
  eq : {id: "eq", type: "button", value: '=', onclick:""},
  c : {id: "c", type: "button", value: 'C', onclick:""},
  mr : {id: "mr", type: "button", value: 'MR', onclick:""},
  mm : {id: "mm", type: "button", value: 'M-', onclick:""},
  mp : {id: "mp", type: "button", value: 'M+', onclick:""},
  mc : {id: "mc", type: "button", value: 'MC', onclick:""},
  button0 : {id: "button0", type: "button", value: 0, onclick:""},
  button1 : {id: "button1", type: "button", value: 1, onclick:""},
  button2 : {id: "button2", type: "button", value: 2, onclick:""},
  button3 : {id: "button3", type: "button", value: 3, onclick:""},
  button4 : {id: "button4", type: "button", value: 4, onclick:""},
  button5 : {id: "button5", type: "button", value: 5, onclick:""},
  button6 : {id: "button6", type: "button", value: 6, onclick:""},
  button7 : {id: "button7", type: "button", value: 7, onclick:""},
  button8 : {id: "button8", type: "button", value: 8, onclick:""},
  button9 : {id: "button9", type: "button", value: 9, onclick:""},
},

Controller : {

},

run : function() {
  Calc.attachHandlers();
  console.log(Calc.display());
  return Calc.display();
},


displayElement : function (element) {
  var s = "<input ";
  s += " id=\"" + element.id + "\"";
  s += " type=\"" + element.type + "\"";
  s += " value= \"" + element.value + "\"";
  s += " onclick= \"" + element.onclick + "\"";
  s += ">";
  return s;

},

display : function() {
  var s;
  s = "<table id=\"myTable\" border=2>"
  s += "<tr><td>" + Calc.displayElement(Calc.View.textRow) + "</td></tr>";
	s += "<tr><td>";
	s += Calc.displayElement(Calc.View.button7);
	s += Calc.displayElement(Calc.View.button8);
	s += Calc.displayElement(Calc.View.button9);
	s += Calc.displayElement(Calc.View.add);
	s += "<tr><td>";
	s += Calc.displayElement(Calc.View.button4);
	s += Calc.displayElement(Calc.View.button5);
	s += Calc.displayElement(Calc.View.button6);
	s += Calc.displayElement(Calc.View.sub);
	s += "<tr><td>";
	s += Calc.displayElement(Calc.View.button1);
	s += Calc.displayElement(Calc.View.button2);
	s += Calc.displayElement(Calc.View.button3);
	s += Calc.displayElement(Calc.View.mult);
	s += "<tr><td>";
	s += Calc.displayElement(Calc.View.button0);
	s += Calc.displayElement(Calc.View.dec);
	s += Calc.displayElement(Calc.View.eq);
	s += Calc.displayElement(Calc.View.div);
	s += "<tr><td>";
	s += Calc.displayElement(Calc.View.c);
	s += Calc.displayElement(Calc.View.mr);
	s += Calc.displayElement(Calc.View.mm);
	s += Calc.displayElement(Calc.View.mp);
	s += "<tr><td>";
	s += Calc.displayElement(Calc.View.mc);
  s += "</tr></td></table>";
  return s;
},

attachHandlers : function() {
   for (var i = 0; i <= 9; i++) {
     Calc.View["button" + i].onclick ="Calc.push("+ i+")";
   }
   Calc.View["eq"].onclick ="Calc.equal()";
   Calc.View["add"].onclick ="Calc.func('+')";
   Calc.View["sub"].onclick ="Calc.func('-')";
   Calc.View["mult"].onclick ="Calc.func('*')";
   Calc.View["div"].onclick ="Calc.func('/')";
   Calc.View["dec"].onclick ="Calc.push('.')";
   
   Calc.View["c"].onclick ="Calc.C()";
   Calc.View["mr"].onclick ="Calc.MR()";
   Calc.View["mc"].onclick ="Calc.MC()";
   Calc.View["mp"].onclick ="Calc.MP()";
   Calc.View["mm"].onclick ="Calc.MM()";
},

push : function(num) {
  Calc.Model.stack.push(num);
  document.getElementById("textRow").value += num;
},
func : function(op) {
	Calc.Model.func = op;
	Calc.Model.stack.push('&');
	document.getElementById("textRow").value = "";
},

C : function() {
	document.getElementById("textRow").value = "";
	Calc.Model.stack = [];
},

MC : function() {
	Calc.Model.mem = 0;
},

MR : function() {
	Calc.Model.stack.push(Calc.Model.mem.toString().split("").reverse().join(""));
	document.getElementById("textRow").value = Calc.Model.mem;
},
MP : function() {
	Calc.Model.mem += parseFloat(document.getElementById("textRow").value);
	document.getElementById("textRow").value = ""; // take out
},
MM : function() {
	Calc.Model.mem -= parseFloat(document.getElementById("textRow").value);
	document.getElementById("textRow").value = ""; // take out
},




equal : function() {
	var num1 = "";
	var num2 = "";
	var temp = Calc.Model.stack.pop();
	var op = "";
	while(temp || temp == "0"){
		if(!isNaN(temp) || temp == '.'){
		num1 += temp;
		} else if(temp == "&"){
			break;
		}
		temp = Calc.Model.stack.pop();
	}
	temp = Calc.Model.stack.pop();
	while(temp || temp == "0"){
		if(!isNaN(temp) || temp == '.'){
		num2 += temp;
		}
		temp = Calc.Model.stack.pop();
	}
	console.log(num1 + " " + num2);
	num1 = parseFloat(num1.split("").reverse().join(""));
	num2 = parseFloat(num2.split("").reverse().join(""));
  if(Calc.Model.func == "+"){
	  Calc.Model.total = num1 + num2;
  } else if(Calc.Model.func == "-"){
	  Calc.Model.total = num2 - num1;
  } else if(Calc.Model.func == "*"){
	  Calc.Model.total = num1 * num2;
  } else if(Calc.Model.func == "/"){
	  Calc.Model.total = num2 / num1;
  }
  document.getElementById("textRow").value = Calc.Model.total;
  Calc.Model.stack = [];
  Calc.Model.stack.push(Calc.Model.total.toString().split("").reverse().join(""));
}


} // end of Calc;
