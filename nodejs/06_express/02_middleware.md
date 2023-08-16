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
- 사용자에 대한 고유한 세션을 생성, 개인의 저장 공간이 생성됨
- express()

> 미들웨어 순서에 정해진 것은 없고 적절하게 배치해야 함.

### 미들웨어 확장
- 미들웨어 안에 미들웨어를 넣는 방법
```js
app.use(morgan('dev'));
app.use((req, res, next) => {
  morgan('dev')(req, res, next);
});
```
- 조건에 따라 다른 미들웨어의 실행 등을 위해 (CORS, passport 등)
```js
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    morgan('combined')(req, res, next);
  } else {
    morgan('dev')(req, res, next);
  }
});
```
## multer
- `form 태그`의 `enctype`이 `multipart/form-data`인 경우 (이미지나 파일 업로드)
- body-parser로 요청 본문 해석할 수 없음 => multer 패키지 필요
```js
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb
})
```
```bash
storage 저장할 공간에 대한 정보
diskStorage 하드디스크에 업로드 파일 저장
destination 저장할 경로
filename 저장할 파일명 (파일명+날짜+확장자 형식)
Limits 파일 개수나 파일 사이즈 제한
```
- upload.미들웨어(데이터이름)
- 미들웨어는 none, single, array, fields 존재
  - array, fields는 여러 개의 파일 업로드
  - array는 *하나의 요청* body 이름 아래 *여러 파일* 있는 경우
  - fields는 *여러 개 요청* body 이름 아래 *파일이 하나씩* 있는 경우
- [./public/02_08_multipart.html](./public/02_08_multipart.html)
- [./02_08_multer.js](./02_08_multer.js)
## dotenv
- 비밀키 또는 환경변수, 설정 등 값들을 관리하기 위한 패키지
- 보통 `.env` 파일을 만들어 따로 관리함
- ignore 파일에 추가하진 않았는데 원래는 추가하여 git과 같은 저장소에 올리지도 않음
- 사람마다 가져야 할 권한들을 나누어 사용할 수 있도록 다르게 나누어 주고 관리하자
- [./02_09_dotenv.js](./02_09_dotenv.js)
## Router
router의 개수가 많아진다면 `app.js`파일이 상당히 길어질 수 있으므로 분리하기 위해 사용합니다.
```js
// test.js
const express = require('express');
const router = express.Router();

// GET => /test/a
router.get('/a', (req, res) => {
  res.send('hello a');
});

module.exports = router;
```
```js
// app.js 
const express = require('express');
const testRouter = require('./test.js');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use('/test', testRouter);

// GET => /b
app.get('/b', (req, res) => {
  res.send('hello b');
});

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행')
})
```
## route 매개변수와 query string
- 동적으로 변하는 부분을 route 매개변수로 사용하며 `req.params`로 불러옵니다. params 로 들어올 `:변수`가 들어간 라우터는 일반 라우터보다 뒤에 위치해야 합니다.
```js
// /item/1
app.get('/item/:id', (req, res) => {
  console.log(req.params.id); // => 1
});
```
- query string 부분은 `req.query`로 불러옵니다.
```js
// /item/1?q=abc&value=10
app.get('/item/:id', (req, res) => {
  console.log(req.query.q); // => 'abc'
  console.log(req.query.value); // => '10'
})
```
## 404 미들웨어
요청에 일치하는 라우터가 없는 경우를 대비한 라우터를 생성합니다.
```js
app.use((req, res, next) => {
  res.status(404).send('404 not found');
})
```
## 라우터 그룹화
```js
router.get('/test', (req, res) => { 
  res.send('get /abc');
});
router.post('/test', (req, res) => { 
  res.send('post /abc');
});
```
```js
router.route('/test')
  .get((req, res) => { 
    res.send('get /abc');
  })
  .post((req, res) => { 
    res.send('post /abc');
  });
```
## req
- `req.app` app 객체에 접근
- `req.body` body-parser 미들웨어 body를 해석한 객체
- `req.cookies` cookie-parser 미들웨어 cookie를 해석한 객체
- `req.ip` 요청의 ip 주소
- `req.params` 라우트 매개변수에 대한 객체
- `req.query` 쿼리스트링 정보에 대한 객체
- `req.signedCookies` 서명된 쿠키, req.cookies에 담기지 않음
- `req.get(header)` header의 값을 가져오기 위한 메서드
## res
- `res.app` app 객체에 접근
- `res.cookie(key, value, [option])` 쿠키를 설정하는 메서드
- `res.clearCookie(key, value, [option])` 쿠키를 제거하는 메서드
- `res.setHeader(header, value)` 응답 헤더 설정 [참고](../04_http_module_server/04_session.js)
- `res.status(code)` HTTP 상태 코드를 지정
### res 응답
전체 요청에 대해 한번만 사용해야 함
- `res.end()` 데이터 없이 응답을 보냄
- `res.json(JSON)` JSON 형식 응답을 보냄
- `res.redirect(link)` redirect 할 주소와 함께 응답을 보냄
- `res.render(view, data)` 템플릿 엔진을 렌더링해 응답할 때 사용하는 메서드
- `res.send(data)` 데이터와 함께 응답을 보냄. 문자열이나 HTML, buffer, Object, Array 등
- `res.sendFile(path)` 경로에 위치한 파일을 응답
