## __filename, __dirname
- `__filename`: 현재 파일 경로
- `__dirname`: 현재 디렉토리 경로
## 
- 아래 두 예제는 같음
- 기본은 `module.exports === exports` 임, 값은 `{}`
- 같이 사용하면 아래는 새로운 객체로 참조관계가 끊히기 때문에 위에서 작성한 게 무시됨
```js
exports.a = a;
exports.b = b;
```
```js
module.exports = { a, b }
```
- exports에 하나만 넣고싶으면 아래와 같이 사용
  - module.exports !== exports
```js
function a() {}
module.exports = a;
```
## 전역 scope의 this는 module.exports
```js
console.log(this); // => {}
console.log(module.exports); // => {}
console.log(exports); // => {}
console.log(this === module.exports); // => true
console.log(this === exports); // => true
console.log(JSON.stringify(this) === JSON.stringify({})); // => true

function a() {
  console.log(this === global); // => true
}
a();

```