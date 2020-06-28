import { ws } from '../data';
import Room from "../entity/Room";

export const enum eventName {
  /* to Client */
  matched = 'matched',

  /* to Server */
  login = 'login',
}

type Response = {
  name: eventName;
  data: any; 
}

export const message = async(wsData: any) => {
  const response: Response = JSON.parse(wsData);

  switch (response.name) {
    case eventName.matched: {
      const room: Room = new Room(response.data.id, response.data.user1, response.data.user2);
      const button = <HTMLButtonElement>document.getElementById('username-button');

      button.innerText = '유저를 찾았습니다 !';

      await new Promise(r => setTimeout(r, 1400))

      document.getElementById('start').classList.add('shake-out');

      break;
    }
  }
}