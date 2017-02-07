function validate() {
    var fname = document.forms["validation1"]["fname"].value;
	var sname = document.forms["validation1"]["sname"].value;
	var gender = document.forms["validation1"]["gender"].value;
	var state = document.forms["validation1"]["state"].value;
	var fcheck = alphaNumCheck(fname)
	var scheck = alphaNumCheck(sname)
	
	var fnamei = getImage(fcheck,"fname");
    document.getElementById("Fname").appendChild(fnamei);
	var snamei = getImage(scheck,"sname");
    document.getElementById("Sname").appendChild(snamei);
	var genderi = getImage(gender,"gender");
    document.getElementById("Gender").appendChild(genderi);
	var statei = getImage(state,"state");
    document.getElementById("State").appendChild(statei);
	if(fcheck && scheck && gender && state){
		localStorage.setItem("state", state);
		location.href = './validation2.html';
	}
	
}



function getImage(bool, ID) {
    var image = document.getElementById("image" + ID);
    if (image == null) {
        image = new Image(15, 15);
        image.id = "image" + ID;
    }
    image.src = bool ? './correct.png' : './wrong.png';
    return image;
}

function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}