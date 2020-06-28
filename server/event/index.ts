import ws from 'ws';

import { users } from '../data';
import { uuid4 } from '../lib/uuid';
import { matchUser } from '../lib/system';

import User from '../entity/User';


const enum eventName {
  login = 'login'
}

type Response = {
  name: string;
  data: any; 
}

export const message = async(ws: ws, wsData: string) => {
  const response: Response = JSON.parse(wsData);

  switch (response.name) {
    case eventName.login: {
      const user = new User(ws, uuid4(), response.data.username || 'Player!');
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