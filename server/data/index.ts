import User from '../entity/User';

export type userType = {
  [x: string]: User;
}
export const users: userType = {};

export const matchQueue: User[] = [];