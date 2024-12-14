<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './styles/global.css';
  import { io } from 'socket.io-client';

  let message = '';
  let messages = [];
  const socket = io(import.meta.env.VITE_SOCKET_IO_URL); // Use the forwarded URL

  socket.on('connect', () => {
    console.log('Connected to server');
    console.log('a;sldkjf', import.meta.env.VITE_SOCKET_IO_URL);
  });

  socket.on('message', (msg) => {
    console.log('got the message: ' + msg); // Log the received message
    messages = [...messages, msg];
  });

  function sendMessage() {
    socket.emit('message', message);
    message = '';
  }
</script>

<main class="container">
<nav class="navbar navbar-expand-lg navbar-light">
  <a class="navbar-brand text-white pixelify-font" href="#">flikpik</a>
</nav>
  <div class="mt-3">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Type your message..."
        bind:value={message}
        on:keypress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" on:click={sendMessage}>
          Send
        </button>
      </div>
    </div>
    <ul class="list-group">
      {#each messages as msg}
        <li class="list-group-item">{msg}</li>
      {/each}
    </ul>
  </div>
</main>