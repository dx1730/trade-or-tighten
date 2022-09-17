const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
const path = require('path')

app.use(cors());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`User with ID: ${socket.id} joined room: ${room}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on('disconnect', () => console.log(`User Disconnected: ${socket.id}`));
})

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})