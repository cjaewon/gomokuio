import ws from 'ws';

import { bind } from '../lib/utill';

class User {
  id: string; // socket id
  username: string;
  score: Number;
  roomId: string | null;
  
  private ws: ws;

  constructor(ws: ws, id: string, username: string) {
    this.id = id;
    this.username = username;
    this.score = 0;
    this.roomId = null;

    this.ws = ws;
  }

  send(name: string, body: any) {
    this.ws.send(bind(name, body));
  }

  toData() {
    const {ws, ...data} = this;

    return data
  }
};

export default User;