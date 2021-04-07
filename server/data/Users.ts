import User from "../entity/User";

class Users {
  private store: { [id: string]: User }
  
  constructor() {
    this.store = {};
  }

  addUser(user: User) {
    this.store[user.id] = user;
  }

  getUser(id: string) {
    return this.store[id];
  }

  removeUser(id: string) {
    delete this.store[id];
  }
}

const users = new Users();
export default users;