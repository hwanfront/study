### stream 장점
- 일정 크기로 보내면 받을 때에도 일정 크기로 잘라서 받아 각각을 조작할 수 있음
## pipe
- stream을 지원하는 곳만 사용 가능
- file copy
```js
const fs = require("fs");
const readStream = fs.createReadStream("./test.txt", { highWaterMark: 16 });
const writeStream = fs.createWriteStream("./test-copy.txt");

readStream.pipe(writeStream);
```
- file copy with zlib
```js
const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./test.txt", { highWaterMark: 16 });
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream("./test.txt.gz");

readStream.pipe(zlibStream).pipe(writeStream);
```
## buffer와 stream 방식의 메모리 효율
- 테스트 파일
```js
const fs = require("fs");
const file = fs.createWriteStream("./test.txt");

for (let i = 0; i <= 5_000_000; i++) {
  file.write("test test test test test test test test test test \n");
}
file.end();
```
### buffer memory
- 파일 사이즈만큼 메모리를 사용
```js
const fs = require("fs");
console.log("before: ", process.memoryUsage().rss);

const data1 = fs.readFileSync("./test.txt");
fs.writeFileSync("test-buffer.txt", data1);

console.log("buffer: ", process.memoryUsage().rss);
/**
 * ex)
 * before:  20029440
 * buffer:  276094976
 */
```
### stream memory
- 메모리를 파일 사이즈보다 작게 사용
```js
const fs = require("fs");
console.log("before: ", process.memoryUsage().rss);

const readStream = fs.createReadStream("./test.txt");
const writeStream = fs.createWriteStream("./test-stream.txt");
readStream.pipe(writeStream);
readStream.on("end", () => {
  console.log("stream: ", process.memoryUsage().rss); 
});
/**
 * ex)
 * before:  20033536
 * stream:  56766464
 */
```