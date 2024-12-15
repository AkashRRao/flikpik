export default class Room {
    constructor(name) {
        this.name = name;
        this.users = [];
        this.roomState = RoomState.AVAILABLE;
    }

    AddUser(user) {
        this.users.push(user);
    }
}

const RoomState = Object.freeze({
    AVAILABLE: 'available',
    OCCUPIED: 'occupied',
    MAINTENANCE: 'maintenance'
});