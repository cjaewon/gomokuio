import Room from '../entity/Room';
import Canvas from '../lib/Canvas';
import User from '../entity/User';

// constant

export const canvas = new Canvas();


// variable
export default class data {
  public static room: Room;
  public static user: User;
}
