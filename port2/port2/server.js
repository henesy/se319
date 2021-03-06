var url = require("url");
var http = require("http");
var fs = require("fs");
var qs = require("querystring");

var html = fs.readFileSync("./index.html");
var welcome = fs.readFileSync("./welcome.html");
var welcome_js = fs.readFileSync("./welcome_js.html");
var paint = fs.readFileSync("./paint.html");
var paint_js = fs.readFileSync("./paint_js.html");

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
				var js_string = `
					<script>
					var version = `;
				js_string += version;

				res.end("<html><h3>Username: " + postData.name + "!</h3>" + welcome + js_string + welcome_js);

			} else if(postData.ordo == "paint") {
                s_num++;

                // painting page
                var sid = postData.session;

                    res.writeHead(200, {"Content-Type": "text/html"});
                    var js_string = `
                        <script>
                        var session = `;
                    js_string += sid;

                    res.end("<html><h3>Page for session: " + sid + "!</h3>" + paint + js_string + paint_js);

            } else {
				res.writeHead(200, {"Content-Type": "text/plain"});
				res.end("ERROR!");
			}
		});
	}
}).listen(8080);

console.log('Server is listening to http://localhost/ on port 8080…');
