<script>
    import { socketService } from "./socket";
    let messages = [];
    let isConnected = false;
    let messageToSend = "";

    $: socketService.messages.subscribe((value) => (messages = value));
    $: socketService.isConnected.subscribe((value) => (isConnected = value));

    const sendMessage = () => {
        if (messageToSend) {
            socketService.sendMessage("message", messageToSend);
            messageToSend = ""; // Clear the input field
        }
    };
</script>

{#if isConnected}
    <div class="mt-3">
        <div class="input-group mb-3">
            <input
                type="text"
                class="form-control"
                placeholder="Type your message..."
                bind:value={messageToSend}
                on:keypress={(e) => e.key === "Enter" && sendMessage()}
            />
            <div class="input-group-append">
                <button
                    class="btn btn-primary"
                    type="button"
                    on:click={sendMessage}
                >
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
{/if}
