<script>
    import { socketService } from "./socket";
    let isConnected = false;
    let movies = [
        {
            title: "Cars 1",
            description:
                "Some quick example text to build on the card title and make up the bulk of the card's content.",
            poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTZOm1kU9t2b5zkmdxueqMrZSSrJaljrWYFbXso384vPQDP5GVW",
        },
        {
            title: "Cars 2",
            description:
                "Some quick example texa;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfjt to build on the card title and make up the bulk of the card's content.",
            poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTZOm1kU9t2b5zkmdxueqMrZSSrJaljrWYFbXso384vPQDP5GVW",
        },
        {
            title: "Cars 3",
            description:
                "Some quick example text to build on the card title and make up the bulk of the card's content.",
            poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTZOm1kU9t2b5zkmdxueqMrZSSrJaljrWYFbXso384vPQDP5GVW",
        },
        {
            title: "Cars 4",
            description:
                "Some quick example texa;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfja;sdlkfjt to build on the card title and make up the bulk of the card's content.",
            poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTZOm1kU9t2b5zkmdxueqMrZSSrJaljrWYFbXso384vPQDP5GVW",
        },
    ];

    $: socketService.isConnected.subscribe((value) => (isConnected = value));
</script>

<div class="container mt-3 h-75">
    {#each [0, 2] as index}
        <div class="row mt-3">
            {#each movies.slice(index, index + 2) as movie}
                <div class="col-6 d-flex align-items-stretch">
                    <div class="card p-1">
                        <img
                            src={movie.poster}
                            class="img-fluid card-img-top"
                            alt={movie.title}
                        />
                        <div class="p-1">
                            <h5 class="card-title">
                                {movie.title}
                            </h5>
                            <p class="card-text small text-center">
                                {movie.description.length > 50
                                    ? movie.description.slice(0, 50)
                                    : movie.description}
                            </p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/each}
</div>
