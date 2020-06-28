
import { users, matchQueue } from '../data';
import User from "../entity/User";
import Room from '../entity/Room';
import { uuid4 } from './uuid';


export const matchUser = (user: User) => {
  if (matchQueue.length === 0) {
    matchQueue.push(user);
    return undefined;
  }

  let otherUser: User | undefined;

  while (matchQueue.length) {
    otherUser = matchQueue.shift()!;
    if (users[otherUser.id]) break; // 플레이어가 안 나갔는지 확인

    otherUser = undefined;
  }

  if (!otherUser) return undefined;

  const id = uuid4();
  const room = new Room(id, user, otherUser);

  return room;
};