var express = require('express');
var cors = require('cors');
var app = express();
app.use(express.json());
app.use(cors());
//========================================================
//SOCKET IO
var http = require("http");
var Server = require("socket.io").Server;
var server = http.createServer(app);
var io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
io.on("connection", function (socket) {
    socket.on("join_room", function (data) {
        socket.join(data);
        console.log("User with ID: ".concat(socket.id, " joined room: ").concat(data));
    });
    socket.on("send_message", function (data) {
        socket.to(data.room).emit("receive_message", data);
        console.log(data);
    });
    socket.on("disconnect", function (data) {
        console.log("User Disonnected from ".concat(socket.id, " "));
    });
});
server.listen(8000, function () { console.log("=== Socket io is Running! on port 8000 ==="); });
//========================================================
