import User from "../entity/User";

class Queue {
  private store: User[];

  constructor() {
    this.store = [];
  }

  get length() {
    return this.store.length;
  }

  pushUser(user: User) {
    this.store.push(user);
  }

  popUser() {
    return this.store.shift();
  }
}


const queue = new Queue();
export default queue;