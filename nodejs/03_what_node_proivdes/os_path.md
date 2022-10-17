## os
- 운영체제의 정보를 담고있음
```js
const os = require('os');
// 운영체제 정보
os.arch();
os.platform();
os.type();
os.uptime();
os.hostname();
os.release();
// 경로
os.homedir();
os.tmpdir();
// cpu 정보
os.cpus();
os.cpus().length;
// 메모리 정보
os.freemem();
os.totalmem();
```
- 자세한건 nodejs 공식 문서에서 확인 가능
- 하드웨어에서 쓰는 용어와 node에서 쓰는 용어는 다를 수 있음
## path
- 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈
- path를 사용하면 경로 알아서 다 처리해줌
  - 윈도우 경로는 c:\users\... 
  - node 경로는 /users/...
- 절대경로에서 루트경로 `/`
- `path.join()` 은 절대경로를 무시
- `path.resolve()` 은 절대경로 주어지면 절대경로로 가버림
```js
const path = require('path');
path.join(__dirname, '..', '/test.js'); // => C:\users\...\test.js
path.resolve(__dirname, '..', '/test.js'); // => C:\test.js
```
```js
const path = require("path");
const file = __filename;
console.log(path.sep);
console.log(path.delimiter);
console.log(path.dirname(file));
console.log(path.extname(file)); // => .js
console.log(path.basename(file)); // => test.js
console.log(path.basename(file, path.extname(file))); // => test
console.log(path.parse(file)); // => { root: "C:\\", dir: "C:\\users\\...", base: "test.js", ext: ".js", name: "test" }
console.log(
  path.format({
    dir: "C:\\users\\user",
    name: "test",
    ext: ".js",
  })
); // => C:\users\user\test.js
console.log(path.normalize("C://users//user\\test.js")); // => C:\users\user\test.js
console.log(path.isAbsolute("C:\\")); // => 존재하면 true, 없으면 false
console.log(path.isAbsolute("./test"));
console.log(path.relative(".C:\\users\\user\\test.js", "C:\\")); // => ../../.. 부모로 올라가면 볼 수 있다
```