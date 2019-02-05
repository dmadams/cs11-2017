var fs = require("fs");
var http = require("http");
var url = require("url");

fs.readFile("greetings.txt", function(err, buffer){
    if (err === null) {
        var d = buffer.toString();
        var greetings = d.split("\n");
        var g = "";

        http.createServer(function(req, res) {
            g = greetings[Math.floor(Math.random() * greetings.length)];
            var query = url.parse(req.url, true).query;
            res.writeHead(200, {"Content-Type": "text/plain"});
            if (!query.name) {
                res.write(g);
            }
            else {
                res.write(g + ", " + query.name);
            }
            res.end();
        }).listen(8080);
    }
    else { console.log(err); }
});