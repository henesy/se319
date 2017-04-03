var url = require("url");
var http = require("http");
var fs = require("fs");
var qs = require("querystring");

var html = fs.readFileSync("./index.html", "utf8");
var welcome = fs.readFileSync("./welcome.html", "utf8");
var paint = fs.readFileSync("./paint.html", "utf8");

var version = "v0.0.1";

// 100 max sessions
var sessions = new Array();
var sesSize = 100;

//delete existing pictures and create session objects
for(var i=0; i<sesSize; i++){
	sessions.push({answer:"", guess:"", rights:""});
	if(fs.existsSync(__dirname+"/pics/" + i + ".png")) {
		fs.unlinkSync(__dirname+"/pics/" + i + ".png");
	}
}

//String replaceAll helper function
String.prototype.replaceAll = function(target, replacement) {
	return this.split(target).join(replacement);
};


http.createServer(function(req, res) {
	/* primary game logic */
	var reqData = "";

	if(req.method === "GET") {
		if(req.url.indexOf("pic") > -1) {
			//getting image for a session
			var rsid = req.url.split("/")[2].split(".")[0];
			if(fs.existsSync('.' + req.url)) {
				//if there is an image
				var img = fs.readFileSync('.' + req.url);
				res.writeHead(200, {'Content-Type': 'image/png' });
				res.end(img, 'binary');
			} else {
				console.log("File not found");
				res.end();
			}
		} else {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(html);
			res.end();
		}
	} else if(req.method === "POST") {
		/* we're passing information for a page ;; use ordo to determine what page to load, maybe */
		req.setEncoding("utf-8");
		req.on("data", function(data) {
			reqData += data;
		});

		req.on("end", function() {

			var postData = qs.parse(reqData);

			/* decide what page to load */
			if(postData.ordo == "welcome") {
				// welcome page
				res.writeHead(200, {"Content-Type": "text/html"});
				welcome = welcome.replaceAll("$NAME", postData.name);

				res.end("<html><h3>Username: " + postData.name + "!</h3>" + welcome);

			} else if(postData.ordo == "paint") {

				// painting page
				var sid = postData.session;

				res.writeHead(200, {"Content-Type": "text/html"});
				paint = fs.readFileSync("./paint.html", "utf8"); //make live updates to the file
				paint = paint.replaceAll("$Sid", sid);
				paint = paint.replaceAll("$PURL", "/pics/" + sid + ".png");
				paint = paint.replaceAll("$ANS", sessions[sid].answer);
				paint = paint.replaceAll("$GUESSES", sessions[sid].guess);
				paint = paint.replaceAll("$GUES", fs.existsSync(__dirname+"/pics/" + sid + ".png"));
				paint = paint.replaceAll("$NAME", postData.name);

				res.end("<html><h3>Page for session: " + sid + "!</h3>" + paint);

			} else if(postData.ordo == "picture") {
				var matches =  postData.canvas.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),response = {};
				fs.writeFile(__dirname+"/pics/"+postData.session+".png", new Buffer(matches[2], 'base64'), function(err) {
					if(err) {
						return console.log(err);
					}
					sessions[postData.session].answer=postData.answer.toLowerCase();
					console.log(postData.answer + " for " + postData.session);

					console.log("The file was saved!");
				});
				res.end();
			} else if(postData.ordo == "guess") {
				sessions[postData.session].guess += "<br />"+postData.guess.toLowerCase()+ "    -"+postData.name;
				if(sessions[postData.session].answer==postData.guess.toLowerCase()){
					sessions[postData.session].rights += "$"+postData.name;
				}
				res.end();
			} else if(postData.ordo == "getguess") {
				res.end(sessions[postData.session].guess);
			} else if(postData.ordo == "getList") {
				var writeString = "";
				var here = false;
				console.log(sessions[0].rights);
				for(var i=0; i<sesSize; i++){
					if(sessions[i].rights.indexOf("$"+postData.name)>-1){
						writeString += "O";
					}else if(sessions[i].answer.length>0){
						writeString += "G";
					}else{
						writeString += "N";
					}
				}
				res.end(writeString);
			}  else {
				res.writeHead(200, {"Content-Type": "text/plain"});
				res.end("ERROR!");
			}
		});
	}
}).listen(8080);



console.log('Server is listening to http://localhost/ on port 8080…');