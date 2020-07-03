import { createHash } from 'crypto';
import ws from 'ws';

export default class User {
  private ws: ws;

  id: string;
  username: string;
  roomID: string | null;
  profile_img: string;

  constructor(ws: ws, id: string, username: string) {
    this.ws = ws;
    this.id = id;
    this.username = username;
    this.roomID = null;
    this.profile_img  = `https://www.gravatar.com/avatar/${createHash('md5').update(username).digest('hex')}?s=64&d=retro`;
  }

  send(name: string, data: Object) {
    const string = JSON.stringify({ name, data });
    this.ws.send(string);
  }

  toObject() {
    const {ws, ...other} = this;

    return other;
  }
}