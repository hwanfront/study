const express = require("express");
const path = require('path');

const app = express();

// 설정
app.set('port', process.env.PORT || 3000);

// 라우터
app.get('/', (req, res, next) => { 
  res.sendFile(path.join(__dirname, 'test.html'));
  next();
}, (req, res, next) => { 
  console.log('실행2');
  next();
})

app.get('/', (req, res) => { // 실행
  console.log('실행1');
})

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행')
})
