const express = require('express');
const path = require('path');

const app = express();

const users = {}; // 데이터 저장용

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
  res.send(JSON.stringify(users));
})

app.post('/user', (req, res) =>{
  const { name } = req.body;
  const id = Date.now();
  users[id] = name;
  res.send('등록 성공');
})

app.put('/user/:key', (req, res) => {
  const { key } = req.params;
  const { name } = req.body;
  users[key] = name;
  res.send(JSON.stringify(users));
})

app.delete('/user/:key', (req, res) => {
  const { key } = req.params;
  delete users[key];
  res.send(JSON.stringify(users));
})

app.use((req, res, next) => {
  res.redirect('02_04_restFront.html');
})

app.listen(app.get('port'), () => {
  console.log('3000 서버 실행')
})