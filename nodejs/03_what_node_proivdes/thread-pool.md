## 스레드풀
- fs, crypto, zlib 모듈 메서드들은 백그라운드에서 동시에 돌아감
### 스레드풀 개수 
- ex) 4개 코어를 사용하는 
```js
const crypto = require("crypto");

const pass = "pass";
const salt = "salt";
const iteration = 1_000_000;
const keylen = 128;
const digest = "sha512";
const start = Date.now();

const ATTEMPT_COUNT = 8;

for (let i = 0; i < ATTEMPT_COUNT; i++) {
  crypto.pbkdf2(pass, salt, iteration, keylen, digest, () => {
    console.log((i + 1).toString(), Date.now() - start);
  });
}
/**
 * 결과
 * 1)       2)       3)
 * 3 4975   4 5707   1 7256
 * 4 5065   3 5810   4 7319
 * 1 5104   2 6084   3 7332
 * 2 5180   1 6241   2 7336
 * 5 10191  5 11402  5 13809
 * 7 10341  6 11597  7 13901
 * 8 10347  8 11686  8 14261
 * 6 10353  7 11823  6 14494
 */
```
- node 사용 코어 개수 변경
```bash
$ UV_THREADPOOL_SIZE=8
$ SET UV_THREADPOOL_SIZE=8
```
```js
/**
 * 결과
 * 2 6704
 * 3 6897
 * 7 6920
 * 6 6925
 * 8 7843
 * 1 7865
 * 4 7920
 * 5 8090
 * /
```