# Database
## 데이터베이스를 배워야 하는 이유
- 프론트엔드 개발자 또한 반드시 배워야 하는 이유는 보통 회사에서 가장 중요하게 생각하는 것은 바로 `데이터`
- 데이터가 저장되고 관리되는 기본은 `데이터베이스`
- 서버 성능, 데이터베이스의 성능에 무지하면 말도 안되는 요청을 하는 실수를 저지를 수도 있답니다.
## 표준 SQL 문
postgreSQL, MSSQL, Oracle, MariaDB, SQLite 등 각각 다른 문법을 가지고 있습니다. 서로 다른 문법을 가지고 있으므로, 내가 작성한 쿼리문이 다른 SQL에서는 읽을 수 없는 경우가 생깁니다. 따라서 하나의 기준을 세울 필요가 있습니다.
### ANSI SQL
- 각각 다른 SQL가 사용되어 이를 `표준화` 하기 위한 표준 SQL 문으로 정립한 게 `ANSI SQL` 입니다.
- `ANSI SQL`은 표준 SQL문이기 때문에 DBMS의 종류에 제약을 받지 않습니다.
- 테이블 간 `join` 관계가 `FROM` 에서 명시되기 떄문에 `WHERE` 문에서 조건만 확인하면 되므로 가독성이 좋습니다.
### cheat sheet
- [cheat sheet](https://cheatography.com/tag/database/)
## 추가
- 4~6정규화
- 역정규화 하는 케이스
- foreign key 사용하는 경우
- foreign key 제약조건
- sql query create select insert delete
- sql query min avg max sum 등
- 자료형 int float 등
- explain 사용법
- 서브쿼리 잘 쓰기
- transaction lock 종류와 성능, 기능 특징 등
- stored procedure 성능 문제 등
- no sql
- replication, sharding