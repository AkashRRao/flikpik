const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

// Serve static files (e.g., images, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Random name generator function
function generateRandomName() {
    const adjectives = ['Quick', 'Lazy', 'Happy', 'Sad', 'Angry'];
    const animals = ['Fox', 'Dog', 'Cat', 'Mouse', 'Bear'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return `${adjective}${animal}${Math.floor(Math.random() * 1000)}`;
}

// List of active rooms
const activeRooms = new Set();

io.on('connection', (socket) => {
    console.log('A user connected');

    const userName = generateRandomName();
    socket.emit('userAssigned', userName);

    socket.on('createRoom', () => {
        const roomName = Math.random().toString(36).substring(2, 7);
        activeRooms.add(roomName);
        socket.join(roomName);
        socket.emit('roomCreated', roomName);
    });

    socket.on('joinRoom', (roomName) => {
        if (activeRooms.has(roomName)) {
            socket.join(roomName);
            socket.emit('roomJoined', roomName);
        } else {
            socket.emit('error', 'room does not exist');
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});