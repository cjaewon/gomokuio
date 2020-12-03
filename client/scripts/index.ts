import '../styles/style.scss';
import './lib/theme';
import { fromEvent, Observable } from 'rxjs';
import { delay, filter, map, pluck, tap, throttleTime } from 'rxjs/operators';
import { wsSend } from './lib';
import { event } from './event';
import * as toast from './lib/toast';
import socket from './lib/socket';

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

  wsSend(event.login, { username });
});

fromEvent(document.getElementById('theme-switch'), 'click')
  .pipe(
    pluck('target', 'checked'),
    map((checked : boolean) => checked ? 'dark' : 'light'),
    tap(theme => {
      localStorage.setItem('theme', theme);

      document.body.classList.add(theme);
      document.body.classList.remove(theme === 'dark' ? 'light' : 'dark');
      document.body.style.transition = 'all 0.75s ease';
    }),
    delay(749),
    tap(() => {
      document.body.style.transition = '';
    }),
  ) 
  .subscribe();

fromEvent(document.getElementById('chat-input'), 'keydown')
  .pipe(
    filter((e: KeyboardEvent) => e.key === 'Enter'),
    throttleTime(500),
    pluck('value'),
    filter((text: string) => text.trim().length !== 0),
    filter((text: string) => {
      if (text.length < 50) return true;

      toast.error('텍스트가 너무 길어요.');
      return false;
    }),
  )
  .subscribe((text) => {
    wsSend(event.sendMsg, { text });
  });
