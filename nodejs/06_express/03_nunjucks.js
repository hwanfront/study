const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

nunjucks.configure('views_nunjucks', {
  express: app,
  watch: true
})

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

app.get('/', (req, res) => {
  res.render('index', { title: '테스트' });
})

app.use((req, res, next) => {
  res.status(404).send('404 not found');
})

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send(error.message);
})

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행');
})
