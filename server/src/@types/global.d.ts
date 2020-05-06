import ws from 'ws'

import Room from '../entity/Room';
import User from '../entity/User';

interface DB {
  rooms: { [key: string]: Room };
  users: { [key: string]: User };

  matchQueue: Room[];
}

declare global {
  namespace NodeJS {
    interface Global {
      db: DB;
    } 
  }
}
