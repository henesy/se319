var buf = "";

var register = 0;

var Calc = {
		 
Model : {
},


View : {
  textRow : {id: "textRow", type: "text", value: "", onclick:""},
  button7 : {id: "button7", type: "button", value: 7, onclick:""},
  button8 : {id: "button8", type: "button", value: 8, onclick:""},
  button9 : {id: "button9", type: "button", value: 9, onclick:""},
  buttonpl : {id: "buttonpl", type: "button", value: "+", onclick:""},
  button4 : {id: "button4", type: "button", value: 4, onclick:""},
  button5 : {id: "button5", type: "button", value: 5, onclick:""},
  button6 : {id: "button6", type: "button", value: 6, onclick:""},
  buttonmi : {id: "buttonmi", type: "button", value: "-", onclick:""},
  button1 : {id: "button1", type: "button", value: 1, onclick:""},
  button2 : {id: "button2", type: "button", value: 2, onclick:""},
  button3 : {id: "button3", type: "button", value: 3, onclick:""},
  buttonmu : {id: "buttonmu", type: "button", value: "*", onclick:""},
  button0 : {id: "button0", type: "button", value: 0, onclick:""},
  buttonpe : {id: "buttonpe", type: "button", value: ".", onclick:""},
  buttoneq : {id: "buttoneq", type: "button", value: "=", onclick:""},
  buttondi : {id: "buttondi", type: "button", value: "/", onclick:""},
  buttoncl : {id: "buttoncl", type: "button", value: "C", onclick:""},
  buttonmr : {id: "buttonmr", type: "button", value: "MR", onclick:""},
  buttonmm : {id: "buttonmm", type: "button", value: "M-", onclick:""},
  buttonmp : {id: "buttonmp", type: "button", value: "M+", onclick:""},
  buttonmc : {id: "buttonmc", type: "button", value: "MC", onclick:""}
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
  s = "<table id=\"myTable\" border=1>"
  s += "<tr><td>" + Calc.displayElement(Calc.View.textRow) + "</td></tr>";
  s += "<tr><td>";
  s += Calc.displayElement(Calc.View.button7);
  s += Calc.displayElement(Calc.View.button8);
  s += Calc.displayElement(Calc.View.button9);
  s += Calc.displayElement(Calc.View.buttonpl);
  s += "<tr><td>";
  s += Calc.displayElement(Calc.View.button4);
  s += Calc.displayElement(Calc.View.button5);
  s += Calc.displayElement(Calc.View.button6);
  s += Calc.displayElement(Calc.View.buttonmi);
  s += "<tr><td>";
  s += Calc.displayElement(Calc.View.button1);
  s += Calc.displayElement(Calc.View.button2);
  s += Calc.displayElement(Calc.View.button3);
  s += Calc.displayElement(Calc.View.buttonmu);
  s += "<tr><td>";
  s += Calc.displayElement(Calc.View.button0);
  s += Calc.displayElement(Calc.View.buttonpe);
  s += Calc.displayElement(Calc.View.buttoneq);
  s += Calc.displayElement(Calc.View.buttondi);
  s += "<tr><td>";
  s += Calc.displayElement(Calc.View.buttoncl);
  s += Calc.displayElement(Calc.View.buttonmr);
  s += Calc.displayElement(Calc.View.buttonmm);
  s += Calc.displayElement(Calc.View.buttonmp);
  s += "<tr><td>";
  s += Calc.displayElement(Calc.View.buttonmc);
  s += "</tr></td></table>";
  return s;
},

attachHandlers : function() {
  Calc.View.button7.onclick = "Calc.buttonNHandler(7)"; 
  Calc.View.button8.onclick = "Calc.buttonNHandler(8)";
  Calc.View.button9.onclick = "Calc.buttonNHandler(9)";
  Calc.View.buttonpl.onclick = "Calc.buttonNHandler('+')";
  Calc.View.button4.onclick = "Calc.buttonNHandler(4)";
  Calc.View.button5.onclick = "Calc.buttonNHandler(5)";
  Calc.View.button6.onclick = "Calc.buttonNHandler(6)";
  Calc.View.buttonmi.onclick = "Calc.buttonNHandler('-')";
  Calc.View.button1.onclick = "Calc.buttonNHandler(1)";
  Calc.View.button2.onclick = "Calc.buttonNHandler(2)";
  Calc.View.button3.onclick = "Calc.buttonNHandler(3)";
  Calc.View.buttonmu.onclick = "Calc.buttonNHandler('*')";
  Calc.View.button0.onclick = "Calc.buttonNHandler(0)";
  Calc.View.buttonpe.onclick = "Calc.buttonNHandler('.')";
  Calc.View.buttoneq.onclick = "Calc.buttonEqHandler()";
  Calc.View.buttondi.onclick = "Calc.buttonNHandler('/')";
  Calc.View.buttoncl.onclick = "Calc.buttonClHandler()";
  Calc.View.buttonmr.onclick = "Calc.buttonMRHandler()";
  Calc.View.buttonmm.onclick = "Calc.buttonMMHandler()";
  Calc.View.buttonmp.onclick = "Calc.buttonMPHandler()";
  Calc.View.buttonmc.onclick = "Calc.buttonMCHandler()";
},

buttonNHandler : function(n) {
  //alert("Hi");
	buf += n;
	document.getElementById("textRow").value=buf;
},

buttonClHandler : function() {
	buf = "";
	document.getElementById("textRow").value=buf;
},

buttonMCHandler : function() {
	register = 0;
	buf = "";
	document.getElementById("textRow").value=buf;
}

} // end of Calc;
