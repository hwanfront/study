const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(cookieParser('abcdefghpassword'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'abcdefghpassword',
  cookie: {
    httpOnly: true, // JS 공격을 예방하기 위해 
  },
  name: 'connect.sid', // 기본값
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.session.id = '아이디';
  req.session.data = '데이터1';
  req.data = '데이터2';
  return next();
})

app.get('/', (req, res) => {
  req.session.data; // => '데이터1', 영구적으로 남는 데이터가 됌
  req.data; // => '데이터2', 일회성으로 저장하고 싶을 때
  res.send(`영구적 데이터 req.session.data ${req.session.data} / 일회성 데이터 req.data ${req.data}`);
})

app.post('/', (req, res) => {
  res.send('hello');
})

app.use((req, res, next) => {
  res.status(404).send('404 에러');
})

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행')
})