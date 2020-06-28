import ws from 'ws';

export default class User {
  id: string;
  private ws: ws;

  constructor(ws: ws, id: string) {
    this.ws = ws;
    this.id = id;
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