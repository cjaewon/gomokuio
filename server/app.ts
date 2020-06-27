import Koa from 'koa';
import serve from 'koa-static';

import log from './lib/logger';

const app = new Koa();

app.use(serve('../dist'));

app.listen(3000, () => {
  log.info('Server listening on port 3000');
});