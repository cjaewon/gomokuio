import http from 'http';
import express from 'express';
import ws from 'ws';

import event, { close } from './event';

const app = express();
const server = http.createServer(app);

const wss = new ws.Server({
  server,
});

global.db = {
  rooms: {},
  users: {},
};

app.use(express.static(__dirname + '/../../client')); // 배포때는 캐싱 maxAge 

wss.on('connection', (ws, req) => {
  if (!req.headers['sec-websocket-key']) return ws.close();
  const id = Array.isArray(req.headers['sec-websocket-key']) ? req.headers['sec-websocket-key'][0] : req.headers['sec-websocket-key'];

  ws.on('message', (data) => event(ws, id, data));
  ws.on('close', () => close(id));
});

server.listen(process.env.PORT || 3000, () => {
  console.log('[INFO] Starting Web Server');
});

// @types
interface DB {
  rooms: { [key: string]: import('./entity/Room').default };
  users: { [key: string]: import('./entity/User').default };
}

declare global {
  namespace NodeJS {
    interface Global {
      db: DB;
    } 
  }
}
