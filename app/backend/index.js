import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {});

const PORT = process.env.PORT || 3000;

let rooms = new Map();
let users = new Map();

app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

io.on('connection', (socket) => {
  let user = new User(socket.id);
  console.log('a user connected', user);
  users.set(socket.id, user);
  user.UserConnected(socket);

  socket.on('create-room', () => {
    let room = user.CreateRoom();
    rooms.set(room.name, room);
    console.log('Room created', room);
    user.RoomCreated(socket);
  });

  socket.on('join-room', (roomName) => {
    let user = users.get(socket.id);
    let room = rooms.get(roomName);
    if (room != undefined) {
      user.JoinRoom(room);
      console.log('user', user.name, 'joined room', room.name);
      user.RoomJoined(socket);
    } else {
      console.log('Room not found', roomName);
    }
  });

});



server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});