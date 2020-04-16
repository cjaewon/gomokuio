import Room from '../entity/Room';
import User from '../entity/User';

interface DB {
  room: Room | null;
  user: User | null;
}

declare global {
  interface Window {
    ws: WebSocket;
    db: DB;
  }
}
