import ws from 'ws';

import User from "../entity/User";
import * as system from '../lib/system';
import { bind } from '../lib/utill';

export default function event(ws: ws, id: string, socketData: any) {
  const response = JSON.parse(socketData);

  const name = response.name;
  const data = response.data;

  switch (name) {
    case 'join': {
      if ((data.username as string).length > 7) return;

      const user = new User(id, data.username);
      global.db.users[id] = user;

      ws.send(bind('user_data', { user }));

      const room = system.matching(user);

      if (!room) return;
      if (!room.player1 || !room.player2) return;

      global.db.rooms[room.id] = room;
 
      try {
        global.ws[room.player1.id].send(bind('game_start', { room }));
        global.ws[room.player2.id].send(bind('game_start', { room }));
      } catch(e) {
        console.error(e);
      }
    }
    case 'click': {
      const player = global.db.users[id];
      if (!player.roomId) return;

      const room = global.db.rooms[player.roomId];
      if (!room || !room.player1 || !room.player2) return;

      if (room[room.turn]!.id !== player.id) return; // 자신의 턴이 아닐 때 요청
      if (data.x > 15 || data.y > 15) return; // 범위를 넘을 때

      if (room.turn == 'player1') {
        room.map[data.x][data.y] = 1; // 검은 돌
        global.ws[room.player2.id].send(bind('click', {
          x: data.x,
          y: data.y,

          color: 1,
        }));
        room.turn = 'player2';
      }
      else {
        room.map[data.x][data.y] = 2; // 흰돌
        global.ws[room.player1.id].send(bind('click', {
          x: data.x,
          y: data.y,

          color: 2,
        }));
        room.turn = 'player1';
      }

      console.log(room.map);
    }
  }
};



export const close = (id: string) => {
  delete global.db.users[id];
  delete global.ws[id];
};
