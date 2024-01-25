const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

//========================================================
//SOCKET IO
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket: any) => {

    socket.on("join_room", (data: any) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", (data: any) => {
        socket.to(data.room).emit("receive_message", data)
        console.log(data)
    })

    socket.on("disconnect", (data: any) => {
        console.log(`User Disonnected from ${socket.id} `)
    })

})

server.listen(8001, () => {console.log("=== Socket io is Running! on port 8001 ===")})

//========================================================