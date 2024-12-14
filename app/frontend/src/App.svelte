<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "./styles/global.css";
  import { Router, Route, Link } from "svelte-routing";
  import { onMount, onDestroy } from "svelte";
  import { socketService } from "./socket";
  import Home from "./Home.svelte";
  import SendMessage from "./SendMessage.svelte";

  onMount(() => {
    socketService.connect(import.meta.env.VITE_SOCKET_IO_URL);
  });

  onDestroy(() => {
    socketService.disconnect();
  });
</script>

<main class="container">
  <Router>
    <nav class="navbar navbar-expand-lg navbar-light">
      <Link to="/"
        ><a class="navbar-brand text-white pixelify-font" href="/">flikpik</a
        ></Link
      >
      <Link to="/send-message">
        <a class="navbar-brand text-white pixelify-font" href="/">chat</a>
      </Link>
    </nav>

    <Route path="/">
      <Home />
    </Route>
    <Route path="/send-message">
      <SendMessage />
    </Route>
  </Router>
</main>
