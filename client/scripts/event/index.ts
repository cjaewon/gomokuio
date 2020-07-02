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
  
  /* to Server */
  login = 'login',
  click = 'click',
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

      await new Promise(r => setTimeout(r, 1400))
      document.getElementById('start').classList.add('shake-out');

      await new Promise(r => setTimeout(r, 530));
      canvas.init();

      break;
    }
    case eventName.setUser: {
      const user = new User(response.data.id, response.data.username);
      data.user = user;

      break;
    }
    case eventName.clicked: {
      const { x, y, color } = response.data;


      data.room.turn = data.room.user1.id === data.room.turn.id ? data.room.user2 : data.room.user1;

      data.room.map[y][x] = color;
      canvas.draw();

      break;
    }
    case eventName.quit: {
      toast.error('상대편 플레이어가 게임을 나갔습니다.');
      
      break;
    }
  }
}