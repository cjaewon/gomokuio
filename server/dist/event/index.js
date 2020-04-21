"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../entity/User"));
const system = __importStar(require("../lib/system"));
function event(ws, id, socketData) {
    const response = JSON.parse(socketData);
    const name = response.name;
    const data = response.data;
    switch (name) {
        case 'join': {
            const user = new User_1.default(ws, id, data.username.substring(0, 9));
            global.db.users[id] = user;
            user.send('user_data', {
                user: user.toData(),
            });
            const room = system.matching(user);
            if (!room)
                return;
            global.db.rooms[room.id] = room;
            try {
                room.sendAll('game_start', {
                    room: room.toData(),
                });
            }
            catch (e) {
                console.error(`[ERROR] Socket Send Error : event = "game_start", error = ${e}`);
            }
            break;
        }
        case 'click': {
            const player = global.db.users[id];
            if (!player)
                return; // 플레이어가 없을 때
            const room = global.db.rooms[player.roomId];
            if (!room)
                return; // 만약 방이 삭제되고 요청이 올때
            if (room[room.turn].id !== player.id)
                return; // 자신의 턴이 아닐 때 요청
            if (room.map[data.x][data.y] !== 0 || data.y >= 15 || data.x >= 15)
                return; // 이미 값이 있거나 범위를 넘을 때
            room.map[data.x][data.y] = room.turn === 'player1' ? 1 : 2; // 1 검은 돌 2 흰 돌
            room.turn = room.turn === 'player1' ? 'player2' : 'player1';
            try {
                const body = {
                    x: data.x,
                    y: data.y,
                    color: room.map[data.x][data.y],
                    turn: room.turn,
                };
                room.sendAll('click', body);
            }
            catch (e) {
                console.error(`[ERROR] Socket Send Error : event = "click", error = ${e}`);
            }
            const win = room.checkWin();
            if (win) {
                try {
                    room.sendAll('game_end', { win });
                }
                catch (e) {
                    console.error(`[ERROR] Socket Send Error : event = "game_end", error = ${e}`);
                }
                delete global.db.rooms[player.roomId];
            }
            break;
        }
        case 'chat': {
            const player = global.db.users[id];
            if (!player)
                return; // 플레이어가 없을 때
            const room = global.db.rooms[player.roomId];
            if (!room)
                return; // 만약 방이 삭제되고 요청이 올때
            try {
                room.sendAll('chat', {
                    name: player.username,
                    text: data.text,
                });
            }
            catch (e) {
            }
            break;
        }
    }
}
exports.event = event;
;
exports.close = (id) => {
    const player = global.db.users[id];
    const roomId = player ? player.roomId : null;
    try { // 취약점으로 서버 종료 방지
        if (roomId && global.db.rooms[roomId]) {
            const room = global.db.rooms[roomId];
            const body = { userId: id };
            if (room.player1 && room.player1.id !== id)
                room.player1.send('user_out', body);
            else if (room.player2)
                room.player2.send('user_out', body);
            delete global.db.rooms[roomId];
        }
        if (player)
            delete global.db.users[id];
    }
    catch (e) {
        console.error(`[ERROR] Close Error : error = ${e}`);
    }
};
