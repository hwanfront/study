## child_process
- 셸 명령어 실행
```js
const exec = require("child_process").exec;
var process = exec("cmd /c chcp 65001>nul && dir"); // cmd 의 dir 입력 시 한글 깨짐으로 수정

process.stdout.on("data", function (data) {
  console.log(data.toString());
});

process.stderr.on("data", function (data) {
  console.error(data.toString());
});
```
- python 파일 실행 (설치된 상태에서 해야함)
```python
print('hello')
```
```js
const spawn = require("child_process").spawn;
const process = spawn("python", ["hello.py"]);

process.stdout.on("data", function (data) {
  console.log(data.toString());
});

process.stderr.on("data", function (data) {
  console.error(data.toString());
});
```
### 기타 모듈
- assert: 값을 비교해 프로그램이 제대로 동작하는지 테스트
- dns: 도메인 이름에 대한 IP 주소 얻어낼 떄
- net: HTTP보다 로우 레벨인 TCP, IPC 통신
- string_decoder: 버퍼데이터를 문자열로
- tls: TLS, SSL
- tty: 터미널
- dgram: UDP
- v8 : v8엔진
- vm: 가상머신