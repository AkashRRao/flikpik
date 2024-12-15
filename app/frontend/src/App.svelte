<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "./styles/global.css";
  import { Router, Route, Link } from "svelte-routing";
  import { onMount, onDestroy } from "svelte";
  import { socketService } from "./socket";
  import Home from "./Home.svelte";
  import SendMessage from "./SendMessage.svelte";
  import MovieSelection from "./MovieSelection.svelte";

  onMount(() => {
    socketService.connect(import.meta.env.VITE_SOCKET_IO_URL);
  });

  onDestroy(() => {
    socketService.disconnect();
  });
</script>

<main class="container-fluid" style="max-width: 500px">
  <Router>
    <nav class="navbar navbar-expand-lg navbar-light">
      <Link to="/"
        ><a class="navbar-brand text-white pixelify-font" href="/">flikpik</a
        ></Link
      >
      <Link to="/send-message">
        <a class="navbar-brand text-white pixelify-font" href="/">chat</a>
      </Link>
      <Link to="/movie-selection">
        <a class="navbar-brand text-white pixelify-font" href="/">select!</a>
      </Link>
    </nav>

    <Route path="/">
      <Home />
    </Route>
    <Route path="/send-message">
      <SendMessage />
    </Route>
    <Route path="/movie-selection">
      <MovieSelection />
    </Route>
  </Router>
</main>
