## call stack
- 동기 코드 담당
- 함수를 실행하는 부분
## event loop
- 비동기 코드 담당
### background
- 타이머를 처리하고 `이벤트 리스너`를 저장
- background에서 코드가 실행되는 것이 아니라 callback 함수들이 task queue로 들어감
  - `setTimeout`, `setInterval` 함수가 실행되고, 시간이 되면 callback 함수를 task queue로 보냄
  - `addEventListener`로 추가한 이벤트를 저장했다가 이벤트 발생 시 callback 함수를 task queue로 보냄
### task queue
- callback 함수들이 대기하는 공간, `call stack`으로 함수를 이동시킴
- 실행은 `call stack`에서
