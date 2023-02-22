# REST API
- 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법
- 서버에 요청을 보낼 때는 주소를 통해 요청의 내용을 표현
## HTTP 요청 메서드
- GET: 서버의 자원을 가져옴
- POST: 서버에 자원을 새로 등록함 (뭘 써야할지 애매할 때에도 사용)
- PUT: 서버의 자원을 전체 치환
- PATCH: 서버의 자원을 일부 수정
- DELETE: 서버의 자원을 삭제
## HTTP 프로토콜
- ios, 안드로이드, 웹 모두 같은 주소로 요청을 보낼 수 있음
- 서버와 클라이언트 분리
## RESTful
- REST API를 사용한 주소 체계를 이용하는 서버
## header
- 데이터들에 대한 데이터
- 요청 및 응답에 대한 헤더가 추가됨
- 기본으로 추가되는 헤더도 있고 직접 추가해줄 수도 있음
## HTTP status code
- 200: OK 성공
- 201: Created 성공, 리소스 생성됨
- 302: Redirection 다시 돌려보냄
- 400: Bad Request 잘못된 문법으로 이해할 수 없다
- 401: Unauthorized 누군지 몰라, 인증이 없어 권한이 없다
- 403: Forbidden 누군지 알지만 권한이 없어 금지되어 있음
- 404: Not Found 요청에 대한 리소스를 찾을 수 없음
- 500: Internal Server Error 요청 처리하다 서버 고장
- 503: Service Unavaliable 요청 처리하다 서버 고장