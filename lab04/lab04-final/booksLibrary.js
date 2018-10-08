// Group 20 

//sortBooks(Library)

class Library {
	constructor() {
		this.numBooks = 25; // initial value
		this.cats = ["Art","Science","Sport","Literature"];
		this.shelfs = [new Shelf(this.cats[0]),new Shelf(this.cats[1]),new Shelf(this.cats[2]),new Shelf(this.cats[3])];
		this.Books = [];
		for (var i = 0; i < this.numBooks; i++) {
			this.Books[i] = new Book("B"+i);
			//categorize book as Art
			if (this.Books[i].returnID()%4==0){
				this.shelfs[0].add(this.Books[i]);
			}
			// categorize book as science
			else if (this.Books[i].returnID()%4==1){
				this.shelfs[1].add(this.Books[i]);
			}
			//categorize book as Sport
			else if (this.Books[i].returnID()%4==2){
				this.shelfs[2].add(this.Books[i]);
			}
			//categorize book as Literature
			else if (this.Books[i].returnID()%4==3){
				this.shelfs[3].add(this.Books[i]);
				console.log("Lit book added");
			}	
		}
	}
	updateOld(oldLib) {
		this.numBooks = oldLib.numBooks;
		this.cats = oldLib.cats;
		
		for (var i = 0; i < oldLib.shelfs.length; i++) {
			this.shelfs[i].load(oldLib.shelfs[i]);
		}
		for (var i = 0; i < this.numBooks; i++) {
			if(this.Books[i]==null){
				this.Books[i] = new Book("B"+i);
			}
			this.Books[i].load(oldLib.Books[i]);
			console.log(this.Books[i]);
			console.log(oldLib.Books[i]);
			//categorize book as Art
			if (this.Books[i].returnID()%4==0){
				this.shelfs[0].add(this.Books[i]);
			}
			// categorize book as science
			else if (this.Books[i].returnID()%4==1){
				this.shelfs[1].add(this.Books[i]);
			}
			//categorize book as Sport
			else if (this.Books[i].returnID()%4==2){
				this.shelfs[2].add(this.Books[i]);
			}
			//categorize book as Literature
			else if (this.Books[i].returnID()%4==3){
				this.shelfs[3].add(this.Books[i]);
				console.log("Lit book added");
			}	
		}
		
	}
	
	save(){
		localStorage.setItem("Lib", JSON.stringify(this));
	}
	
	returnShelf(name){
		return this.shelfs[(this.cats.indexOf(name))];
	}
	returnCats (){
		return this.cats;
	}
	add(name,shelf){
		this.numBooks++;
		this.Books[this.Books.length] = new Book(name);
		this.shelfs[(this.cats.indexOf(shelf.trim()))].add(this.Books[this.Books.length-1]);
		var newID=0;
		this.save();
	}
	rent(id,name,returnB){
		for(var i = 0; i<this.shelfs.length;i++){
			this.shelfs[i].rent(id,name,returnB);
		}
		this.save();
	}
	
	info(id){
		var str = "";
		for(var i = 0; i<this.shelfs.length;i++){
			str += this.shelfs[i].info(id);
		}
		return str;
	}
	
}


class Shelf {
	// can be type Art, Science, Sport, or Literature
	constructor(category) {
		this.Cat = category;
		this.cats = ["Art","Science","Sport","Literature"];
		this._Books = [];
		//myShelf._Books.push(new Book());
	}	
	
	add(book){
		while(!(this.Cat==this.cats[0] && book.returnID()%4==0) && !(this.Cat==this.cats[1] && book.returnID()%4==1) && !(this.Cat==this.cats[2] && book.returnID()%4==2) && !(this.Cat==this.cats[3] && book.returnID()%4==3)){
			book.changeID(Math.floor((Math.random() * 999) + 100)); //3 digit ID
			console.log(this.Cat);
			for(var i =0; i<this._Books.length;i++){
				if(this._Books[i].returnID()==book.returnID()){
					continue;
				}
			}
		}
		this._Books.push(book);
	}
	
	returnBooks(){
		return this._Books;
	}
	
	rent(id,name,returnB){
		for(var i = 0; i<this._Books.length;i++){
			if(this._Books[i].returnID() == id){
				this._Books[i].rent(name,returnB);
			}
		}
	}
	
