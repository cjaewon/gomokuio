import User from "./User";
import { bind } from "../lib/utill";

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

  sendAll(name: string, body: any) {
    this.player1!.send(name, body);
    this.player2!.send(name, body);
  }

  checkWin() {
    let player1 = 0;
    let player2 = 0;
  
    // 세로 계산
    for (let i = 0; i < 15; i++) {
      player1 = player2 = 0;
  
      for (let j = 0; j < 15; j++) {
        if (this.map[j][i] === 1) {
          player2 = 0;
          player1++;
        } else if (this.map[j][i] === 2) {
          player1 = 0;
          player2++;
        }
  
        if (player1 >= 5 || player2 >= 5) return player1 >= 5 ? 1 : 2;
      }
    }
  
    // 가로 계산
    for (let i = 0; i < 15; i++) {
      player1 = player2 = 0;
  
      for (let j = 0; j < 15; j++) {
        if (this.map[i][j] === 1) {
          player2 = 0;
          player1++;
        } else if (this.map[j][i] === 2) {
          player1 = 0;
          player2++;
        }

        if (player1 >= 5 || player2 >= 5) return player1 >= 5 ? 1 : 2;
      }
    }

    
    // const top = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10], [0, 11], [0, 12], [0, 13], [0, 14]];
    // const left = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [0, 10], [11, 0], [12, 0], [13, 0], [14, 0]];
    // const right = [[14, 0], [14, 1], [14, 2], [14, 3], [14, 4], [14, 5], [14, 6], [14, 7], [14, 8], [14, 9], [14, 10], [14, 11], [14, 12], [14, 13], [14, 14]];

    // const topLeft = [...top, ...left];
    // const topRight = [...top, ...right];

    // topLeft.shift();
    // topRight.shift(); // 어차피 시작이 0, 0이므로 shift해서 없애줌

    // let i = 0, j = 0;

    // // 왼쪽에서 오른쪽 대가석 ( / ) 계산

    // while (true) {
    //   if (j <= 0) {
    //     [i, j] = topRight.shift()!;
    //   console.log(i, j, 'shift');

    //     if (j === 14 && i === 14) break;

    //     player1 = player2 = 0;
    //   }

    //   if (this.map[i][j] === 1) {
    //     player1++;
    //     player2 = 0;
    //   } else if (this.map[i][j] === 2) {
    //     player2++;
    //     player1 = 0;
    //   }

    //   if (player1 >= 5 || player2 >= 5) return player1 >= 5 ? 1 : 2;

    //   i++;
    //   j--;

    //   console.log(i, j)

    // }

    // i = j = 0;

    // while (true) {
    //   if (j >= 14) {
    //     [i, j] = topLeft.shift()!;
    //     if (j === 14 && i === 14) break;

    //     player1 = player2 = 0;
    //   }
      
    //   if (this.map[i][j] === 1) {
    //     player1++;
    //     player2 = 0;
    //   } else if (this.map[i][j] === 2) {
    //     player2++;
    //     player1 = 0;
    //   }

    //   if (player1 >= 5 || player2 >= 5) return player1 >= 5 ? 1 : 2;

    //   i--;
    //   j++;
    // }
  }

  toData() {
    const { player1, player2, ...data } = this;
    if (!player1 || !player2) return;

    return {
      player1: player1.toData(),
      player2: player2.toData(),
      ...data,
    };
  }
};


export default Room;