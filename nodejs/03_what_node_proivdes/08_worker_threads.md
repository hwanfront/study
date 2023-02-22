## worker_threads
- 노드에서 멀티 스레드 방식으로 작업 가능
- CPU를 많이 써야하는 암호화, 압축 등 직접 구현할 때 사용
- 코어 갯수에 따라 속도가 다르고 내가 사용할 수 있는 사양에 따라 다름
- 코어 생산 시간에 따라 속도가 생각과 다르게 나오기도 함
- `isMainThread`: 현재 코드가 main thread 에서 실행되는지 worker thread 에서 실행되는지 구분
- `worker.postMessage`: parent 에서 worker 로 데이터 보냄
- `parentPort.on('message')`: 부모로부터 데이터 받음
- `postMessage`: 데이터 보냄
```js
const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) { // 메인 쓰레드
  const worker = new Worker(__filename);
  worker.on("message", (message) => console.log(message));
  worker.on("exit", () => console.log("exit"));
  worker.postMessage("worker post");
} else { // 워커 쓰레드
  parentPort.on("message", (value) => {
    console.log(value);
    parentPort.postMessage("parent post");
    parentPort.close();
  });
}
``` 
```bash
$ node test.js 
worker post
parent post
exit
```
```js
const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  // 메인 쓰레드
  const threads = new Set();
  const THREAD_COUNT = 3;
  for (let i = 0; i < THREAD_COUNT; i++) {
    threads.add(
      new Worker(__filename, {
        workerData: { start: i },
      })
    );
  }
  for (let worker of threads) {
    worker.on("message", (message) => console.log(message));
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.log("exit");
      }
    });
    worker.postMessage("worker post");
  }
} else {
  // 워커 쓰레드
  parentPort.on("message", (value) => {
    console.log(value);
    parentPort.postMessage("parent post");
    parentPort.close();
  });
}

``` 
```bash
$ node test.js 
worker post
parent post
worker post
parent post
worker post
parent post
exit
```