	load(oldShelve){
		this.Cat = oldShelve.Cat;
		this._Books = [];
	}	
	
	info(id){
		var str = "";
		for(var i = 0; i<this._Books.length;i++){
			if(this._Books[i].returnID() == id){
				str+=this._Books[i].info(id);
			}
		}
		if(str!=""){
			return str+=this.Cat;
		}
		return str;
	}
}


class Book {
	constructor(name) {
		this.BookID = Math.floor((Math.random() * 999) + 100); //3 digit ID
		this.name = name;
		//move to local storage (?)
		this.borrowedBy = "nil";
		this.available = 1;
	}
	changeID(ID){
		this.BookID = ID;
	}
	returnID(){
		return this.BookID;
	}
	
	name(index){
		return this.name[index];
	}
	
	rented(){
		return this.available;
	}
	
	rent(name,returnB){
		this.available = returnB;
		this.borrowedBy = name;
	}
	
	borrowed(){
		return this.borrowedBy;
	}
	
	load(oldBook){
		this.BookID = oldBook.BookID;
		this.name = oldBook.name;
		this.borrowedBy = oldBook.borrowedBy;
		this.available = oldBook.available;
	}
	
	info(id){
		if(id = this.BookID){
			return this.name + " "+ this.BookID + " ";
		}
		return "";
	}
}


//primary operative

$(document).ready(function() {
	var view = window.location.search.substring(1);
	var Lib = new Library();
	if(localStorage.getItem("Lib") != null){
		Lib.updateOld(JSON.parse(localStorage.getItem("Lib")));
	}
	Lib.save();
	
	$(".librarian").hide();
	$(".undergrad").hide();
	
	if(view.indexOf("librarian") != -1) {
		$(".librarian").show();
	} else if(view.indexOf("U") != -1) {
		$(".undergrad").show();
	} else {
		alert("Invalid Session!");
		window.location.replace("./login.html");
	}
	table();
	function table(){
		//make the table
		var mytable = $("<table border='2' id='tabody'></table>"); // creates DOM elements
		var mytablebody = $('<tbody></tbody>');

		for(row = 0; row < Lib.returnCats().length; row++) {
			curr_row = $('<tr id="trs"></tr>');
			var curShelf = Lib.returnShelf(Lib.returnCats()[row]).returnBooks();
			//console.log(curShelf);
			for(col = 0; col < curShelf.length; col++) {
				var rents = curShelf[col].rented()==0;
				var rentsMe = curShelf[col].borrowed() == view;
				var insert = "white";
				if(rents && rentsMe){
					insert = "red";
				} else if(rents){
					insert = "gray";
				}
				curr_cell = $('<td id="'+curShelf[col].returnID()+'" style="background-color: '+ insert +';" ></td>');
				if(col==0){
					curr_text = Lib.returnCats()[row];
				} else{
					curr_text = curShelf[col].name;
				}
				curr_cell.append(curr_text);
				curr_row.append(curr_cell);
			}
			mytablebody.append(curr_row); // appends arg to mytablebody
		}
		mytable.append(mytablebody);
		mytable.insertBefore($('#tablecreate')); // real dom from document!

		$("tr#trs td").click(function(e) {
			$("#info").text(Lib.info($(this).attr("id")));
			if(view.indexOf("U") == 0) {
			if($(this).css("background-color") == "rgb(255, 0, 0)"){
				$(this).css("background-color", "white");
				Lib.rent($(this).attr("id"),"nil",1);
				return;
			} else if($(this).css("background-color") == "rgb(128, 128, 128)"){
				return;
			}
			var num = 0;
			($("tr#trs td")).each(function() {
				if($(this).css("background-color") == "rgb(255, 0, 0)"){
					num++;
				}
			});
			if(num<2){
				$(this).css("background-color", "red");
				Lib.rent($(this).attr("id"),view,0);////name
			}
			}
		});
	}
	
	$("#add").click(function() {
		console.log("Adding: " +$("#book").val() + " at " +$("#shelf").val());
		Lib.add($("#book").val(),$("#shelf").val());
		$("#tabody").remove();
		table();
	});
	
});





