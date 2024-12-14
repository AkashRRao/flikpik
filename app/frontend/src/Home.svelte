<script>
    import { socketService } from "./socket";
    let messages = [];
    let isConnected = false;

    $: socketService.messages.subscribe((value) => (messages = value));
    $: socketService.isConnected.subscribe((value) => (isConnected = value));
</script>

<div class="mt-3">
    <ul class="list-group">
        {#each messages as msg}
            <li class="list-group-item">{msg}</li>
        {/each}
    </ul>
</div>
