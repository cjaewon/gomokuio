import '../css/index.css';
import event from './event';

import Room from './entity/Room';
import User from './entity/User';


let ws = new WebSocket(`ws://${location.host}`);
window.db = {
  room: null,
  user: null,
};

document.getElementById('setting')!.addEventListener('submit', e => {
  e.preventDefault();
  const body = { 
    name: 'join',
    data: {
      username: (document.getElementById('username-input') as HTMLInputElement).value,
    },
  };

  ws.send(JSON.stringify(body));
});


ws.onmessage = ({ data }) => event(ws, data);


// @types

interface DB {
  room: Room | null;
  user: User | null;
}

declare global {
  interface Window {
    db: DB;
  }
}
