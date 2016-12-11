var http = require("http");
var fs = require("fs");

http.createServer(function (request, response) {
	
	fs.readFile("./public/hello.html", "utf8", function(err, data) {
		response.writeHead(200, {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"});
		response.write(data);
		response.end();
	});
	
}).listen(3000);