import ws from 'ws';

import { users } from '../data';
import { uuid4 } from '../lib/uuid';
import User from '../entity/User';
import { matchUser } from '../lib/system';

type Response = {
  name: string;
  data: any; 
}

export const message = async(ws: ws, wsData: string) => {
  const response: Response = JSON.parse(wsData);

  switch (response.name) {
    case 'login': {
      const user = new User(ws, uuid4());
      users[user.id] = user;

      const room = matchUser(user);

      if (!room) return;
      room.send('matched', room.toObject());

      break;
    }
  }
};

export const close = async(ws: ws) => {

};