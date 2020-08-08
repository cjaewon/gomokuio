import data, { canvas } from '../data';
import * as toast from '../lib/toast';
import Room from "../entity/Room";
import User from '../entity/User';

export const enum gomokuColor {
  black = 1,
  white = 2,
}

export const enum eventName {
  /* to Client */
  matched = 'matched',
  setUser = 'set-user',
  clicked = 'clicked',
  quit = 'quit',
  newChat = 'new-chat',
  gameEnd = 'game-end',
  info = 'info',
  ranking = 'ranking',

  /* to Server */
  login = 'login',
  click = 'click',
  sendMsg = 'send-msg',
}

type Response = {
  name: eventName;
  data: any; 
}

export const message = async(wsData: any) => {
  const response: Response = JSON.parse(wsData);

  switch (response.name) {
    case eventName.matched: {
      const room = new Room(response.data.id, response.data.user1, response.data.user2);
      const button = <HTMLButtonElement>document.getElementById('username-button');

      button.innerText = '유저를 찾았습니다 !';
      data.room = room;

      const userElements = document.getElementById('users').getElementsByTagName('div');

      (<HTMLImageElement>userElements[0].getElementsByTagName('img')[0]).src = room.user1.profile_img;
      (<HTMLImageElement>userElements[1].getElementsByTagName('img')[0]).src = room.user2.profile_img;
      
      (<HTMLImageElement>userElements[0].getElementsByTagName('span')[0]).innerText = room.user1.username;
      (<HTMLImageElement>userElements[1].getElementsByTagName('span')[0]).innerText = room.user2.username;

      (<HTMLImageElement>userElements[0].getElementsByTagName('span')[0]).innerText += '  🎲';

      await new Promise(r => setTimeout(r, 1400))
      document.getElementById('start').classList.add('shake-out');

      await new Promise(r => setTimeout(r, 530));
      canvas.init();

      toast.success(`${room.user1.username} vs ${room.user2.username}`);
      // 나중에 클라이언트도 점수 동기화
      break;
    }
    case eventName.setUser: {
      const user = new User(response.data.id, response.data.username, response.data.profile_img);
      data.user = user;

      break;
    }
    case eventName.clicked: {
      const { x, y, color } = response.data;

      data.room.turn = data.room.user1.id === data.room.turn.id ? data.room.user2 : data.room.user1;

      const userElements = document.getElementById('users').getElementsByTagName('div');

      if (data.room.turn.id === data.room.user1.id) {
        (<HTMLImageElement>userElements[1].getElementsByTagName('span')[0]).innerText = data.room.user2.username;
        (<HTMLImageElement>userElements[0].getElementsByTagName('span')[0]).innerText += '  🎲';
      } else {
        (<HTMLImageElement>userElements[0].getElementsByTagName('span')[0]).innerText = data.room.user1.username;
        (<HTMLImageElement>userElements[1].getElementsByTagName('span')[0]).innerText += '  🎲';
      }

      data.room.map[y][x] = color;
      canvas.draw();

      break;
    }
    case eventName.newChat: {
      const { id, text } = response.data;
      const { room } = data;

      const chatListElement = document.getElementById('chat-list');
      const lastChildElement = (<HTMLDivElement>chatListElement.lastElementChild);

      if (lastChildElement.getAttribute('user-id') === id) {
        (<HTMLSpanElement>lastChildElement.getElementsByTagName('span')[0]).innerHTML += `<br />${text}`;
      } else {
        document.getElementById('chat-list').innerHTML += 
        `
        <div class="chat" user-id="${id}">
          <img src="${id === room.user1.id ? room.user1.profile_img : room.user2.profile_img}" />
          <span>${text}<span>
        </div>
        `;
      }

      chatListElement.scrollTop = chatListElement.scrollHeight;

      break;
    }
    case eventName.quit: {
      toast.error('상대편 플레이어가 게임을 나갔습니다.');

      await new Promise(r => setTimeout(r, 3000));

      const button = <HTMLButtonElement>document.getElementById('username-button');

      canvas.uninit();
      document.getElementById('start').classList.remove('shake-out');
      document.getElementById('chat-list').innerHTML = '';
      button.disabled = false;
      button.innerText = '플레이';

      break;
    }
    case eventName.gameEnd: {
      const { winner } = response.data;

      if (data.room[winner].id === data.user.id)
        toast.success('🎉 게임을 승리하셨습니다!');
      else
        toast.error('😔 게임에 패배하셨습니다...');

      await new Promise(r => setTimeout(r, 3000));

      const button = <HTMLButtonElement>document.getElementById('username-button');

      canvas.uninit();
      document.getElementById('start').classList.remove('shake-out');
      document.getElementById('chat-list').innerHTML = '';
      button.disabled = false;
      button.innerText = '플레이';

      break;
    }
    case eventName.ranking: {
      // vs 기능 넣어주기
      const ranking = response.data as User[];

      document.getElementById('ranking-list').innerHTML = `
        ${ranking.map((user, rank) => `
          <tr>
            <td>${rank + 1}</td>
            <td>${user.username}</td>
            <td>${user.score}</td>
          </tr>
        `).join('')}
      `;
      break;
    }
  }
}