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
const utill_1 = require("../lib/utill");
function event(ws, id, socketData) {
    const response = JSON.parse(socketData);
    const name = response.name;
    const data = response.data;
    switch (name) {
        case 'join': {
            if (data.username.length > 7)
                return;
            const user = new User_1.default(id, data.username);
            global.db.users[id] = user;
            ws.send(utill_1.bind('user_data', { user }));
            const room = system.matching(user);
            if (!room)
                return;
            if (!room.player1 || !room.player2)
                return;
            global.db.rooms[room.id] = room;
            try {
                global.ws[room.player1.id].send(utill_1.bind('game_start', { room }));
                global.ws[room.player2.id].send(utill_1.bind('game_start', { room }));
            }
            catch (e) {
                console.error(e);
            }
        }
        case 'click': {
            const player = global.db.users[id];
            const room = global.db.rooms[player.roomId];
            if (!room)
                return; // 만약 방이 삭제되고 요청이 올때
            if (room[room.turn].id !== player.id)
                return; // 자신의 턴이 아닐 때 요청
            if (room.map[data.x][data.y] !== 0 || data.y > 15 || data.x > 15)
                return; // 이미 값이 있거나 범위를 넘을 때
            room.map[data.x][data.y] = room.turn === 'player1' ? 1 : 2; // 1 검은 돌 2 흰 돌
            room.turn = room.turn === 'player1' ? 'player2' : 'player1';
            const body = {
                x: data.x,
                y: data.y,
                color: room.map[data.x][data.y],
                turn: room.turn,
            };
            global.ws[room.player1.id].send(utill_1.bind('click', body));
            global.ws[room.player2.id].send(utill_1.bind('click', body));
            const win = system.checkGameEnd(room.id);
            if (win) {
                global.ws[room.player1.id].send(utill_1.bind('game_end', { win }));
                global.ws[room.player2.id].send(utill_1.bind('game_end', { win }));
                delete global.db.rooms[room.player1.roomId];
            }
        }
    }
}
exports.default = event;
;
exports.close = (id) => {
    // TODO: 유저 한명이 나가면 나갔다고 표시하고 10초 뒤에 방 제거
    const roomId = global.db.users[id].roomId;
    if (!roomId) return;
    
    try { // 취약점으로 서버 종료 방지
        if (roomId !== null) {
            const room = global.db.rooms[roomId];
            const body = { userId: id };
            if (room.player1 && room.player1.id !== id) {
                global.ws[room.player1.id].send(utill_1.bind('user_out', body));
            }
            else if (room.player2) {
                global.ws[room.player2.id].send(utill_1.bind('user_out', body));
            }
            delete global.db.rooms[roomId];
        }
        delete global.db.users[id];
        delete global.ws[id];
    }
    catch (e) {
        console.error(e);
    }
};
