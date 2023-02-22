# REPL
- Read Evaluate Print Loop
- 터미널에서 실행, 보통은 js 파일을 만들어서 실행함
```bash
$ node
$ node 파일명.js
```
# module
```js
// obj.js
const a = 'a';
const b = 'b';
module.exports = { a, b }

// arr.js
const a = 'a';
const b = 'b';
module.exports = [a, b];

// a.js
const { a, b } = require('./obj');
const obj = require('./obj');
const arr = require('./arr');
console.log(a) // => 'a'
console.log(b) // => 'b'
console.log(obj) // => { a: 'a', b: 'b' }
console.log(arr) // => ['a', 'b']
```
## es2015 모듈
- `require` 와 `import`, `module.export` 와 `export` 는 같지 않음
```js
import { a, b } from './obj';
import arr from './arr';

function example() {}

const aa = 'aa';
const bb = 'bb';

export { aa, bb };
export default example;
```
## require 특성
- require는 가장 위에 올 필요 없음
  - es2015의 import는 가장 위에 있어야 함
```js
require('./a'); // 실행만 할 수도 있음
```
### require.main
- 어떤 파일을 실행했는지 알 수 있음
### require.cache
- 한 번 require 했던 건 캐싱됨, 두번째부터는 캐시에 저장된걸 불러옴
- 캐시를 초기화하거나 미리 조작할 수 있는데 내장되어있는 기능에 손대는 건 위험한 일
```js
const { ... } = require('./a');
const b = require('./b');
```
## 순환참조
- 서로가 서로를 참조하는 경우, 빈 객체({})로 바꿔버려 차단해버림
- 직관적이지 않아 사용하지 않는 게 좋음
```js
require('./dep1');
```
```js
require('./dep2');
```