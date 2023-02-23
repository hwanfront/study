const express = require("express");
const path = require('path');

const app = express();

// 설정
app.set('port', process.env.PORT || 3000);

// 라우터
app.get('/', (req, res) => { // router
  res.sendFile(path.join(__dirname, 'test.html'));
})

app.post('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
})

app.get('/about', (req, res) => {
  res.send('about');
})

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행')
})
