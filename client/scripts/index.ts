import '../styles/style.scss';

import './lib/theme';

import { ws, canvas } from './data';
import { wsSend } from './lib';
import { eventName, message } from './event';
import * as toast from './lib/toast';

// will remove
// document.getElementById('start').style.display = 'none';
// canvas.init();

document.getElementsByTagName('form')[0].addEventListener('submit', async e => {
  e.preventDefault();

  const input = <HTMLInputElement>document.getElementById('username');
  const button = <HTMLButtonElement>document.getElementById('username-button');
  const username = input.value;

  input.blur();
  button.disabled = true;

  await new Promise(r => setTimeout(r, 300));

  button.innerText = '유저를 매칭하는 중 입니다.';

  wsSend(eventName.login, { username });
});

document.getElementById('theme-switch').addEventListener('click', async e => {
  if ((<HTMLInputElement>e.target).checked) { // use dark mode
    localStorage.setItem('theme', 'dark');
    document.body.classList.add('dark');

    document.body.style.transition = 'all 0.75s ease';
    await new Promise(r=>setTimeout(r, 749));

    document.body.style.transition = '';
  } else {
    localStorage.setItem('theme', 'light');
    document.body.classList.remove('dark');

    document.body.style.transition = 'all 0.75s ease';
    await new Promise(r=>setTimeout(r, 749));

    document.body.style.transition = '';
  }
});

document.getElementById('chat-input')!.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    const text = (<HTMLInputElement>document.getElementById('chat-input')).value;
    (<HTMLInputElement>document.getElementById('chat-input')).value = '';

    if (text.trim().length === 0) return;
    if (text.length > 50) return toast.error('텍스트가 너무 길어요.');

    wsSend(eventName.sendMsg, {
      text,
    });
  }
});

ws.onmessage = ({ data }) => message(data); 
