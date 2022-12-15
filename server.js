const OrderBook = require("./server/OrderBook");
var { Limit, Order, OrderBookEntry } = require("./server/OrderBookEntry");

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
const path = require('path')

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
});

let rooms = {};
let orderBooks = {};
let orderIds = {};

app.get("/createGame", (req, res) => {
    let newRoom = "";

    while (newRoom === "" || (newRoom in rooms)) {
        newRoom = Math.floor(Math.random() * 1000).toString();
    }

    rooms[newRoom] = null;
    console.log(`New room with code ${newRoom} created.`)
    res.json({room: newRoom});
})

app.get(`/exists/:room`, (req, res) => {
    const room = req.params.room;
    res.json({exists: (room in rooms)});
})

function createSocket(roomSocket, room) {
    let players = [];

    roomSocket.on('connection', (socket) => {
        console.log(`User ${socket.id} connected to room ${room}`);

    })
}

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join", (room) => {
        socket.join(room);
        orderBooks[room] = new OrderBook();
        orderIds[room] = 1;
        console.log(`User with ID: ${socket.id} joined room: ${room}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on("send_order", (data) => {
        let room = data.room;
        console.log(`[${room}] ${data}`);
        orderBooks[room].addOrder(new Order(orderIds[room], data.username, data.isBuySide, data.price, data.quantity));
        console.log(orderBooks[room].toString());
        orderIds[room]++;
    })

    socket.on('disconnect', () => console.log(`User Disconnected: ${socket.id}`));
})

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})