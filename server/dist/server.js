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
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const ws_1 = __importDefault(require("ws"));
const uuid_1 = require("uuid");
const event_1 = __importStar(require("./event"));
const app = express_1.default();
const server = http_1.default.createServer(app);
const wss = new ws_1.default.Server({
    server,
});
global.ws = {};
global.db = {
    rooms: {},
    users: {},
    matchQueue: [],
};
app.use((req, res, next) => {
    if (req.path.match(/\/js|\/css/g))
        return; // css 또는 js 폴더에 들어올 때 소스코드 유출을 방지하기 위함
    next();
});
app.use(express_1.default.static(__dirname + '/../../client')); // 배포때는 캐싱 maxAge 
wss.on('connection', (ws) => {
    // if (!req.headers['sec-websocket-key']) return ws.close();
    // const id = Array.isArray(req.headers['sec-websocket-key']) ? req.headers['sec-websocket-key'][0] : req.headers['sec-websocket-key'];
    const id = uuid_1.v4();
    global.ws[id] = ws;
    ws.on('message', (data) => event_1.default(ws, id, data));
    ws.on('close', () => event_1.close(id));
});
server.listen(process.env.PORT || 3000, () => {
    console.log('[INFO] Starting Web Server');
});
