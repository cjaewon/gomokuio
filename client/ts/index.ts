import axios from 'axios';

import '../css/index.css';
import event from './event';
import { bind } from './lib/utill';
import User from './entity/User';

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

document.getElementById('chat-input')!.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    const text = (document.getElementById('chat-input') as HTMLInputElement).value;
    (document.getElementById('chat-input') as HTMLInputElement).value = '';

    if (text.trim().length === 0) return;

    ws.send(bind('chat', { text }));
  }
});


const getRanking = async() => {
  const url = `${window.location.protocol}//${location.host}/api/ranking`;

  const response = await axios.get(url);
  const { ranking }: { ranking: User[]  } = response.data;

  document.getElementById('ranking')!.innerHTML = `
    <table>
      <tr>
        <th>이름</th>
        <th>스코어</th>
      </tr>
      ${ranking.map(user => `
        <tr>
          <td>${user.username}</td>
          <td>${user.score}</td>
        </tr>
      `)}
    </table>
  `;
};

getRanking();