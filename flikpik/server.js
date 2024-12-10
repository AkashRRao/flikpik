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

const movies = [
    {
        title: 'The Shawshank Redemption',
        // png for the poster
        poster: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
    },
    {
        title: "Schindler's List",
        poster: 'https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg',
    }
]

// Random name generator function
function generateRandomName() {
    const adjectives = ['Quick', 'Lazy', 'Happy', 'Sad', 'Angry'];
    const animals = ['Fox', 'Dog', 'Cat', 'Mouse', 'Bear'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return `${adjective}${animal}${Math.floor(Math.random() * 1000)}`;
}

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
            socket.emit('error', 'Room does not exist');
        }
    });

    socket.on('enterMovieSelection', () => {
        const roomName = Array.from(socket.rooms)[1]; // Get the room name
        if (roomName) {
            io.to(roomName).emit('enterMovieSelection', movies);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});