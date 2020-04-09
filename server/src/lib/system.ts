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