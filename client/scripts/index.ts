import '../styles/global.scss';
import '../styles/animation.scss';
import '../styles/common.scss';
import '../styles/style.scss';

import './lib/theme';

import { ws } from './data';
import { wsSend } from './lib';
import { eventName, message } from './event';

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

    document.body.style.transition = 'all 1s';
    await new Promise(r=>setTimeout(r, 1000));

    document.body.style.transition = '';
  } else {
    localStorage.setItem('theme', 'light');
    document.body.classList.remove('dark');

    document.body.style.transition = 'all 1s ease';
    await new Promise(r=>setTimeout(r, 1000));

    document.body.style.transition = '';
  }
});

ws.onmessage = ({ data }) => message(data); 
