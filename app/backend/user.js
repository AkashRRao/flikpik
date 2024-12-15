export default class User {
  // map from socket_id to user
  static users = new Map();

  constructor(id) {
    this.name = id;
    this.id = id;
    this.room = null;
    User.users.set(this.id, this);
  }
}