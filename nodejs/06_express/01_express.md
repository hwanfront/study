# Express
- express는 기본적으로 위에서 아래로 실행
```js
const express = require("express");
const app = express();

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행')
})
```
## router
### 기본 router 사용
- `res.writeHead()`등을 `send()`와 같이 편하게 사용하도록 합쳐놓은 것도 express의 기능
- `send()`나 `sendFile()`, `json()`, `render()`등 응답은 한번만 작성
  - 보통 api 서버는 `res.json()`을 많이 쓰고, 웹서버는 `res.sendFile` 사용
- `res.writeHead()`는 응답 이전에 작성
```js
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/about', (req, res) => {
  res.status(200).send('about'); // status를 명시해주지 않으면 기본 200
})

app.post('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})
```
### wildcard (route parameter)
- 다음과 같이 router의 url에 공통적인 부분이 있을 때
```js
app.get('/category/a', (req, res) => {
  res.send('a');
})

app.get('/category/b', (req, res) => {
  res.send('b');
})

app.get('/category/c', (req, res) => {
  res.send('c');
})
```
- wildcard를 사용하는 경우
```js
app.get('/category/:name', (req, res) => {
  res.send(req.params.name);
})
```
- wildcard에 예외를 두고싶은 경우 
- 위에서부터 아래로 실행되기 때문에 범위가 넓은 wildcard같은 경우에는 아래에 가도록 작성
```js
app.get('/cateogry/d', (req, res) => { 
  res.send('예외')
})

app.get('/category/:name', (req, res) => { 
  res.send(req.params.name);
})
```
## middleware
- 중복을 없애기위해서 사용
### 기본 middleware 사용
```js
app.use((req, res, next) => { // middleware를 use에 장착
  console.log('middleware 모든 요청에서 실행');
  next(); // next를 해주어야만 다음으로 넘어가서 실행
})
```
### 특정 url에만 middleware 사용
```js
app.use('/about', (req, res, next) => { // about에서만 실행 가능
  console.log('about에서만 middleware 실행');
  next(); // next를 해주어야만 다음으로 넘어가서 실행
})
```
### 동시에 여러 개 middleware 사용
```js
app.use((req, res, next) => { // middleware를 동시에 여러 개
  console.log('middleware 모든 요청에서 실행1');
  next(); 
}, (req, res, next) => { 
  console.log('middleware 모든 요청에서 실행2');
  next(); 
}, (req, res, next) => { 
  console.log('middleware 모든 요청에서 실행3');
  next(); 
})
```
## Error middleware 
### 에러를 포함한 middleware 사용
- express에서 에러 메시지를 제공해주지만 실제로는 사용하지 않음
```js
app.use((req, res, next) => { // middleware를 use에 장착
  console.log('middleware 모든 요청에서 실행');
  next(); // next를 해주어야만 다음으로 넘어가서 실행
}, (req, res, next) => {
  throw new Error('error'); // express에서 에러 메시지를 제공해주지만 실제로는 사용하지 않음
})
```
- router 이후에 에러 middle 사용
  - `(err, req, res, next) => {}`
  - `(err, req, res) => {}` 와 다르기 때문에 조심
- 보안 문제로 일부러 에러 코드를 숨기기도 함
```js

app.use((req, res, next) => { // middleware를 use에 장착
  console.log('middleware 모든 요청에서 실행');
  next(); // next를 해주어야만 다음으로 넘어가서 실행
}, (req, res) => {
  throw new Error('에러발생');
})

app.use((err, req, res, next) => {
  res.status(500).send('에러 발생');
})
```
## next() 활용
### 에러처리
- `next(error)` 다음 middleware로 가는 게 아니라 에러처리 middleware로
```js
app.use((req, res, next) => {
  try {
    console.log(undefinedVariable); // 에러
  } catch (error) {
    next(error); // 에러 middleware로 
  }
})

app.use((req, res, next) => { // 실행 x
  res.status(200).send('404 에러'); 
})

app.use((err, req, res, next) => { // 실행 o
  console.error(err);
  res.status(200).send('에러 발생');
})
```
### next()의 실행 순서
- `next('route');`라우터에 연결된 나머지 미들웨어들을 건너뛰고 다음 라우터로 넘어감
```js
app.get('/', (req, res, next) => { 
  res.sendFile(path.join(__dirname, 'index.html'));
  next('route');
}, (req, res) => { 
  console.log('실행2');
})

app.get('/', (req, res) => {
  console.log('실행1');
})

```
```bash
실행1
```
```js
app.get('/', (req, res, next) => { 
  res.sendFile(path.join(__dirname, 'index.html'));
  next();
}, (req, res) => { 
  console.log('실행2');
})

app.get('/', (req, res) => {
  console.log('실행1');
})

```
```bash
실행2
```
```js
app.get('/', (req, res, next) => { 
  res.sendFile(path.join(__dirname, 'index.html'));
  next();
}, (req, res, next) => { 
  console.log('실행2');
  next();
})

app.get('/', (req, res) => { // 실행
  console.log('실행1');
})
```
```bash
실행2
실행1
```