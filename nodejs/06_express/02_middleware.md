## body-parser
- 요즘은 사용하지 않음 
- request body 데이터를 해석해 req.body 객체로 만들어주는 미들웨어
- 이미지, 동영상 등 multipart data는 처리하지 못함
- 4.16.0 버전부터 body-parser 미들웨어의 일부 기능 내장
- 단, json, urlencoded 외에 raw, text와 같은 데이터의 경우 따로 설치해야함
```js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
```
### express.json()
- client 에서 json 데이터를 보냈을 때 json 데이터를 parsing 해서 req.body에 보내줌
### express.urlencoded(...)
- form 데이터 보낼 때 (submit) parsing
- 이미지 등 파일은 받을 수 없음
- extended: query string를 어떻게 처리할거냐, true 시 qs 사용, false 시 querystring
## morgan
- 클라이언트에서 어떤 요청이 왔는지 응답에 대한 로그를 서버에 기록
- https://www.npmjs.com/package/morgan
- morgan(`format`, `option`)
- `format`
  - morgan('dev'): 개봘환경
  - morgan('combined'): 배포환경
  - 외 common, short, tiny
- `option`
  - morgan(`format`, { immediate: ... }): response 대신 request 에 따라 로그 작성, response 데이터를 기록할 수 없는 경우가 생기기 떄문
  - morgan(`format`, { skip: ... }): 로킹의 스킵여부 결정
  - morgan(`format`, { stream: ... }): 로그 작성을 위한 output stream 옵션, 기본은 process.stdout
## cookie-parser
- 4장에서 사용한 cookie를 쉽게 parsing하게 도와주는 미들웨어
## express.static
- 이미지, 동영상 등 정적 파일들을 제공하기 위한 라우터 역할
- 클라이언트가 서버의 경로 등 예측할 수 없는 역할을 하기도 함
```js
app.use(요청경로, express.static(실제 경로));
```
## express-session
- 

> 미들웨어 순서에 정해진 것은 없고 적절하게 배치해야 함.