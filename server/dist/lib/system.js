"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Room_1 = __importDefault(require("../entity/Room"));
exports.matching = (user) => {
    if (global.db.matchQueue.length > 0) {
        const room = global.db.matchQueue.shift();
        if (room.player1 && global.db.users[room.player1.id]) { // 플레이어가 다 있을 때
            room.player2 = user;
            user.roomId = room.id;
            return room;
        }
    }
    const id = uuid_1.v4();
    const room = new Room_1.default(id, user, null);
    user.roomId = room.id;
    global.db.matchQueue.push(room);
    return;
};
exports.checkGameEnd = (roomId) => {
    const room = global.db.rooms[roomId];
    let player1 = 0;
    let player2 = 0;
    // 세로 계산
    for (let i = 0; i < 15; i++) {
        player1 = player2 = 0;
        for (let j = 0; j < 15; j++) {
            if (room.map[j][i] === 1) {
                player2 = 0;
                player1 += 1;
            }
            else if (room.map[j][i] === 2) {
                player1 = 0;
                player2 += 1;
            }
            if (player1 >= 5)
                return 1;
            else if (player2 >= 5)
                return 2;
        }
    }
    for (let i = 0; i < 15; i++) {
        player1 = player2 = 0;
        for (let j = 0; j < 15; j++) {
            if (room.map[i][j] === 1) {
                player2 = 0;
                player1 += 1;
            }
            else if (room.map[j][i] === 2) {
                player1 = 0;
                player2 += 1;
            }
            if (player1 >= 5)
                return 1;
            else if (player2 >= 5)
                return 2;
        }
    }
};
