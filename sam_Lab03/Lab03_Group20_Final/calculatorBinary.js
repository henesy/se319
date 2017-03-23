var Calc = {

Model : {
total : 0,
stack : new Array(),
mem : 0,
func : ''
},


View : {
  textRow : {id: "textRow", type: "text", value: "", onclick:""},
  not : {id: "not", type: "button", value: '~', onclick:""},
  mod : {id: "mod", type: "button", value: '%', onclick:""},
  sl : {id: "sl", type: "button", value: '<<', onclick:""},
  sr : {id: "sr", type: "button", value: '>>', onclick:""},
  and : {id: "and", type: "button", value: '&', onclick:""},
  or : {id: "or", type: "button", value: '|', onclick:""},
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
	s += Calc.displayElement(Calc.View.button1);
	s += Calc.displayElement(Calc.View.button0);
	s += Calc.displayElement(Calc.View.not);
	s += "<tr><td>";
	s += Calc.displayElement(Calc.View.add);
	s += Calc.displayElement(Calc.View.mod);
	s += Calc.displayElement(Calc.View.sl);
	s += "<tr><td>";
	s += Calc.displayElement(Calc.View.sr);
	s += Calc.displayElement(Calc.View.sub);
	s += Calc.displayElement(Calc.View.and);
	s += "<tr><td>";
	s += Calc.displayElement(Calc.View.or);
	s += Calc.displayElement(Calc.View.mult);
	s += Calc.displayElement(Calc.View.div);
	s += "<tr><td>";
	s += Calc.displayElement(Calc.View.mr);
	s += Calc.displayElement(Calc.View.mm);
	s += Calc.displayElement(Calc.View.mp);
	s += "<tr><td>";
	s += Calc.displayElement(Calc.View.c);
	s += Calc.displayElement(Calc.View.mc);
	s += Calc.displayElement(Calc.View.eq);
  s += "</tr></td></table>";
  return s;
},

attachHandlers : function() {
   Calc.View["button0"].onclick ="Calc.push(0)";
   Calc.View["button1"].onclick ="Calc.push(1)";
   Calc.View["eq"].onclick ="Calc.equal()";
   Calc.View["add"].onclick ="Calc.func('+')";
   Calc.View["sub"].onclick ="Calc.func('-')";
   Calc.View["mult"].onclick ="Calc.func('*')";
   Calc.View["div"].onclick ="Calc.func('/')";
   Calc.View["mod"].onclick ="Calc.func('%')";
   Calc.View["and"].onclick ="Calc.func('&')";
   Calc.View["or"].onclick ="Calc.func('|')";
   
   Calc.View["not"].onclick ="Calc.NOT()";
   Calc.View["sr"].onclick ="Calc.SR()";
   Calc.View["sl"].onclick ="Calc.SL()";
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
	document.getElementById("textRow").value = Calc.Model.mem.toString(2);
},
MP : function() {
	Calc.Model.mem += parseInt(document.getElementById("textRow").value,2);
	document.getElementById("textRow").value = ""; // take out
},
MM : function() {
	Calc.Model.mem -= parseInt(document.getElementById("textRow").value,2);
	document.getElementById("textRow").value = ""; // take out
},

SR : function() {
	document.getElementById("textRow").value = document.getElementById("textRow").value + "0";
	Calc.Model.stack = [];
	Calc.Model.stack.push(document.getElementById("textRow").value.toString().split("").reverse().join(""));
},

SL : function() {
	document.getElementById("textRow").value = "0" + document.getElementById("textRow").value ;
	Calc.Model.stack = [];
	Calc.Model.stack.push(document.getElementById("textRow").value.toString().split("").reverse().join(""));
},

NOT : function() {
	document.getElementById("textRow").value = document.getElementById("textRow").value.replace(/0/gi,"2").replace(/1/gi,"0").replace(/2/gi,"1");
	Calc.Model.stack = [];
	Calc.Model.stack.push(document.getElementById("textRow").value.toString().split("").reverse().join(""));
},

equal : function() {
	var num1 = "";
	var num2 = "";
	var temp = Calc.Model.stack.pop();
	var op = "";
	while(temp || temp == "0"){
		if(!isNaN(temp)){
		num1 += temp;
		} else if(temp == "&"){
			break;
		}
		temp = Calc.Model.stack.pop();
	}
	temp = Calc.Model.stack.pop();
	while(temp || temp == "0"){
		if(!isNaN(temp)){
		num2 += temp;
		}
		temp = Calc.Model.stack.pop();
	}
	console.log(num1 + " " + num2);
	num1 = parseInt(num1.split("").reverse().join(""),2);
	num2 = parseInt(num2.split("").reverse().join(""),2);
  if(Calc.Model.func == "+"){
	  Calc.Model.total = num1 + num2;
  } else if(Calc.Model.func == "-"){
	  Calc.Model.total = num2 - num1;
  } else if(Calc.Model.func == "*"){
	  Calc.Model.total = num1 * num2;
  } else if(Calc.Model.func == "/"){
	  Calc.Model.total = num2 / num1;
  } else if (Calc.Model.func == "%"){
	  Calc.Model.total = num2 % num1;
  } else if (Calc.Model.func == "&"){
	  Calc.Model.total = num2 & num1;
  } else if (Calc.Model.func == "|"){
	  Calc.Model.total = num2 | num1;
  }
  document.getElementById("textRow").value = (Calc.Model.total).toString(2);
  Calc.Model.stack = [];
  Calc.Model.stack.push(Calc.Model.total.toString(2).split("").reverse().join(""));
}


} // end of Calc;
