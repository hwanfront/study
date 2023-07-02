const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

dotenv.config(); // process.env를 사용하는 패키지보다는 위로 올라가야 함
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser('abcdefghpassword')); // => 비밀 키를 숨기고 중요하게 관리하기 위해 방법이 필요함
app.use(cookieParser(process.env.COOKIE_SECRET)); 
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  // secret: 'abcdefghpassword', // => 비밀 키를 숨기고 중요하게 관리하기 위해 방법이 필요함
  cookie: {
    httpOnly: true,
  },
  name: 'connect.sid',
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('test');
})

app.use((req, res, next) => {
  res.status(404).send('404 에러');
})

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행')
})
