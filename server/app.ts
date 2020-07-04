import http from 'http';
import Koa from 'koa';
import serve from 'koa-static';
import ws from 'ws';
import path from 'path';

import log from './lib/logger';
import { message, close } from './event';
import { uuid4 } from './lib/uuid';

const app = new Koa();

const server = http.createServer(app.callback());
const wss = new ws.Server({ server });

app.use(serve(path.resolve(__dirname, '../dist')));
wss.on('connection', ws => {
  const id = uuid4();

  ws.on('message', data => message(ws, id, <string>data));
  ws.on('close', () => close(id));
});

server.listen(3000, () => {
  log.info('Server listening on port 3000');
});