import User from "./User";

class Room {
  id: string; // socket id

  player1: User | null;
  player2: User | null;

  map: number[][];
  turn: 'player1' | 'player2';

  constructor(id: string, player1: User | null, player2: User | null) {
    this.id = id;
    this.player1 = player1;
    this.player2 = player2;

    this.map = Array(15).fill(0).map(() => Array(15).fill(0));
    this.turn = 'player1';
  };
};

export default Room;