## url 모듈
- [node url](https://nodejs.org/dist/latest-v19.x/docs/api/url.html)
- 위는 node, 아래는 WHATWG (비교적 최신)
```bash
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```
- 가끔 hostname을 생략한 주소로 사용되었을 때 node 방식을 사용해야 할 필요가 생기기도 함
  - `https://example.com/aaa` => `/aaa`
```js
import url from 'node:url'; // legacy API

const pathname = '/p/a/t/h';
const search = '?query=string';
const hash = '#hash';

const whatwgURL1 = new URL(`https://user:pass@sub.example.com:8080${pathname}${search}${hash}`);

const whatwgURL2 = new URL(`https://user:pass@sub.example.com:8080`);
whatwgURL2.pathname = pathname;
whatwgURL2.search = search;
whatwgURL2.hash = hash;

const nodeURL = url.parse(`https://user:pass@sub.example.com:8080${pathname}${search}${hash}`)
```
## searchParams
- WHATWG 방식의 querystring 부분 처리를 도와주는 객체
- querystring은 데이터를 담고있는 부분
```js
const { URL } = require("url");

const myURL = new URL("https://example.com/p/a/t/h?page=2&limit=10&category=a&category=b&category=c");
console.log(myURL.searchParams.getAll("category")); // => ['a', 'b', 'c']
console.log(myURL.searchParams.get("page")); // => '2'
console.log(myURL.searchParams.has("q")); // => false
console.log(myURL.searchParams.keys()); // => URLSearchParams Iterator { 'page', 'limit', 'category', 'category', 'category' }
console.log(myURL.searchParams.values()); // => URLSearchParams Iterator { '2', '10', 'a', 'b', 'c' }

myURL.searchParams.append("q", "1");
myURL.searchParams.append("q", "2");
console.log(myURL.searchParams.getAll("q")); // => ['1', '2']

myURL.searchParams.set("q", "3");
console.log(myURL.searchParams.getAll("q")); // => ['3']
myURL.searchParams.delete("q");
console.log(myURL.searchParams.getAll("q")); // => []
console.log(myURL.searchParams.toString()); // => 'page=2&limit=10&category=a&category=b&category=c'

console.log(myURL.search); // => '?page=2&limit=10&category=a&category=b&category=c'
myURL.search = `${myURL.searchParams.toString()}&q=aaaa`;
console.log(myURL.search); // => '?page=2&limit=10&category=a&category=b&category=c&q=aaaa'
```