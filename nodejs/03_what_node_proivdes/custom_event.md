## custom event
```js
const EventEmitter = require("events");

const myEvent = new EventEmitter();
myEvent.addListener("event1", () => {
  console.log("1");
});
myEvent.on("event2", () => {
  console.log("2");
});
myEvent.on("event2", () => {
  console.log("2+");
});
myEvent.once("event3", () => {
  console.log("3");
}); // 한 번만 실행

myEvent.emit("event1"); // 이벤트 실행
myEvent.emit("event2");
myEvent.emit("event3");
myEvent.emit("event3");
myEvent.on("event4", () => {
  console.log("4");
});
myEvent.emit("event4");
myEvent.removeAllListeners("event4"); // 이벤트 전부 삭제
myEvent.emit("event4");
const listener = () => {
  console.log("5");
};
myEvent.on("event5", listener);
myEvent.emit("event5");
myEvent.removeListener("event5", listener); // 특정 이벤트만 삭제
myEvent.emit("event5");

console.log(myEvent.listenerCount("event2")); // 이벤트에 콜백함수가 몇 개 등록되어 있는지
```
```bash
1
2
2+
3
4
5
2
```