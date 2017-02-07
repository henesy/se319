function validate2() {
    var email = document.forms["validation2"]["email"].value;
	var phone = document.forms["validation2"]["phone"].value;
	var address = document.forms["validation2"]["address"].value;
	var checke = emailCheck(email);
	var checkp = phoneCheck(phone);
	var checka = addCheck(address);
	
	
	
	var emaili = getImage(checke,"email");
    document.getElementById("Email").appendChild(emaili);
	var phonei = getImage(checkp,"phone");
    document.getElementById("Phone").appendChild(phonei);
	var addi = getImage(checka,"address");
    document.getElementById("Address").appendChild(addi);
	if(checke && checkp && checka){
		localStorage.setItem("address", address);
		location.href = './geo.html';
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

function phoneCheck(entry) {
	first = entry.split('-')[0];
	second = entry.split('-')[1];
	third = entry.split('-')[2];
	
	console.log(entry.length);
    let regex = /^[0-9]+$/i;
	if(entry==""){
		return true;
	}
	if(first && second && third && entry.length<=12){
	if (first.length == 3 && second.length == 3 && third.length == 4 && first.match(regex) &&second.match(regex)&&third.match(regex)){
        return true;
    } else {
        return false;
    }
	}else if(first && !second && !third && entry.length==10 && entry.match(regex)){
		return true;
	} else{
		return false;
	}
}

function emailCheck(email) {
    atSplit = email.split('@');
    if (atSplit.length == 2 && alphaNumCheck(atSplit[0])) {
        periodSplit = atSplit[1].split('.')
        if (periodSplit.length == 2 && alphaNumCheck(periodSplit[0] + periodSplit[1])) {
            return true;
        }
    }
    valCheck = false;
    return false;
}
function addCheck(entry){
	let regex = "[a-zA-Z]+,+ +[a-zA-Z]{2}$";
	if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}
function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}