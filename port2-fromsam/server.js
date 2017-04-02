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
var blankVal = sessions[0];

function getPath(request) {
  var path = url.parse(request.url).pathname;
  return path;
}
exports.getPath = getPath;

http.createServer(function(req, res) {
	/* primary game logic */
	var reqData = "";

	if(req.method === "GET") {
		if(req.url.indexOf("pic") > -1) {
			//getting image for a session
			var img = fs.readFileSync('.' + req.url);
			res.writeHead(200, {'Content-Type': 'image/png' });
			res.end(img, 'binary');
			console.log(req.url);
		} else {
			/* request for a page */
			res.writeHead(200, {"Content-Type": "text/html"});
			//response.writeHead(200, {"Content-Type": "text/plain"});
			//response.write("Hello from the Node.js server!");
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

				//welcome = welcome.replace("$Version", version);

				res.end("<html><h3>Username: " + postData.name + "!</h3>" + welcome);

			} else if(postData.ordo == "paint") {
                s_num++;

                // painting page
                var sid = postData.session;
				//var ans = postData.answer;

                res.writeHead(200, {"Content-Type": "text/html"});
				paint = fs.readFileSync("./paint.html", "utf8"); //make live updates
				paint = paint.replace("$Sid", sid);
				paint = paint.replace("$PURL", "/pics/" + sid + ".png");
				paint = paint.replace("$ANS", sessions[sid]);
				if(sessions[sid] != blankVal) {
					paint = paint.replace("$SAT", "$(\"#creator\").hide();");
				} else {
					//no answer yet
					paint = paint.replace("$SAT", "$(\"#guessor\").hide();");
				}


                res.end("<html><h3>Page for session: " + sid + "!</h3>" + paint);

            } else if(postData.ordo == "picture") {
				  var matches =  postData.canvas.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
					response = {};
				  fs.writeFile(__dirname+"/pics/"+postData.session+".png", new Buffer(matches[2], 'base64'), function(err) {
					if(err) {
						return console.log(err);
					}
					sessions[postData.session] = postData.answer;
					console.log(postData.answer + " for " + postData.session);

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
