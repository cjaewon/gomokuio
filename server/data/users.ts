import User from "../entity/User";

class Users {
  private store: { [x: string]: User }
  
  constructor() {
    this.store = {};
  }

  addUser(user: User) {
    this.store[user.id] = user;
  }

  removeUser(user: User) {
    delete this.store[user.id];
  }
}

const users = new Users();
export default users;