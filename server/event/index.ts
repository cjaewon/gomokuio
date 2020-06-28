import ws from 'ws';

import { users, rooms } from '../data';
import { matchUser } from '../lib/system';

import User from '../entity/User';
import Room from '../entity/Room';

const enum gomokuColor {
  black = 1,
  white = 2,
}

const enum eventName {
  /* to Client */
  matched = 'matched',
  setUser = 'set-user',
  clicked = 'clicked',

  /* to Server */
  login = 'login',
  click = 'click',
}

type Response = {
  name: string;
  data: any; 
}

export const message = async(ws: ws, id: string, wsData: string) => {
  const response: Response = JSON.parse(wsData);

  switch (response.name) {
    case eventName.login: {
      const user = new User(ws, id, response.data.username || 'Player!');

      users[id] = user;
      user.send(eventName.setUser, user.toObject());

      const room = matchUser(user);

      if (!room) return;

      room.user1.roomID = room.id;
      room.user2.roomID = room.id;
      room.send(eventName.matched, room.toObject());

      rooms[room.id] = room;
      break;
    }
    case eventName.click: {
      const user = users[id];
      const room = rooms[user.roomID!];

      const color = room.turn.id === room.user1.id ? gomokuColor.black : gomokuColor.white 
      const { y, x } = response.data;

      room.map[y][x] = color;
      room.turn = room.turn.id === room.user1.id ? room.user2 : room.user1;

      room.send(eventName.clicked, {
        y: response.data.y,
        x: response.data.x,
        color,
      });
    }
  }
};

export const close = async(ws: ws) => {

};