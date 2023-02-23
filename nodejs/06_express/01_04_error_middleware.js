const express = require("express");
const path = require('path');

const app = express();

// 설정
app.set('port', process.env.PORT || 3000);

// 공통 미들웨어
app.use((req, res, next) => {
  try {
    console.log(undefinedVariable); // 에러 발생
  } catch (error) {
    next(error); // 에러 middleware로 
  }
})

// 라우터
app.get('/', (req, res) => { // router
  res.sendFile(path.join(__dirname, 'test.html'));
})

// 에러 미들웨어
app.use((req, res, next) => { // 주의) 파라미터가 올바르지 않으면 실행 x
  res.status(200).send('에러 실행 안됌'); 
})

app.use((err, req, res, next) => { // 실행 o
  console.error(err);
  res.status(200).send('에러 발생');
})

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행')
})