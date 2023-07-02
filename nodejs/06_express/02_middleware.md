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
```html
<!-- ./public/02_08_multipart.html -->
<form id="single" action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="image" />
  <input type="text" name="title" />
  <button type="submit">업로드</button>
</form>

<form id="array" action="/uploads/array" method="post" enctype="multipart/form-data">
  <input type="file" name="images" multiple />
  <button type="submit">업로드</button>
</form>

<form id="fields" action="/uploads/fields" method="post" enctype="multipart/form-data">
  <input type="file" name="image1" />
  <input type="file" name="image2" />
  <button type="submit">업로드</button>
</form>
```
```js
// ./02_08_multer.js
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  console.log(req.body.title);
  res.send('ok');
})

app.post('/uploads/array', upload.array('images'), (req, res) => {
  console.log(req.files);
  res.send('ok');
})

app.post('/uploads/fields', upload.fields([{name: 'image1'}, {name: 'image2'}]), (req, res) => {
  console.log(req.files);
  res.send('ok');
})
```