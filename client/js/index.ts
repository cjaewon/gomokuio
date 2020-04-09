import '../css/index.css';
import event from './event';

import Room from './entity/Room';
import User from './entity/User';
import { bind } from './lib/utill';


let ws = new WebSocket(`ws://${location.host}`);

window.ws = ws;
window.db = {
  room: null,
  user: null,
};


document.getElementById('setting')!.addEventListener('submit', e => {
  e.preventDefault();
  
  const data = { 
    username: (document.getElementById('username-input') as HTMLInputElement).value,
  };

  document.getElementById('setting')!.style.display = 'none';
  document.getElementById('loader')!.style.display = 'flex';

  ws.send(bind('join', data));
});


ws.onmessage = ({ data }) => event(ws, data);


// @types

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
