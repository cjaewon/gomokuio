import User from "./User";

class Room {
  id: string; // socket id

  player1: User | null;
  player2: User | null;

  map: number[][];

  constructor(id: string, player1: User | null, player2: User | null) {
    this.id = id;
    this.player1 = player1;
    this.player2 = player2;

    this.map = new Array(15).fill(new Array(15).fill(0));
  };
};

export default Room;