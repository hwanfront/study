## process
- 현재 실행중인 노드 프로세스에 대한 정보릉 담고 있음
- process.version
  - ex) 'v16.14.2'
- process.arch 
  - ex) 'x64'
- process.platform
  - ex) 'win32'
- process.pid
  - ex) 20236
- process.uptime()
  - ex) 27.1947184
- process.execPath
  - ex) 'C:\\Program Files\\...'
- process.cwd()
  - ex) 'C:\\Users\...'
- process.cpuUsage()
  - ex) { user: 515000, system: 218000 }
- process.uptime()
  - 프로세스가 켜진 시간
- process.exit(0), process.exit(1)
  - 프로세스 종료, 0이나 없으면 정상 종료, 다른 코드는 비정상 종료
### process.env
- 환경 변수가 들어있는 객체
- ex) 노드 실행 옵션 process.env.NODE_OPTIONS, 스레드풀 개수 process.env.UV_THREADPOOL_SIZE
### process.nextTick(콜백함수)
- 이벤트 루프가 다른 콜백 함수들보다 nextTick 콜백
```js
setImmediate(() => { // 환경에 따라 3, 4
  console.log("immediate");
});
setTimeout(() => { // 환경에 따라 3, 4
  console.log("timeout");
}, 0); // 0 을 쓰려면 그냥 setImmediate 사용
Promise.resolve().then(() => { // 2
  console.log("promise");
});
process.nextTick(() => { // 1
  console.log("nextTick"); 
});
```