import ws from 'ws';

export default class User {
  private ws: ws;

  id: string;
  username: string;

  constructor(ws: ws, id: string, username: string) {
    this.ws = ws;
    this.id = id;
    this.username = username;
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