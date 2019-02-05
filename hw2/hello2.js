var fs = require("fs");
var readline = require("readline");

var buffer = fs.readFileSync("greetings.txt");
var d = buffer.toString();
var greetings = d.split("\n");
var g = "";

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("What is your name? ", function(data) {
    for (i = 0; i < 5; i++) {
        g = greetings[Math.floor(Math.random() * greetings.length)];
        console.log(g + ", " + data);
    }
    rl.close();
});