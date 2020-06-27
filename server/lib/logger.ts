import pino from 'pino';

const logger = pino({
  name: 'gomokuio',
});

export default logger;