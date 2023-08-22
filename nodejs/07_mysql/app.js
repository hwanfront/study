const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const passport = require('passport');

const { sequelize } = require('./models');
const passportConfig = require('./passport');
const router = require('./routes');
const userRouter = require('./routes/users')

require('dotenv').config();

const app = express();
app.set('port', process.env.PORT || 3001);
sequelize.sync({ force: false })
  .then(() => {
    console.log('DB 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

passportConfig();

const prod = process.env.NODE_ENV === "production";

if(prod) {
  app.enable("trust proxy");
  app.use(morgan("combined"));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(hpp());
} else {
  app.use(morgan("dev"));
  app.use(cors({
    origin: true,
    credentials: true,
    webSocket: true,
  }))
}

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
  }
}
if(prod) {
  sessionOption.cookie.secure = true;
  sessionOption.cookie.proxy = true;
}
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

// router
app.use('/', router);
app.use('/api/user', userRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => { // 에러 처리 middleware는 반드시 next를 추가 
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
