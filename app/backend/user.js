export function handleUserConnection(socket) {
  console.log(socket.id, 'a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    socket.broadcast.emit('message', msg); // Broadcast to all clients except the sender
    socket.emit('message', msg); // Send the message back to the sender as well
  });
}