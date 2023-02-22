const http = require('http');

const server = http.createServer((req, res) => {
  res.write('<h1>title</h1>');
  res.write('<p>write1</p>');
  res.end('<p>write2</p>')
}).listen(8080)

server.on('listening', () => {
  console.log('서버 실행');
})

server.on('error', (error) => {
  console.error(error);
})