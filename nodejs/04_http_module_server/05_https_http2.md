# https
- 웹 서버에 SSL 암호화를 추가하는 모듈
- 오고가는 데이터를 암호화해서 중간에 다른 사람이 요청을 가로채도 내용 확인 불가
- 요청을 보낼 떄 헤더나 바디에 중요한 정보가 들어가 있어 탈취되면 정보들을 다 받아낼 수 있는거임
- 인증서를 인증 기관에서 얻어와야 함
- 포트는 443, 생략 가능

# http2
- https도 적용한거임
- SSL 암호화와 최신 HTTP 프로토콜인 http/2를 사용한 모듈
- 요청 및 응답 방식이 http/1.1보다 개선됨 
  - http/1.1: baseline, http/2: multiplexing
  - (https://stackoverflow.com/questions/36517829/what-does-multiplexing-mean-in-http-2)[what-does-multiplexing-mean-in-http-2]
- 웹 속도도 개선

### readFileSync를 사용해도 되는 경우
- 딱 한번만 실행하거나 서버를 초기화할 때