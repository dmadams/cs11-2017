var net = require("net");
var readline = require("readline");

function ChatClient(port) {
    this.io = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // this.client is a socket connecting the client with the server
    this.client = net.connect(port);
    this.clientId = null;

    this.attachIOListeners();
    this.attachChatListeners();
};

ChatClient.prototype.attachIOListeners = function() {
    this.io.on("line", function(message) {
        this.client.write(JSON.stringify({"id": this.clientId, "message": message}));
    }.bind(this));

    this.io.on("SIGINT", function() {
        console.log("Closing client...");
        
        this.io.close();
        this.client.end()
        this.clientId = null;
    }.bind(this));
};

ChatClient.prototype.attachChatListeners = function() {
    this.client.on("data", function(data) {
        var d = JSON.parse(data);
        if (d.type === "OK") {
            this.clientId = d.id;
            console.log("You joined the chat.");
            console.log("You are CLIENT #" + this.clientId + ".");
        }
        else if (d.type === "MSG") {
            if (d.clientId === this.clientId) {
                console.log("ME: " + d.message);
            }
            else {
                console.log("CLIENT #" + d.clientId + ": " + d.message);
            }
        }
        else if (d.type === "JOIN") {
            console.log("CLIENT #" + d.clientId + " connected.");
        }
        else if (d.type === "LEAVE") {
            console.log("CLIENT #" + d.clientId + " disconnected.");
        }
    }.bind(this));
    this.client.on("end", function() {
        if(this.client) {
            console.log("Disconnected from server.");
            
            this.io.close();
            this.client.end();
            this.clientId = null;
        }
    }.bind(this));

    this.client.on("error", function(e) {
        console.log("Closing client...");
        
        this.io.close();
        this.client.end();
        this.clientId = null;
    }.bind(this));
};

var client = new ChatClient(4242);
