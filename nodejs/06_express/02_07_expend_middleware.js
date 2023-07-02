const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cookieParser('abcdefghpassword'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'abcdefghpassword',
  cookie: {
    httpOnly: true,
  },
  name: 'connect.sid',
}));

app.use('/', (req, res, next) => { // 조건에 따라 미들웨어의 실행, 미들웨어 확장 (미들웨어 안에 미들웨어를 넣는 형태)
  if (req.session.id) {
    express.static(path.join(__dirname, '/public'))(req, res, next);
  } else {
    next();
  }
}); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.session.id = '아이디';
  req.session.data = '데이터1';
  req.data = '데이터2';
  return next();
})

app.get('/', (req, res) => {
  res.redirect('02_07_test.html');
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