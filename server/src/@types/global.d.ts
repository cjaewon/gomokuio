import ws from 'ws'

import Room from '../entity/Room';
import User from '../entity/User';

interface DB {
  rooms: { [key: string]: Room };
  users: { [key: string]: User };

  matchQueue: Room[];
  inviteMatch: { 
    [key: string]: {
      room: Room;
      time: Date;
    }
  };
}

declare global {
  namespace NodeJS {
    interface Global {
      db: DB;
    } 
  }
}
