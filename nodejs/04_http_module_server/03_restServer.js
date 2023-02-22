const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const users = {}; // 데이터 저장용

const GET = async ({ url }, res) => {
  if(url === '/') {
    const data = await fs.readFile(path.join(__dirname, '03_restFront.html'));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(data);
  }

  if(url === '/about') {
    const data = await fs.readFile(path.join(__dirname, '03_restFront.html'));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(data);
  }


  if (url === '/users') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify(users));
  }

  try {
    const data = await fs.readFile(path.join(__dirname, url));
    return res.end(data);
  } catch (err) {
  }
}

const POST = (req, res) => {
  if (req.url === '/user') {
    let body = '';
    // 요청의 body를 stream 형식으로 받음
    req.on('data', (data) => {
      body += data;
    });
    // 요청의 body를 다 받은 후 실행됨
    return req.on('end', () => {
      console.log('POST 본문(Body):', body);
      const { name } = JSON.parse(body);
      const id = Date.now();
      users[id] = name;
      res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('등록 성공');
    });
  }
}

const PUT = (req, res) => {
  if (req.url.startsWith('/user/')) {
    const key = req.url.split('/')[2];
    let body = '';
    req.on('data', (data) => {
      body += data;
    });
    return req.on('end', () => {
      console.log('PUT 본문(Body):', body);
      users[key] = JSON.parse(body).name;
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end(JSON.stringify(users));
    });
  }
}

const DELETE = ({ url }, res) => {
  if (url.startsWith('/user/')) {
    const key = url.split('/')[2];
    delete users[key];
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end(JSON.stringify(users));
  }
}

const NotFound = (res) => {
  res.writeHead(404);
  return res.end('NOT FOUND');
}

const router = (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      GET(req, res);
      break;
    case 'POST':
      POST(req, res);
      break;
    case 'PUT':
      PUT(req, res);
      break;
    case 'DELETE':
      DELETE(req, res);
      break;
    default:
      NotFound(res);
      break;
  }
}


http.createServer(async (req, res) => {
  try {
    router(req, res);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });