
function validate(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	
	if(username == "admin" && password == "admin") {
		//librarian view
		window.location.replace("./booksLibrary.html?librarian");
	} else if(username.charAt(0) == "U") {
		//undergrad student view
		window.location.replace("./booksLibrary.html?undergraduate");
	} else {
		//error
		alert("Incorrect Username or Password!")
	}

}