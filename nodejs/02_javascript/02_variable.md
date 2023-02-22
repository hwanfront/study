## 스코프
- `var`는 함수 스코프를 존중한다.
- `let`과 `const` 는 블록 스코프를 존중한다.
```js
if (true) {
  const x = 3;
}
console.log(x); // error

function a() {
  var x = 1;
}
console.log(x); // error
```
- `let`과 `const`는 `var` 완벽하게 대체 가능
## 구조분해할당
- 객체, 배열에서 사용
- 객체에 this가 호출된 함수가 있을 경우 구조분해할당을 하지 말자
```js
const obj = { a: 1, b: { c: 2, d: 3 } };
const { a, b: { c, d } } = obj;
console.log(a) // => 1
console.log(c) // => 2
console.log(d) // => 3
``` 
```js
const arr = [1,2,3];
const [a,,b] = arr;
console.log(a) // => 1
console.log(b) // => 3
``` 
## 템플릿 문자열
```js
var name = '홍길동'
const result = `이름: ${name}`

function a() {}
a();
a``;
```
## 객체 리터럴
```js
var foo = function () {}
var b = 'b';

var obj = {
  a: function () {},
  foo: foo,
}
obj[b + 6] = 'bbb';
```
```js
var foo = function () {}
var b = 'b';

const obj = {
  a() {},
  foo,
  [b + 3]: 'bbb',
}
```