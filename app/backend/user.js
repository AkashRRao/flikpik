import  Room from './room.js';

export default class User {
  constructor(id) {
    this.name = id;
    this.id = id;
    this.room = null;
  }

  CreateRoom() {
    let room = new Room(this.name);
    room.AddUser(this);
    this.room = room;
    return room;
  }

  JoinRoom(room) {
    if (this.room == null) {
      this.room = room;
      room.AddUser(this);
    }
  }

  RoomCreated(socket) {
    console.log('Room created', this.room);
    socket.emit('roomCreated', this.room.name);
  }

  RoomJoined(socket) {
    socket.emit('roomJoined', this.room.name);
    console.log('Room joined', this.room);
  }

  UserConnected(socket) {
    console.log(socket.id, 'a user connected');
    socket.emit('userCreated', this.name);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  
    socket.on('message', (msg) => {
      console.log('message: ' + msg);
      socket.broadcast.emit('message', msg); // Broadcast to all clients except the sender
      socket.emit('message', msg); // Send the message back to the sender as well
    });
  }
}