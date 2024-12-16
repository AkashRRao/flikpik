import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './user.js';
import Room from './room.js';
import * as streamingAvailability from "streaming-availability";

const RAPID_API_KEY = '1b25a947e9msh09bd812fa3bfe3dp1e27f1jsnbce635cc6c71'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {});

const client = new streamingAvailability.Client(new
  streamingAvailability.Configuration({ apiKey: RAPID_API_KEY }));

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

const HandleUserEvents = (socket) => {
  // maybe check if this id already exists?
  let user = new User(socket.id);
  socket.emit('user:connect:res', { name: user.name });
  socket.on('disconnect', () => {
    // let everyone in the room know
    let user = User.users.get(socket.id);
    if (user.room !== null) {
      user.room.users = user.room.users.filter(u => u.id !== user.id);
      io.to(user.room.name).emit('room:user-left:res', {
        userLeft: user.name,
        users: user.room.users.map(user => user.name)
      });
    }
    User.users.delete(socket.id);
    console.log('user disconnected');
  });
}

const HandleChatEvents = (socket) => {
  socket.on('chat:message', (message) => {
    const user = User.users.get(socket.id);
    if (user.room == null) {
      socket.broadcast.emit('chat:message:res', message);
      socket.emit('chat:message:res', message);
    } else {
      io.to(user.room.name).emit('chat:message:res', message);
    }
  });
}

const HandleMovieEvents = (socket) => {
  socket.on('movie:suggest', (movie) => {
    socket.emit('movie:suggest:ack');
    socket.broadcast('movie:suggest:res'); // movie, user
  });

  socket.on('movie:veto', (movie) => {
    socket.emit('room:veto:ack');
    socket.broadcast('movies:veto:res'); // movie, user
  });

  socket.on('movie:vibe-check', (movie) => {
    socket.emit('movie:vibe-check:ack');
    socket.broadcast('movie:vibe-check:res'); // movie, user
  });

  socket.on('movie:react-movie', (movie) => {
    socket.emit('movie:react-movie:ack');
    socket.broadcast('movie:react-movie:res'); // movie, user
  });

  socket.on('movie:update-filter', (movie) => {
    socket.emit('movie:update-filter:ack');
    socket.broadcast('movie:update-filter:res'); // movie, updated filter
  });
}

const HandleRoomEvents = (socket) => {
  socket.on('room:create', () => {
    const user = User.users.get(socket.id);
    // make sure user is already not in a room
    if (user.room !== null) {
      socket.emit('error', 'user is already in a room');
      return;
    }

    // create a room and add the user to it
    let room = new Room(user.name.substring(0, 4));
    user.room = room;
    room.users.push(user);
    socket.join(room.name);
    socket.emit('room:create:res', room.name);
  });

  socket.on('room:join', (roomName) => {
    const user = User.users.get(socket.id);

    // make sure user is already not in a room
    if (user.room !== null) {
      socket.emit('error', 'user is already in a room');
      return;
    }

    let room = Room.rooms.get(roomName);
    if (room === undefined) {
      socket.emit('error', `room ${roomName} doesn't exist`);
      return;
    }

    if (room.state !== Room.State.OPEN) {
      socket.emit('error', 'room is not open');
      return;
    }

    user.room = room;
    room.users.push(user);
    socket.join(room.name);

    const usersInRoom = room.users.map(user => user.name);
    io.to(room.name).emit('room:join:res', {
      roomName: room.name, users: usersInRoom
    });
  });

  socket.on('room:select-movies', async () => {
    const user = User.users.get(socket.id);
    if (user.room === null) {
      socket.emit('error', 'user is not in a room');
      return;
    }

    // check if room is open for movie selection
    if (user.room.state !== Room.State.OPEN) {
      socket.emit('error', 'room is not open for movie selection');
      return;
    }

    if (user.room.users.length < 2) {
      socket.emit('error', 'room does not have enough users');
      return;
    }

    user.room.state = Room.State.MOVIE_SUGGESTION;
    user.room.userInPlay = user;

    const searchResult = await
      client.showsApi.searchShowsByFilters((user.room.movieFilter));
    io.to(user.room.name).emit('room:select-movies:res', {
      shows:
        searchResult.shows, movieFilter: user.room.movieFilter
    });
  });
}

io.on('connection', (socket) => {
  HandleUserEvents(socket);
  HandleChatEvents(socket);
  HandleMovieEvents(socket);
  HandleRoomEvents(socket);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});