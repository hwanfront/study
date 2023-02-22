## morgan
- 클라이언트에서 어떤 요청이 왔는지 응답에 대한 로그를 서버에 기록
- morgan(`format`, `option`)
- `format`
  - morgan('dev'): 개봘환경
  - morgan('combined'): 배포환경
  - 외 common, short, tiny
- `option`
  - morgan(`format`, { immediate: ... }): response 대신 request 에 따라 로그 작성, response 데이터를 기록할 수 없는 경우가 생기기 떄문
  - morgan(`format`, { skip: ... }): 로킹의 스킵여부 결정
  - morgan(`format`, { stream: ... }): 로그 작성을 위한 output stream 옵션, 기본은 process.stdout

## cookie-parser
- 4장 cookie 사용한 부분의 
```js
const parseCookies = (cookie = '') => 
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const { query } = url.parse(req.url);
  const { name } = qs.parse(query);
  const expires = new Date();

  expires.setMinutes(expires.getMinutes() + 5);
  res.writeHead(302, {
    location: '/',
    'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
  })
}
```
## body-parser
- 요즘은 사용하지 않음 