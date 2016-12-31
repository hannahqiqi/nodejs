var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get("/", function (req, res) {
	res.send("hello world");
});

app.get("/welcome", function (req, res) {
	res.send("welcome!");
});

app.post("/login", function(req, res) {
	res.sendFile(__dirname + '/public/succ.html');
});
app.listen(3006);