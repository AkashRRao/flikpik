<script>
    import { socketService } from "./socket";
    let isConnected = false;
    let roomName = "";
    let usersInRoom = [];
    let roomNameToJoin = "";
    let userName = "";

    $: socketService.isConnected.subscribe((value) => (isConnected = value));
    $: socketService.roomName.subscribe((value) => (roomName = value));
    $: socketService.userName.subscribe((value) => (userName = value));
    $: socketService.usersInRoom.subscribe((value) => (usersInRoom = value));

    const joinRoom = () => {
        if (roomNameToJoin) {
            socketService.sendMessage("room:join", roomNameToJoin);
            roomNameToJoin = ""; // Clear the input field
        }
    };
</script>

{#if isConnected}
    <div class="mt-3">
        <div class="mt-3">
            <p>Welcome, {userName}!</p>
            {#if roomName}
                <p>Currently in room: {roomName}</p>
                {#if usersInRoom && usersInRoom.length >= 1}
                    <p>with</p>
                    <ul>
                        {#each usersInRoom as user}
                            <li>{user}</li>
                        {/each}
                    </ul>
                {/if}
            {/if}
            {#if !roomName}
                <button
                    class="btn btn-success"
                    type="button"
                    on:click={() =>
                        socketService.sendMessage("room:create", roomName)}
                >
                    Create Room
                </button>
            {/if}
        </div>
        {#if !roomName}
            <div class="input-group mb-3 mt-3">
                <input
                    type="text"
                    class="form-control"
                    placeholder="room name to join..."
                    bind:value={roomNameToJoin}
                    on:keypress={(e) => e.key === "Enter" && joinRoom()}
                />
                <div class="input-group-append">
                    <button
                        class="btn btn-primary"
                        type="button"
                        on:click={joinRoom}
                    >
                        Join Room
                    </button>
                </div>
            </div>
        {/if}
    </div>
{:else}
    <div class="alert alert-danger mt-3" role="alert">
        Not connected to the server!
    </div>
{/if}
