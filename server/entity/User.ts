import ws from 'ws';

export default class User {
  private ws: ws;

  id: string;
  username: string;
  roomID: string | null;

  constructor(ws: ws, id: string, username: string) {
    this.ws = ws;
    this.id = id;
    this.username = username;
    this.roomID = null;
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