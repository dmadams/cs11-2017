var net = require("net");

function ChatServer(port) {
    this.port = port;
    this.totalClients = 0;
    this.nextId = 1;
    this.clients = [];
    this.server = net.createServer();

    this.attachListeners();
    this.server.listen(port);
    console.log("Listening on port " + port + ".");
}

// Broadcast the same message to each connected client.
ChatServer.prototype.broadcast = function(message) {
    for (var i = 0; i < this.clients.length; i ++) {
        this.clients[i].write(JSON.stringify(message));
    }
};

// This function is called whenever a new client connection is made.
ChatServer.prototype.onConnection = function(socket) {
    this.totalClients = this.totalClients + 1;

    console.log("Client #" + this.nextId + " connected.");
    socket.write(JSON.stringify({ "type": "OK", "id":  this.nextId}));
    this.broadcast({"type": "JOIN", "clientId": this.nextId})

    socket.on("data", function(data) {
        var d = JSON.parse(data);
        console.log("Received from CLIENT #" + d.id + ": " + d.message);
        this.broadcast({"type": "MSG", "clientId": d.id, "message": d.message});
    }.bind(this));

    socket.on("close", function() {
        this.totalClients = this.totalClients - 1;
        var i = this.clients.indexOf(socket) + 1;
        this.clients.splice(this.clients.indexOf(socket), 1);
        console.log("Client #" + i + " disconnected.");
        this.broadcast({"type": "LEAVE", "clientId": i});
    }.bind(this));

    this.clients.push(socket);
    this.nextId = this.nextId + 1;
};

// Attach listeners for "connection" and "error" events.
ChatServer.prototype.attachListeners = function() {
    this.server.on("connection", function(socket) {
        this.onConnection(socket);
    }.bind(this));
    this.server.on("error", function() {
        console.log("Something went wrong.");
        this.server.end();
    }.bind(this))
};

var server = new ChatServer(4242);
