"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Room_1 = __importDefault(require("../entity/Room"));
exports.matching = (user) => {
    let room;
    while (global.db.matchQueue.length > 0) {
        room = global.db.matchQueue.shift();
        if (!room)
            break;
        if (global.db.users[room.player1.id]) { // 플레이어가 안 나갔을 때
            room.player2 = user;
            user.roomId = room.id;
            return room;
        }
    }
    const id = uuid_1.v4();
    room = new Room_1.default(id, user, null);
    user.roomId = id;
    global.db.matchQueue.push(room);
};
