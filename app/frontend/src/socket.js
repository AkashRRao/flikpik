// socket-service.js
import { io } from 'socket.io-client';
import { subscribe } from 'svelte/internal';
import { writable } from 'svelte/store';

let socket; // Singleton instance
const messages = writable([]);
const name = writable('');
const roomName = writable('');
const usersInRoom = writable([]);
const isConnected = writable(false);
const error = writable('');
const showList = writable([]);
const movieFilter = writable({});

const HandleErrorEvents = (socket) => {
    socket.on('error', (errorMessage) => {
        console.error('socket.io: error:', errorMessage);
        error.set(errorMessage);
    });
}

const HandleUserEvents = (socket) => {
    socket.on('connect', () => {
        console.log('socket.io: connected to server');
        isConnected.set(true);
    })
    socket.on('disconnect', () => {
        console.log('socket.io: disconnected from server');
        isConnected.set(false);
    });
    socket.on('connect_error', (error) => {
        console.error('socket.io: connection error:', error);
        isConnected.set(false);
    });
    socket.on('reconnect', (attemptNumber) => {
        console.log("socket.io: reconnected after " + attemptNumber + " attempts.");
        isConnected.set(true);
    })
    socket.on('user:connect:res', (user) => {
        console.log('user connected:', user);
        name.set(user.name);
    })
};

const HandleChatEvents = (socket) => {
    socket.on('chat:message:res', (message) => { // Example event
        messages.update((currentMessages) => [message, ...currentMessages]);
    });
};

const HandleRoomEvents = (socket) => {
    socket.on('room:create:res', (response) => {
        console.log('room created:', response);
        roomName.set(response);
    })

    socket.on('room:join:res', (response) => {
        console.log('room joined:', response.roomName);
        roomName.set(response.roomName);
        usersInRoom.set(response.users);
    });

    socket.on('room:select-movies:res', (response) => {
        console.log('going into select-movies mode', response.shows.length, response.movieFilter);
        showList.set(response.shows);
        movieFilter.set(response.movieFilter);
    });
};

const connect = (url) => {
    if (socket && socket.connected) {
        console.log("Already connected");
        return;
    }

    socket = io(url);

    HandleUserEvents(socket);
    HandleChatEvents(socket);
    HandleRoomEvents(socket);
    HandleErrorEvents(socket);
};

const sendMessage = (event, message) => {
    if (socket && socket.connected) {
        socket.emit(event, message);
    } else {
        console.error('socket.io: not connected; can\'t send message');
    }
};

const disconnect = () => {
    if (socket) {
        socket.disconnect();
        isConnected.set(false);
        socket = null;
    }
}

export const socketService = {
    messages: { subscribe: messages.subscribe },
    roomName: {subscribe: roomName.subscribe},
    userName: { subscribe: name.subscribe },
    usersInRoom: {subscribe: usersInRoom.subscribe},
    isConnected: { subscribe: isConnected.subscribe },
    connect,
    sendMessage,
    disconnect
};