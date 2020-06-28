import User from '../entity/User';
import Room from '../entity/Room';

export type userType = {
  [x: string]: User;
}
export type roomType = {
  [x: string]: Room;
}

export const users: userType = {};
export const rooms: roomType = {};

export const matchQueue: User[] = [];