const express = require('express');
const morgan = require('morgan');

const connect = require('./schemas');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const commentRouter = require('./routes/comments');

require('dotenv').config();

const app = express();
app.set('port', process.env.PORT || 3002);
connect();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/comments', commentRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
