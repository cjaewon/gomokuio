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
      const room = global.db.rooms[player.roomId!];

      if (room[room.turn]!.id !== player.id) return; // 자신의 턴이 아닐 때 요청
      if (data.x > 15 || data.y > 15) return; // 범위를 넘을 때
      if (room.map[data.x][data.y] !== 0) return; // 이미 값이 있을 때

      room.map[data.x][data.y] = room.turn === 'player1' ? 1 : 2 ; // 1 검은 돌 2 흰 돌
      room.turn = room.turn === 'player1' ? 'player2' : 'player1';
      
      const body = {
        x: data.x,
        y: data.y,

        color: room.map[data.x][data.y],
        turn: room.turn,
      };

      global.ws[room.player1!.id].send(bind('click', body));
      global.ws[room.player2!.id].send(bind('click', body));
    }
  }
};



export const close = (id: string) => {
  // TODO: 유저 한명이 나가면 나갔다고 표시하고 10초 뒤에 방 제거

  delete global.db.users[id];
  delete global.ws[id];
};
