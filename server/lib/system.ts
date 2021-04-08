
import User from "../entity/User";
import Room from '../entity/Room';
import { uuid4 } from './uuid';
import { eventName } from '../event';
import queue from "../data/Queue";
import users from "../data/Users";

export const matchUser = (user: User) => {
  if (queue.length === 0) {
    queue.pushUser(user);
    return undefined;
  }

  let otherUser: User | null = null;

  while (queue.length) {
    otherUser = queue.popUser()!;
    if (users.getUser(otherUser.id)) break; // 플레이어가 안 나갔는지 확인

    otherUser = null;
  }

  if (!otherUser) return undefined;

  const id = uuid4();
  const room = new Room(id, user, otherUser);

  return room;
};

export const checkWin = (map: number[][]) => {
  let player1 = 0;
  let player2 = 0;

  // 세로 계산
  for (let i = 0; i < 15; i++) {
    player1 = player2 = 0;

    for (let j = 0; j < 15; j++) {
      if (map[j][i] === 1) {
        player2 = 0;
        player1++;
      } else if (map[j][i] === 2) {
        player1 = 0;
        player2++;
      }

      if (player1 >= 5 || player2 >= 5) return player1 >= 5 ? 'user1' : 'user2';
    }
  }

  // 가로 계산
  for (let i = 0; i < 15; i++) {
    player1 = player2 = 0;

    for (let j = 0; j < 15; j++) {
      if (map[i][j] === 1) {
        player2 = 0;
        player1++;
      } else if (map[j][i] === 2) {
        player1 = 0;
        player2++;
      }

      if (player1 >= 5 || player2 >= 5) return player1 >= 5 ? 'user1' : 'user2';
    }
  }

  
  const top = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10], [0, 11], [0, 12], [0, 13], [0, 14]];
  const left = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [0, 10], [11, 0], [12, 0], [13, 0], [14, 0]];
  const right = [[14, 0], [14, 1], [14, 2], [14, 3], [14, 4], [14, 5], [14, 6], [14, 7], [14, 8], [14, 9], [14, 10], [14, 11], [14, 12], [14, 13], [14, 14]];

  const topLeft = [...top, ...left];
  const topRight = [...top, ...right];

  player1 = player2 = 0;
  let [y, x] = topRight.shift()!;
  
  while (true) {
    if (map[y][x] === 1) {
      player2 = 0;
      player1++;
    } else if (map[y][x] === 2) {
      player1 = 0;
      player2++;
    }

    if (player1 >= 5 || player2 >= 5) return player1 >= 5 ? 'user1' : 'user2';

    if (x <= 0 || y >= 14) {
      if (topRight.length <= 0) break;
      [y, x] = topRight.shift()!;
      player1 = player2 = 0;
      continue
    }

    y++;
    x--;
  }

  player1 = player2 = 0;
  [y, x] = topLeft.shift()!;

  while (true) {
    if (map[y][x] === 1) {
      player2 = 0;
      player1++;
    } else if (map[y][x] === 2) {
      player1 = 0;
      player2++;
    }

    if (player1 >= 5 || player2 >= 5) return player1 >= 5 ? 'user1' : 'user2';

    if (x <= 14 || y >= 14) {
      if (topLeft.length <= 0) break;
      [y, x] = topLeft.shift()!;
      player1 = player2 = 0;
      continue
    }

    y++;
    x++;
  }
};

export const updateRanking = async() => {
  let ranking = Object.entries(users.store);

  ranking.sort((a, b) => b[1].score - a[1].score);
  ranking.slice(0, 5);

  ranking = ranking.map(user => user[1].toObject()) as any;

  for(const [, user] of Object.entries(users.store)) {
    user.send(eventName.ranking, ranking);
  }
};