import Room from './room.js';
import * as streamingAvailability from "streaming-availability";

const RAPID_API_KEY = '1b25a947e9msh09bd812fa3bfe3dp1e27f1jsnbce635cc6c71'

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

  async GoToMoveSuggestionMode(socket) {
    console.log('user triggered GoToMoveSuggestionMode');
    this.room.GoToMovieSuggestionMode();
    const client = new streamingAvailability.Client(new
      streamingAvailability.Configuration({ apiKey: RAPID_API_KEY }));
    const searchResult = await client.showsApi.searchShowsByFilters(({
      country: "us",
      catalogs: ["netflix"],
      genres: ["action"],
      showType: streamingAvailability.ShowType.Movie,
      orderBy: "popularity_1year",
    }));
    console.log(searchResult)
    socket.broadcast.emit('movieSuggestionMode', searchResult);
    socket.emit('movieSuggestionMode', searchResult);
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