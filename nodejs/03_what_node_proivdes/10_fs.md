## fs
- 파일 시스템에 접근하는 모듈
- 파일/폴더 생성, 삭제, 읽기, 쓰기
- 웹 브라우저는 제한적이지만 노드는 권한을 가지고 있음
- 결과는 버퍼형태
### readFile
```js
const fs = require("fs");

fs.readFile("./test.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});
```
- promises
```js
const fs = require("fs").promises;

fs.readFile("./test.txt")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });
```
### writeFile
```js
const fs = require("fs");

fs.writeFile("./test.txt", "테스트", (err) => {
  if (err) {
    throw err;
  }
  fs.readFile("./test.txt", (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    console.log(data.toString());
  });
});
```
- promises
```js
const fs = require("fs").promises;

fs.writeFile("./test.txt", "테스트")
  .then(() => {
    return fs.readFile("./test.txt");
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });
```
### 비동기 문제점
- 비동기 함수에서 콜백은 `백그라운드`로 들어가서 동시에 실행
- 실행이 완료된 콜백 순서로 `테스크 큐`에 들어감
- `호출 스택`이 비워지면 `테스크큐`에 들어간 콜백이 `호출스택`으로 들어가 실행
- 아래 readFile 의 callback 중 어느 게 먼저 실행될지 알 수 없음
```js
const fs = require('fs');
fs.readFile("./a.txt", (err, data) => ...);
fs.readFile("./a.txt", (err, data) => ...);
fs.readFile("./a.txt", (err, data) => ...);
```
## 동기 메서드 사용
```js
const fs = require("fs");

let data = fs.readFileSync("./test.txt");
console.log(`1: ${data.toString()}`);
data = fs.readFileSync("./test.txt");
console.log(`2: ${data.toString()}`);
data = fs.readFileSync("./test.txt");
console.log(`3: ${data.toString()}`);
data = fs.readFileSync("./test.txt");
console.log(`4: ${data.toString()}`);
```
```js
const fs = require("fs").promises;

async function main() {
  let data = await fs.readFile("./test.txt");
  console.log(`1: ${data.toString()}`);
  data = await fs.readFile("./test.txt");
  console.log(`2: ${data.toString()}`);
  data = await fs.readFile("./test.txt");
  console.log(`3: ${data.toString()}`);
  data = await fs.readFile("./test.txt");
  console.log(`4: ${data.toString()}`);
}

main();
```
## 기타 fs 메서드
- 예시
```js
const fs = require("fs").promises;
const constants = require("fs").constants;

fs.access("./folder", constants.F_OK | constants.W_OK | constants.R_OK) // 폴더가 있는지 판단
  .then(() => {
    return Promise.reject("이미 존재하는 폴더");
  })
  .catch((err) => {
    if (err.code === "ENOENT") {
      console.log("폴더 없음");
      return fs.mkdir("./folder");
    }
    return Promise.reject(err);
  })
  .then(() => {
    console.log("폴더 생성 성공");
    return fs.open("./folder/file.js", "w"); // "w" 파일 생성, "a" 기존 파일에 글자 추가
  })
  .then((fd) => {
    console.log("빈 파일 생성 성공", fd);
    fs.rename("./folder/file.js", "./folder/newFile.js");
  })
  .then(() => {
    console.log("이름 바꾸기 성공");
  })
  .catch((err) => {
    console.error(err);
  });
```
### 파일 및 폴더 생성, 삭제
- `fs.access(path, option, callback)` : 폴더나 파일에 접근할 수 있는지 체크
  - `F_OK` : 파일 존재 여부
  - `R_OK` : 읽기 권한 여부
  - `W_OK` : 쓰기 권한 여부
  - 권한이 없다면 에러 발생, 파일/폴더가 없을 때 에러 코드는 `ENOENT`
- `fs.mkdir(path, callback)` : 폴더 만들기, 이미 존재한다면 에러 발생 
  - `fs.access(...)` 를 통해 미리 확인
- `fs.open(path, option, callback` : 파일의 아이디를 가져오는 메서드
  - 파일 아이디는 fd 변수, 아이디를 사용해 read, write 가능
  - 쓰려면 `w`, 읽으려면 `r`, 기존 파일에 추가 `a`
- `fs.rename(prevPath, newPath, callback`
### 폴더 내용 확인, 삭제
- `fs.readdir(path, callback)`: 폴더 내용물 확인
- `fs.unlink(path, callback)` : 파일 삭제, 없으면 에러
- `fs.rmdir(path, callback)` : 폴더 삭제, 없으면 에러
### 그 외
- `fs.copyFile(file, newFile)` : 파일 복사
  - read 후 write 해도 됨 => 다양한 작업 가능
- `fs.watch(file, callback)` : 파일 감시, 변경 사항 발생 시 이벤트 호출
```js
const fs = require('fs');
fs.watch('./test.txt', (eventType, fileName) => {
  ...
})
```
- `fs.existsSync(path)` : 파일이나 폴더가 존재하는지 확인
- `fs.stat(path, option)` : 파일인지 폴더인지 확인
- `fs.appendFile(path, data, callback)` : 파일 뒤에다 데이터를 더 추가
- `fs.chmod(path, mode, callback)` : 권한 변경