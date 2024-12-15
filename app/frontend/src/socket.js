// socket-service.js
import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

let socket; // Singleton instance
const messages = writable([]);
const isConnected = writable(false);

const connect = (url) => {
    if (socket && socket.connected) {
        console.log("Already connected");
        return;
    }

    socket = io(url);

    socket.on('connect', () => {
        console.log('Socket.IO connected');
        isConnected.set(true);
    });

    socket.on('disconnect', (reason) => {
        console.log('Socket.IO disconnected:', reason);
        isConnected.set(false);
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO connection error:', error);
        isConnected.set(false);
    });

    socket.on('message', (message) => { // Example event
        messages.update((currentMessages) => [...currentMessages, message]);
    });

    socket.on('roomCreated', (roomName) => {
        console.log('Room created:', roomName);
    });

    socket.on('movieSuggestionMode', (movies) => {
        console.log('movie suggestion mode movies', movies);
    });

    socket.on('reconnect', (attemptNumber) => {
        console.log("Reconnected after " + attemptNumber + " attempts.");
        isConnected.set(true);
    })
};

const sendMessage = (event, message) => {
    if (socket && socket.connected) {
        socket.emit(event, message);
    } else {
        console.error('Socket.IO is not connected.');
    }
};

const disconnect = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}

export const socketService = {
    messages: { subscribe: messages.subscribe },
    isConnected: { subscribe: isConnected.subscribe },
    connect,
    sendMessage,
    disconnect
};