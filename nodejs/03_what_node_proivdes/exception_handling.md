## 예외처리
- 처리하지 못한 에러, 에러 처리는 필수
- 노드는 스레드를 멈춤, 노드는 기본적으로 싱글 스레드라 프로세스가 멈추는 것
### try catch
- 에러가 발생할만한 코드에 작성
```js
try {
  ...
} catch (err) {
  ...
}
```
- 다만 사용하지 않아도 되는 곳은 사용하지 않는 게 좋음
  - 기본적으로 제공하는 비동기 메서드에 콜백 에러
```js
const fs = require('fs');

setInterval(() => {
  fs.unlink('./test.js', (err) => {
    if (err) {
      console.error(err);
    }
  });
}, 1000);
```
### Promise 에러 처리
- 따로 처리하지 않아도 됨, but 경고메시지 뜸
- but
```js
const fs = require('fs').promises;

setInterval(() => {
  fs.unlink('./test.js', );
}, 1000);
```
```bash
[Error: ENOENT: no such file or directory, ...
```
### 에러를 한번에 처리
- 콜백 함수의 동작이 보장되지 않음
- 에러 내용 기록 용으로만 사용하는 게 좋음
- 복구 작업용으로 사용하기엔 부적합
```js
process.on("uncaughtException", (err) => {
  console.error("예기치 못한 에러", err);
});

setInterval(() => {
  throw new Error("고장");
}, 1000);

setTimeout(() => {
  console.log("실행");
}, 2000);
```
```bash
예기치 못한 에러 Error: 고장
  at ...
...
실행
예기치 못한 에러 Error: 고장
  at ...
예기치 못한 에러 Error: 고장
  at ...
...
```
- 노드 자체에서 에러가 발생해 프로그램이 멈출 상황이면 빠르게 에러 파악해서 재시작 하는 게 좋음

## 프로세스
- 그때그때 모르는 게 있으면 찾아보자
### 프로세스 아이디 찾기
```bash
$ node
> process.pid
```
### 프로세스 강제종료
- 윈도우
```bash
$ netstat -ano | findstr 포트
$ taskkill /pid 프로세스id /f
```
- 맥/리눅스
```bash
$ lsof -i tcp:포트
$ kill -9 프로세스id
```
