import Room from '../entity/Room';
import Canvas from '../lib/Canvas';
import User from '../entity/User';

// constant

export const ws: WebSocket = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`);
export const canvas = new Canvas();


// variable
export default class data {
  public static room: Room;
  public static user: User;
}
