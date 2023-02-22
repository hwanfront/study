## 암호화
- 암호화: 평문을 함호로
- 복호화: 암호를 평문으로
## 해시 기법
- 비밀번호는 해시 기법, 엄밀히 말하면 암호화는 아님
- 문자열을 고정된 길이의 다른 문자열로 바꾸는 형식
- 특정한 비밀번호가 있을 때 이를 해시화 하면 항상 일정한 값이 나옴
### hash 사용
- createHash(알고리즘): 사용할 해시 알고리즘을 넣어줌
  - md5, sha1, sha256 등 있지만 최소 sha512 사용, 취약해지면 바꿔야할수도
- update(문자열): 변경할 문자열 넣어줌
- digest(인코딩): 인코딩할 알고리즘 넣어줌
  - base64, hex, latin1 등, base64가 문자열이 가장 짧아 애용
```js
const crypto = require('crypto');

crypto.createHash('sha512').update('aaaa').digest('base64');
crypto.createHash('sha512').update('aaaa').digest('hex');
crypto.createHash('sha512').update('bbbb').digest('base64');
```
## pbkdf2, bcrypt, scrypt 
- sha512 취약해지면 sha3 으로 넘어감
### pbkdf2 사용
- salt 와 비밀번호 결과를 db에 저장해두어야함
```js
const crypto = require("crypto");

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString("base64");
  
  crypto.pbkdf2("비밀번호", salt, 100000, 64, "sha512", (err, key) => {
    console.log(key.toString("base64"));
  });
});
```
## 양방향 암호화
- key 관리는 어려운 문제... 
### 대칭형 암호화
- key 사용됨
- 암호문 복호화 가능, 복호화 할 떄 같은 key 사용
- 서버에서 암호화해서 보내주었는데 프론트단에서 해독하려면 결국엔 key를 알아야 함
- 프론트단은 공개적이라서 key를 감추기 어려움
- aes 추천
```js
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"; // 32byte
const iv = "bbbbbbbbbbbbbbbb"; // 16byte
const cipher = crypto.createCipheriv(algorithm, key, iv);
let cipherResult = cipher.update("test", "utf8", "base64");
cipherResult += cipher.final("base64");
console.log("암호화 결과: ", cipherResult); // => 암호화 결과:  JSkhLYfOlYEFQ/QnYrr8DQ==

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decipherResult = decipher.update(cipherResult, "base64", "utf-8");
decipherResult += decipher.final("utf8");
console.log("복호화 결과: ", decipherResult); // => 복호화 결과:  test
```
#### 초기화 벡터 공격
- 기존에는 createCipher 보다 제약이 많은 createCipheriv
### 비대칭 암호화
- 프론트와 서버가 다른 key를 가지고 있으면서 암호화, 복호화 하는 방법
- ex) https
- RSA 추천

## util
- 각종 편의 기능을 모아둔 모듈
- `deprecated`: 어떤 코드를 잘못 만들었을 때, 기존 코드를 삭제하지 않고 잘못되었다는 것을 메시지로 알려주는 것 
```js
const util = require("util");

const dontUseMe = util.deprecate((x, y) => {
  console.log(x + y);
}, "dontUseMe 함수는 deprecated 되었으니 더 이상 사용하지 마세요!");

dontUseMe(1, 2);
```
- `promisify`: node 에서 callback으로 남아있는 코드와 같이 Promise 지원 안하는 경우에 감싸주면 Promise 패턴으로 바뀜
  - 단, callback 형식이 `(error, data) => {}` 형식
```js
const util = require("util");
const crypto = require("crypto");
const randomBytesPromise = util.promisify(crypto.randomBytes);

randomBytesPromise(64)
  .then((buf) => {
    console.log(buf.toString("base64"));
  })
  .catch((error) => {
    console.error(error);
  });

```
- `callbackify`: Promise가 callback 으로 바뀜
  - 잘 사용하지 않음