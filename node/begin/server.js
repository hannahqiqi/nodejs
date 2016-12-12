var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer(function (request, response) {
	
	var fullPath = url.parse(request.url, true);
	var pathArr = fullPath.pathname.split(".");
	
	fs.readFile("./public" + fullPath.pathname, "utf8", function(err, data) {
		if (err) {
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.end("The page you found does not exist.");
		}
		response.end(data);	
	});
	
}).listen(3003);