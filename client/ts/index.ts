import '../css/index.css';
import event from './event';
import { bind } from './lib/utill';

let ws = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`);

window.ws = ws;
window.db = {
  room: null,
  user: null,
};

document.getElementById('setting')!.addEventListener('submit', e => {
  e.preventDefault();

  document.getElementById('setting')!.style.display = 'none';
  document.getElementById('loader')!.style.display = 'flex';
  
  const body = { 
    username: (document.getElementById('username-input') as HTMLInputElement).value || '',
  };

  ws.send(bind('join', body));
});


ws.onmessage = ({ data }) => event(ws, data);