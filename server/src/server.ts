import http from 'http';
import express from 'express';
import ws from 'ws';
import { v4 as uuid4 } from 'uuid';

import { event, close } from './event';

const app = express();
const server = http.createServer(app);

const wss = new ws.Server({ server });

global.ws = {};
global.db = {
  rooms: {},
  users: {},

  matchQueue: [],
};

app.use((req, res, next) => {
  if (req.path.match(/\/ts|\/css/g)) return; // css 또는 js 폴더에 들어올 때 소스코드 유출을 방지하기 위함
  next();
});

app.use(express.static(__dirname + '/../../client')); // 배포때는 캐싱 maxAge 

wss.on('connection', (ws) => {
  const id = uuid4();
  console.log(`[INFO] New User : id = ${id}`);

  ws.on('message', (data) => event(ws, id, data));
  ws.on('close', () => close(id));
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`[INFO] Starting Web Server : port = ${process.env.PORT || 3000}`);
});