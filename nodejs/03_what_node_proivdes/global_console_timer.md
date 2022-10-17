- 서버, 모바일앱, 머신러닝 등 여러가지 할 수 있는 건 node 가 다양한 기능 제공하기 때문
## global
- 노드 전역 객체
- `global` 또는 `globalThis`
- 브라우저에서 window 에는 브라우저를 조작할 수 있는 기능들이 있지만 node에는 없는 것들이 있음
- global은 생략 가능
  - etc) `console.log();` `setTimeout(...)`
- global 속성 공유는 하지 않는 게 좋음
## console 객체
- 터미널, 쉘
- `console.log()`: 로깅
- `console.dir()`: 객체 로깅
- `console.time()`, `console.timeEnd()`: 시간 로깅
- `console.error()`: 에러 로깅
- `console.table()`: table 형태 로깅
## 타이머
- `setTimeout(콜백함수, 밀리초)`: 주어진 시간 후에 콜백 함수 실행
- `setInterval(콜백함수, 밀리초)`: 주어진 시간마다 콜백 함수 실행
- `setImmediate(콜백함수)`: 콜백 함수를 즉시 실행
- `clearTimeout(아이디)`: setTimeout 취소
- `clearInterval(아이디)`: setInterval 취소
- `clearImmediate(아이디)`: setImmediate 취소