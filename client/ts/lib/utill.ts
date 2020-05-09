import Canvas from "./Canvas";
import User from '../entity/User';
import axios from 'axios';

export const bind = (name: string, data: any) => {
  return JSON.stringify({
    name,
    data,
  });
};

export const exitGame = (canvas: Canvas) => {
  const chatList = document.getElementById('chat-list')!;

  document.getElementById('start-menu')!.style.display = 'block';
  document.getElementById('setting')!.style.display = 'flex';
  document.getElementById('loader')!.style.display = 'none';

  window.db.room = null;
  window.db.user!.roomId = '';

  canvas.show(false);
  
  while (chatList.firstChild) {
    chatList.firstChild.remove();
  }
  
  getRanking();
};

export const getRanking = async() => {
  const url = `${window.location.protocol}//${location.host}/api/ranking`;

  const response = await axios.get(url);
  const { ranking }: { ranking: User[]  } = response.data;

  document.getElementById('ranking')!.innerHTML = `
    <table>
      <tr>
        <th>랭킹</th>
        <th>이름</th>
        <th>스코어</th>
      </tr>
      ${ranking.map((user, rank) => `
        <tr>
          <td>${rank + 1}</td>
          <td>${user.username}</td>
          <td>${user.score}</td>
        </tr>
      `)}
    </table>
  `;
};