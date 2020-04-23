import Room from "../entity/Room";
import User from "../entity/User";
import Canvas from "../lib/Canvas";
import { exitGame } from '../lib/utill';

const canvas = new Canvas();

export default function event(ws: WebSocket, socketData: any) {
  const response = JSON.parse(socketData);

  const name = response.name;
  const data = response.data;

  switch (name) {
    case 'user_data': {
      window.db.user = new User(data.user.id, data.user.username);
      break;
    }
    case 'game_start': {
      window.db.room = new Room(data.room.id, data.room.player1, data.room.player2);

      document.getElementById('start-menu')!.style.display = 'none';
      document.getElementById('loader')!.style.display = 'none';
      
      document.getElementById('player1')!.innerText = data.room.player1.username;
      document.getElementById('player2')!.innerText = data.room.player2.username;

      document.getElementById('turn')!.innerHTML = 
      `현재 턴 : ${window.db.room.turn === 'player1' ?  window.db.room.player1.username : window.db.room.player2.username }`;

      canvas.init();
      break;
    }
    case 'click': {
      if (!window.db.room) return;

      window.db.room.map[data.x][data.y] = data.color;
      window.db.room.turn = data.turn;
      
      document.getElementById('turn')!.innerHTML = 
        `현재 턴 : ${window.db.room.turn === 'player1' ?  window.db.room.player1.username : window.db.room.player2.username }`;

      canvas.draw();
      break;
    }
    case 'user_out': {
      alert('상대 유저가 나갔습니다.\n 5초 뒤 자동으로 메인으로 이동합니다.');

      setTimeout(() => {
        exitGame(canvas);
      }, 5000);
      break;
    }
    case 'game_end': {
      const win = data.win === 1 ? 'player1' : 'player2';

      if (window.db.room![win].id === window.db.user!.id) {
        alert('승리하셨습니다! 5초 뒤 자동으로 메인으로 이동합니다');
      } else {
        alert('패배하셨습니다... 5초 뒤 자동으로 메인으로 이동합니다');
      }

      setTimeout(() => {
        exitGame(canvas);
      }, 5000);

      break;
    }
    case 'chat': {
      const chatList = document.getElementById('chat-list')!;

      const chat = document.createElement('div');
      
      const chatName = document.createElement('b');
      const name = document.createTextNode(data.name);
      
      chatName.appendChild(name);

      const chatText = document.createTextNode(`: ${data.text}`);

      chat.appendChild(chatName);
      chat.appendChild(chatText);

      chatList.appendChild(chat);

      chatList.scrollTop = chatList.scrollHeight;


      break;
    }
  }
};