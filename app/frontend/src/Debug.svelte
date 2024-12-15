<script>
    import { socketService } from "./socket";
    let messages = [];
    let message = "";
    let jsonString = "";
    let isConnected = false;
    let isJson = false;

    $: socketService.messages.subscribe((value) => (messages = value));
    $: socketService.isConnected.subscribe((value) => (isConnected = value));
</script>

{#if isConnected}
<div class="mt-3">
    <input type="text" bind:value={message} placeholder="Type your message" />
    <input
        type="text"
        bind:value={jsonString}
        placeholder="Type your JSON object"
    />
    <button
        class="btn btn-secondary"
        on:click={() =>
            socketService.sendMessage(
                message,
                isJson ? JSON.parse(jsonString) : String(jsonString),
            )}
    >
        Debug
    </button>
    <div class="form-check">
        <input
            class="form-check-input"
            type="checkbox"
            bind:checked={isJson}
            id="isJsonCheck"
        />
        <label class="form-check-label" for="isJsonCheck"> Send as JSON </label>
    </div>
    <ul class="list-group">
        {#each messages as msg}
            <li class="list-group-item">{msg}</li>
        {/each}
    </ul>
</div>
{:else}
<div class="alert alert-danger mt-3" role="alert">
    Not connected to the server!
</div>
{/if}
