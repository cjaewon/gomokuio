import { v4 as uuid4 } from 'uuid';

import Room from "../entity/Room";
import User from "../entity/User";

export const matching = (user: User): Room | undefined => {
  if (global.db.matchQueue.length > 0) {
    const room = global.db.matchQueue.shift()!;
    
    if (room.player1 && global.db.users[room.player1.id]) { // 플레이어가 다 있을 때
      room.player2 = user;
      user.roomId = room.id;
  
      return room;
    }
  }

  const id = uuid4();

  const room = new Room(id, user, null);
  user.roomId = room.id;

  global.db.matchQueue.push(room);
  
  return;
};

export const checkGameEnd = (roomId: string): Number | undefined => {
  const room = global.db.rooms[roomId];

  let player1 = 0;
  let player2 = 0;

  // 세로 계산
  for (let i = 0; i < 15; i++) {
    player1 = player2 = 0;

    for (let j = 0; j < 15; j++) {
      if (room.map[j][i] === 1) {
        player2 = 0;
        player1 += 1;
      } else if (room.map[j][i] === 2) {
        player1 = 0;
        player2 += 1;
      }

      if (player1 >= 5) return 1;
      else if (player2 >= 5) return 2;
    }
  }

  console.log(player1, player2);
};