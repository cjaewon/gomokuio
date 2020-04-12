import ws from 'ws';

import { bind } from '../lib/utill';

class User {
  id: string; // socket id
  username: string;
  score: Number;

  roomId: string | null;
  
  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
    this.score = 0;
    this.roomId = null;
  }

  send(name: string, body: any) {
    global.ws[this.id].send(bind(name, body));
  }
};

export default User;