## 버퍼
- 일정한 크기로 모아두는 데이터
- 일정한 크기가 되면 한번에 처리
- 대용량 파일 서버 등 할 때에는 필수, 메모리를 아낄 수 있음
- 나눠진 조각을 chunk 라고 부름
```js
const buffer = Buffer.from("버퍼버퍼 버퍼버퍼버퍼");
console.log(buffer); // => <Buffer eb b2 84 ed 8d bc eb b2 84 ed 8d bc 20 eb b2 84 ed 8d bc eb b2 84 ed 8d bc eb b2 84 ed 8d bc>
console.log(buffer.length); // => 31
console.log(buffer.toString()); // => 버퍼버퍼 버퍼버퍼버퍼
```
- 버퍼가 객체에 여러 개 들어있는 경우, 버퍼 합치기
```js
const array = [
  Buffer.from("test1"),
  Buffer.from("test2"),
  Buffer.from("test3"),
];
const buffer = Buffer.concat(array);
console.log(buffer.toString()); // => test1test2test3
```
- 데이터 없는 빈 버퍼 만들기
```js
const buffer = Buffer.alloc(5);
console.log(buffer); // => <Buffer 00 00 00 00 00>
```
- 파일 버퍼로 읽기
  - `createReadStream` 은 기본 64kb 를 읽음, 조절하기 위해서 `{ highWaterMark: ... }`
```js
const fs = require("fs");
const readStream = fs.createReadStream("./test.txt", { highWaterMark: 16 });

const data = [];

readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log(chunk.length, chunk.toString());
});

readStream.on("end", (chunk) => {
  console.log(Buffer.concat(data).toString());
});

readStream.on("error", (err) => {
  console.err(err);
});
```
- 파일 버퍼로 쓰기
```js
const fs = require("fs");
const writeStream = fs.createWriteStream("./write.txt");

writeStream.on("finish", () => {
  console.log("파일 쓰기 완료");
});

writeStream.write("글 작성 \n");
writeStream.write("test\n");
writeStream.write("마지막줄");
writeStream.end();
```
### 버퍼링
- 버퍼에 데이터가 찰 때까지 모으는 작업
## 스트림
- 데이터의 흐름
- 일정한 크기로 나누어 여러 번에 걸쳐서 처리
- 버퍼의 크기를 작게 만들어 주기적으로 데이터 전달
- 서버의 메모리를 적게 차지하면서 효율적으로 데이터를 보낼 수 있음
- 요청 응답 할 때에도 많이 적용
### 스트리밍
- 일정한 크기의 데이터를 지속적으로 전달하는 작업