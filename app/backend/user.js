export default class User {
  // map from socket_id to user
  static users = new Map();

  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.room = null;
    User.users.set(this.id, this);
  }
}