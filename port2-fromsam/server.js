var url = require("url");
var http = require("http");
var fs = require("fs");
var qs = require("querystring");

var html = fs.readFileSync("./index.html", "utf8");
var welcome = fs.readFileSync("./welcome.html", "utf8");
var paint = fs.readFileSync("./paint.html", "utf8");

var version = "v0.0.1";

// 100 max sessions
var sessions = new Array(100);
var s_num = 0;

function getPath(request) {
  var path = url.parse(request.url).pathname;
  return path;
}
exports.getPath = getPath;

http.createServer(function(req, res) {
	/* primary game logic */
	var reqData = "";

	if(req.method === "GET") {
		/* request for a page */
		res.writeHead(200, {"Content-Type": "text/html"});
		//response.writeHead(200, {"Content-Type": "text/plain"});
		//response.write("Hello from the Node.js server!");
		res.write(html);
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
			if(postData.ordo == "welcome") {
                // welcome page
				res.writeHead(200, {"Content-Type": "text/html"});
				
				//welcome = welcome.replace("$Version", version);

				res.end("<html><h3>Username: " + postData.name + "!</h3>" + welcome);

			} else if(postData.ordo == "paint") {
                s_num++;

                // painting page
                var sid = postData.session;

                    res.writeHead(200, {"Content-Type": "text/html"});
					paint = fs.readFileSync("./paint.html", "utf8"); //make live updates
					paint = paint.replace("$Sid", sid);
					
                    res.end("<html><h3>Page for session: " + sid + "!</h3>" + paint);

            } else if(postData.ordo == "picture") {
				  var matches =  postData.canvas.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
					response = {};
				  fs.writeFile(__dirname+"/pics/"+postData.session+".png", new Buffer(matches[2], 'base64'), function(err) {
					if(err) {
						return console.log(err);
					}

					console.log("The file was saved!");
				  });
            } else {
				res.writeHead(200, {"Content-Type": "text/plain"});
				res.end("ERROR!");
			}
		});
	}
}).listen(8080);

console.log('Server is listening to http://localhost/ on port 8080…');
