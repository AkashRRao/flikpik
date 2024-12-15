<script>
    import { socketService } from "./socket";
    let isConnected = false;
    $: socketService.isConnected.subscribe((value) => (isConnected = value));
</script>

<div class="mt-3">
    home
</div>
