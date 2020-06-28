import '../styles/global.scss';
import '../styles/animation.scss';
import '../styles/common.scss';
import '../styles/style.scss';

import { ws } from './data';
import { wsSend } from './lib';
import { eventName, message } from './event';

document.getElementsByTagName('form')[0].addEventListener('submit', async e => {
  e.preventDefault();

  const input = <HTMLInputElement>document.getElementById('username');
  const button = <HTMLButtonElement>document.getElementById('username-button');
  const username = input.value;

  button.disabled = true;

  await new Promise(r => setTimeout(r, 300));

  button.innerText = '유저를 매칭하는 중 입니다.';

  wsSend(eventName.login, { username });
});

ws.onmessage = ({ data }) => message(data); 
