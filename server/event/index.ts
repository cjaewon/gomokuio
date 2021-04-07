import ws from 'ws';

import { matchUser, updateRanking } from '../lib/system';

import User from '../entity/User';

import log from '../lib/logger';
import users from '../data/users';
import rooms from '../data/rooms';

const enum gomokuColor {
  black = 1,
  white = 2,
}

export const enum eventName {
  /* to Client */
  matched = 'matched',
  setUser = 'set-user',
  clicked = 'clicked',
  quit = 'quit',
  newChat = 'new-chat',
  gameEnd = 'game-end',
  info = 'info',
  ranking = 'ranking',

  /* to Server */
  login = 'login',
  click = 'click',
  sendMsg = 'send-msg',
}

type Response = {
  name: string;
  data: any; 
}

export const message = async(ws: ws, id: string, wsData: string) => {
  const response: Response = JSON.parse(wsData);

  switch (response.name) {
    case eventName.login: {
      const user = new User(ws, id, response.data.username || 'Player');

      users.addUser(user);
      user.send(eventName.setUser, user.toObject());

      const room = matchUser(user);

      log.info(`Player ${id} joined`);

      updateRanking();

      if (!room) return;

      room.user1.roomID = room.id;
      room.user2.roomID = room.id;
      room.send(eventName.matched, room.toObject());

      rooms.addRoom(room);
      break;
    }
    case eventName.click: {
      const user = users.getUser(id);
      const room = rooms.getRoom(user.roomID || "");

      if (!user || !room) return;

      const color = room.turn.id === room.user1.id ? gomokuColor.black : gomokuColor.white 
      const { y, x } = response.data;

      if (room.map[y][x] !== 0) return;

      room.map[y][x] = color;
      room.turn = room.turn.id === room.user1.id ? room.user2 : room.user1;

      room.send(eventName.clicked, {
        y,
        x,
        color,
      });

      const win = room.checkWin();
      if (!win) return;

      room.send(eventName.gameEnd, {
        winner: win,
      });

      room[win].score += 25;

      updateRanking();

      break;
    }
    case eventName.sendMsg: {
      const { text } = response.data;

      if (text.length > 50) return;

      const user = users.getUser(id);
      if (!user || !user.roomID) return;

      const room = users.getUser(user.roomID);
      if (!room) return;

      room.send(eventName.newChat, {
        id,
        text,
      });

      break;
    }
  }
};

export const close = async(id: string) => {
  const user = users.getUser(id);
  if (!user) return;

  if (user.roomID) {
    const room = rooms.getRoom(user.roomID);

    if (!room) return;

    if (room.user1 && room.user1.id === id) room.user2.send(eventName.quit, {});
    else room.user1.send(eventName.quit, {});
  
    rooms.removeRoom(room.id);
  }

  log.info(`Player ${id} quit`);
  users.removeUser(id);

  updateRanking();
};