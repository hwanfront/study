const express = require("express");
const path = require('path');

const app = express();

// 설정
app.set('port', process.env.PORT || 3000);

// 공통 미들웨어
app.use((req, res, next) => { // middleware를 use에 장착
  console.log('middleware 모든 요청에서 실행');
  next(); // next를 해주어야만 다음으로 넘어가서 실행
})

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

app.use('/about', (req, res, next) => { // about에서만 실행 가능
  console.log('about에서만 middleware 실행');
  next(); // next를 해주어야만 다음으로 넘어가서 실행
})

// 라우터
app.get('/', (req, res) => { // router
  res.sendFile(path.join(__dirname, 'index.html'));
})

// 404에러 처리
app.use((req, res, next) => {
  res.status(404).send('404 에러'); // 일부러 코드를 알려주지 않기 위해 404를 사용하지 않기도 함
})

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행')
})