import Room from "../entity/Room";

export const ws = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`);

export default class data {
  public static room: Room;
}
