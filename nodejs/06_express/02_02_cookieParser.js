const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const url = require('url');
const qs = require('querystring');

const app = express();

const parseCookies = (cookie = '') => 
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

app.set('port', process.env.PORT || 3000);

app.use(cookieParser('abcdefghpassword'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  // const name = req.cookies['name'];
  if(cookies.name) {
    return res.send(`<p>${decodeURIComponent(cookies.name)}님 안녕</p><a href="/logout">logout</a>`);
  }
  res.sendFile(path.join(__dirname, './02_02_cookie.html'));
})

app.get('/login', (req, res) => {
  const { query } = url.parse(req.url);
  const { name } = qs.parse(query);
  const expires = new Date();

  expires.setMinutes(expires.getMinutes() + 5);

  res.cookie('name', encodeURIComponent(name), {
    expires,
    httpOnly: true,
    path: '/'
  })
  
  res.redirect('/');
})

app.get('/logout', (req, res, next) => {
  const name = req.cookies['name'];

  res.clearCookie('name', encodeURIComponent(name), {
    httpOnly: true,
    path: '/',
  })

  res.redirect('/');
})

app.use((req, res, next) => {
  res.status(404).send('404 에러');
})

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행')
})