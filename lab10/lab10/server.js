var url = require("url");
var http = require("http");
var fs = require("fs");
var qs = require("querystring");


//String replaceAll helper function
String.prototype.replaceAll = function(target, replacement) {
	return this.split(target).join(replacement);
};


http.createServer(function(req, res) {
	/* primary game logic */
	var reqData = "";

	if(req.method === "GET") {
		//req.url is url
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(fs.readFileSync("./index.html", "utf8"));
		res.end();
	} else if(req.method === "POST") {
		/* we're passing information for a page ;; use ordo to determine what page to load, maybe */
		req.setEncoding("utf-8");
		req.on("data", function(data) {
			reqData += data;
		});

		req.on("end", function() {

			var postData = qs.parse(reqData);

			/* decide what page to load */
			if(postData.ordo == "home") {
				// home page
				res.writeHead(200, {"Content-Type": "text/html"});
				welcome = fs.readFileSync("./welcome.html", "utf8");
				welcome = welcome.replaceAll("$NAME", postData.name);

				res.end("<html><h3>Username: " + postData.name + "!</h3>" + welcome);

			}  else {
				res.writeHead(200, {"Content-Type": "text/plain"});
				res.end("ERROR!");
			}
		});
	}
}).listen(8080);


console.log('Server is listening to http://localhost/ on port 8080…');
