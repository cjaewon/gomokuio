import { v4 as uuid4 } from 'uuid';

import Room from "../entity/Room";
import User from "../entity/User";

export const matching = (user: User): Room | undefined => {
  let room: Room;
  
  while (global.db.matchQueue.length > 0) {
    room = global.db.matchQueue.shift()!;

    if (!room) break;
    if (global.db.users[room.player1!.id]) { // 플레이어가 안 나갔을 때
      room.player2 = user;
      user.roomId = room.id;
  
      return room;
    }
  }

  const id = uuid4();
  room = new Room(id, user, null);

  user.roomId = id;
  global.db.matchQueue.push(room);
};
