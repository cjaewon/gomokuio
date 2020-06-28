import User from "./User";
export default class Room {
  id: string;
  user1: User;
  user2: User;

  constructor(id: string, user1: User, user2: User) {
    this.id = id;
    this.user1 = user1;
    this.user2 = user2;
  }

  toObject() {
    const { id, user1, user2 } = this;

    return {
      id,
      user1: user1.toObject(),
      user2: user2.toObject(),
    };
  }
}