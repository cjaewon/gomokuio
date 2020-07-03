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

      const userElements = document.getElementById('users').getElementsByTagName('div');

      (<HTMLImageElement>userElements[0].getElementsByTagName('img')[0]).src = room.user1.profile_img;
      (<HTMLImageElement>userElements[1].getElementsByTagName('img')[0]).src = room.user2.profile_img;
      
      (<HTMLImageElement>userElements[0].getElementsByTagName('span')[0]).innerText = room.user1.username;
      (<HTMLImageElement>userElements[1].getElementsByTagName('span')[0]).innerText = room.user2.username;

      await new Promise(r => setTimeout(r, 1400))
      document.getElementById('start').classList.add('shake-out');

      await new Promise(r => setTimeout(r, 530));
      canvas.init();


      
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