import Room from '../entity/Room';
import Canvas from '../lib/Canvas';

// constant

export const ws: WebSocket = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`);
export const canvas = new Canvas();


// variable
export default class data {
  public static canvas: Canvas = new Canvas();
  public static room: Room;
}
