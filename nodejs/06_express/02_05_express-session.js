const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'abcdefghpassword',
  cookie: {
    httpOnly: true,
  },
  name: 'connect.sid', // 기본값
}));

app.get('/', (req, res) => {
  req.session.name = 'test';
  res.send(`세션id: ${req.sessionID}`);
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