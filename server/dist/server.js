"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const ws_1 = __importDefault(require("ws"));
const uuid_1 = require("uuid");
const routes_1 = __importDefault(require("./routes"));
const event_1 = require("./event");
const app = express_1.default();
const server = http_1.default.createServer(app);
const wss = new ws_1.default.Server({ server });
global.db = {
    rooms: {},
    users: {},
    matchQueue: [],
};
app.use((req, res, next) => {
    if (req.path.match(/\/ts|\/css/g))
        return; // css 또는 js 폴더에 들어올 때 소스코드 유출을 방지하기 위함
    next();
});
app.use(express_1.default.static(__dirname + '/../../client')); // 배포때는 캐싱 maxAge 
app.use(routes_1.default);
wss.on('connection', (ws) => {
    const id = uuid_1.v4();
    console.log(`[INFO] New User : id = ${id}`);
    ws.on('message', (data) => event_1.event(ws, id, data));
    ws.on('close', () => event_1.close(id));
});
server.listen(process.env.PORT || 3000, () => {
    console.log(`[INFO] Starting Web Server : port = ${process.env.PORT || 3000}`);
});
