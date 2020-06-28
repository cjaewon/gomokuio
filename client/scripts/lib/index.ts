import data, { ws } from '../data';

export const wsSend = (name: string, data: Object) => {
  const string = JSON.stringify({ name, data });
  ws.send(string);
}