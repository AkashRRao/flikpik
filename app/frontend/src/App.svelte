<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "./styles/global.css";
  import { Router, Route, Link } from "svelte-routing";
  import { onMount, onDestroy } from "svelte";
  import { socketService } from "./socket";
  import Home from "./Home.svelte";
  import Chat from "./Chat.svelte";
  import MovieSelection from "./MovieSelection.svelte";
  import Debug from "./Debug.svelte";
  import CreateRoom from "./CreateRoom.svelte";

  onMount(() => {
    socketService.connect(import.meta.env.VITE_SOCKET_IO_URL);
  });

  onDestroy(() => {
    socketService.disconnect();
  });
</script>

<div>
  <Router>
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger px-3">
      <Link to="/">
        <a class="navbar-brand text-white pixelify-font" href="/">flikpik</a>
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link class="nav-link text-white pixelify-font" to="/create-room">
              <a class="nav-link text-white pixelify-font" href="/"
                >create room</a
              >
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link text-white pixelify-font" to="/chat">
              <a class="nav-link text-white pixelify-font" href="/">chat</a>
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class="nav-link text-white pixelify-font"
              to="/movie-selection"
            >
              <a class="nav-link text-white pixelify-font" href="/">select!</a>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link text-white pixelify-font" to="/debug">
              <a class="nav-link text-white pixelify-font" href="/">debug</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>

    <main class="container-fluid" style="max-width: 500px">
      <Route path="/">
        <Home />
      </Route>
      <Route path="/create-room">
        <CreateRoom />
      </Route>
      <Route path="/chat">
        <Chat />
      </Route>
      <Route path="/movie-selection">
        <MovieSelection />
      </Route>
      <Route path="/debug">
        <Debug />
      </Route>
    </main>
  </Router>
</div>
