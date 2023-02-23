const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './test.html'));
})

app.get('/category', (req, res) => {
  const template = `<div style="display: flex; flex-direction: column;"><a href="/category/a">to /category/a</a><a href="/category/b">to /category/b</a><a href="/category/c">to /category/c</a></div>`;
  res.send(template);
})

app.get('/category/:name', (req, res) => {
  const template = `<a href="/category">to /category</a><p>now /category/${req.params.name} with wildcard</p>`;
  res.send(template);
})

app.use((req, res, next) => {
  res.status(404).send('404 에러');
})

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행')
})