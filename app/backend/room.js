export default class Room {
    constructor(name) {
        this.name = name;
        this.users = [];
        this.roomState = RoomState.OPEN;
        this.currentSuggestor = null;
    }

    AddUser(user) {
        if (this.roomState == RoomState.OPEN) {
            this.users.push(user);
            return;
        }
        return exception('room is not open for adding users.')
    }

    GoToMovieSuggestionMode() {
        if (this.roomState == RoomState.OPEN) {
            this.roomState = RoomState.MOVIE_SUGGESTION;
            this.currentSuggestor = this.users[0];
            return;
        }
        return exception('room is not open for movie suggestion.')
    }
}

const RoomState = Object.freeze({
    OPEN: 'open',  // this state is when someone creates a room but not yet started movie suggestion
    MOVIE_SUGGESTION: 'movie_suggestion', //
});