import * as streamingAvailability from "streaming-availability";

export default class Room {
    // map from room name to room
    static rooms = new Map();

    static State = Object.freeze({
        OPEN: 'open',  // this state is when someone creates a room but not yet started movie suggestion
        MOVIE_SUGGESTION: 'movie_suggestion', //
    });

    constructor(name) {
        this.name = name;
        this.users = [];
        this.state = Room.State.OPEN;
        this.userInPlay = null;
        this.movieFilter = {
            country: "us",
            catalogs: ["netflix"],
            genres: ["action"],
            showType: streamingAvailability.ShowType.Movie,
            orderBy: "popularity_1year",
        }
        Room.rooms.set(this.name, this);
    }
}
