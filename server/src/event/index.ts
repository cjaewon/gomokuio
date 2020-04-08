import ws from 'ws';

import User from "../entity/User";
import * as system from '../lib/system';
import { bind } from '../lib/utill';

export default function event(ws: ws, id: string, socketData: any) {
  const response = JSON.parse(socketData);

  const name = response.name;
  const data = response.data;


  switch (name) {
    case 'join':
      if ((data.username as string).length > 7) return;

      const user = new User(id, data.username);
      global.db.users[id] = user;

      ws.send(bind('user_data', { user }));

      const room = system.matching(user);

      if (!room) return;
      if (!room.player1 || !room.player2) return;

      global.db.rooms[room.id] = room;
      global.ws[room.player1.id].send(bind('game_start', { room }));
      global.ws[room.player2.id].send(bind('game_start', { room }));
      
      break;


  }
  console.log(global.db)
};

export const close = (id: string) => {
  delete global.db.users[id];
  delete global.ws[id];
};
