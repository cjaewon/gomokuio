import { webSocket } from "rxjs/webSocket";
// import { ws } from "../data";

// // 변수 호이스팅 때문에 ws 가져올 수가 없음..
// const socket = new Observable(subscriber => {
//   ws.onmessage = ({ data }) => subscriber.next(data);
//   ws.onclose = () => subscriber.complete();
// });

// export default socket

const socket = webSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`);

export default socket;