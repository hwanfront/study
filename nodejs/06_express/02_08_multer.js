const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('abcdefghpassword'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'abcdefghpassword',
  cookie: {
    httpOnly: true, // 공격을 예방하기 위해 
  },
  name: 'connect.sid', // 기본값
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const multer = require('multer');
const fs = require('fs');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error(`uploads 폴더가 없어 폴더를 생성합니다.`);
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb
})

app.use('/public', express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '02_08_multipart.html'));
})

// app.use(upload.single('image')) // => 특정 라우터만 적용해주기 위해 따로 빼지않음

app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  console.log(req.body.title);
  res.send('ok');
})

app.post('/uploads/array', upload.array('images'), (req, res) => {
  console.log(req.files);
  res.send('ok');
})

app.post('/uploads/fields', upload.fields([{name: 'image1'}, {name: 'image2'}]), (req, res) => {
  console.log(req.files);
  res.send('ok');
})

app.use((req, res, next) => {
  res.status(404).send('404 에러');
})

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행')
})
