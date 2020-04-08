import { v4 as uuid4 } from 'uuid';

import Room from "../entity/Room";
import User from "../entity/User";

export const matching = (user: User): Room | undefined => {
  if (global.db.matchQueue.length > 0) {
    const room = global.db.matchQueue.shift()!;
    room.player2 = user;

    return room;
  }

  const id = uuid4();
  const room = new Room(id, user, null);

  global.db.matchQueue.push(room);
  
  return;
};