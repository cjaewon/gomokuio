import User from "./User";

export default class Room {
  id: string;
  user1: User;
  user2: User;
  turn: User;

  map: number[][];

  constructor(id: string, user1: User, user2: User) {
    this.id = id;
    this.user1 = user1;
    this.user2 = user2;
    this.turn = user1;

    this.map = Array(15).fill(0).map(() => Array(15).fill(0));
  }

  send(name: string, data: Object) {
    this.user1.send(name, data);
    this.user2.send(name, data);
  }

  toObject() {
    const { id, user1, user2, turn } = this;

    return {
      id,
      user1: user1.toObject(),
      user2: user2.toObject(),
      turn: turn.toObject(),
    };
  }
}