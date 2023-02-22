const express = require("express");
const path = require('path');

const app = express();

// 설정
app.set('port', process.env.PORT || 3000);

// 라우터, 범위가 넓은 와일드카드 등은 아래로 가도록 작성
app.get('/', (req, res) => { // router
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/category', (req, res) => {
  const template = `<div style="display: flex; flex-direction: column;"><a href="/category/a">to /category/a</a><a href="/category/b">to /category/b</a><a href="/category/c">to /category/c</a></div>`;
  res.send(template);
})

app.get('/category/a', (req, res) => { // 위에서부터 아래로 실행되기 때문에 결과물은 위 라우터가 실행, wildcard가 아래에 가도록 작성
  const template = `<a href="/category">to /category</a><p>now /category/a</p>`;
  res.send(template);
})

app.get('/category/:name', (req, res) => { // wildcard (정확히는 route parameter)
  const template = `<a href="/category">to /category</a><p>now /category/${req.params.name} with wildcard</p>`;
  res.send(template);
})

app.get('/category/b', (req, res) => { // Not working
  const template = `<a href="/category">to /category</a><p>now /category/b</p>`;
  res.send(template);
})

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행')
})