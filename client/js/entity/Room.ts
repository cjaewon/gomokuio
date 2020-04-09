import User from "./User";
import { throws } from "assert";
import Canvas from "../lib/Canvas";

class Room {
  id: string; // socket id

  player1: User;
  player2: User;

  map: number[][];
  turn: 'player1' | 'player2';

  constructor(id: string, player1: User, player2: User) {
    this.id = id;
    this.player1 = player1;
    this.player2 = player2;

    this.turn = 'player1';

    this.map = Array(15).fill(0).map(() => Array(15).fill(0));
    this.turn = 'player1';
  };


};

export default Room;