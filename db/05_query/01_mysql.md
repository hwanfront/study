```
실행
> mysql.server start
접속
> mysql -u root -p
종료
> mysql.server stop
```
## charset
### utf8mb4
에서 mb4는 이모지와 같은 문자를 사용할 수 있음을 의미합니다.
## engine
### InnoDB
`트랜잭션` 처리가 필요하며 대용량의 데이터를 다루는 부분에서 효율적입니다. 테이블과 인덱스를 테이블 스페이스에 저장합니다. `row level locking`이 지원되어 사용자의 CRUD가 많은 서비스에 유리합니다.
### MyISAM
트랜잭션 처리가 필요없고 readonly 기능이 많은 부분에서 효율적입니다. 테이블과 인덱스를 각각 분리된 파일로 관리합니다. row level locking을 지원하지 않아 CRUD 시 해당 테이블에 locking이 걸립니다. 자연 언어를 이용해 검색할 수 있는 `풀텍스트 인덱스`를 지원합니다.
> InnoDB 와 MyISAM 테이블을 같이 사용할 경우 조인에 주의해야 합니다.
## 테이블 생성
### Datatype
한 컬럼에는 같은 타입의 데이터가 들어가야 합니다
- `INT` 정수
  - `FLOAT` `DOUBLE` 실수
- `VARCHAR` 문자열
- `DATETIME` 날짜와 시간
- `DATE` 날짜만
- `DECIMAL` `NUMERIC` 고정 소수점 타입
- `FLOAT` 부동 소수점 타입
- `TINYINT` default는 -128~127
- `CHAR` 문자 n개 고정
- `JSON` 
- `TEXT` 길이가 긴 것들 
- `BOOLEAN` 숫자 0, 1
### 설정
- `PK` Primary key
- `NN` NotNull
- `UQ` Unique
- `Binary` 0101... 데이터 형식인지 여부
- `Unsigned` 데이터 유형에서 음수 범위를 제외하고 0부터, 총 길이는 그대로(양수값 두 배)
- `Zerofill` 길이를 무조건 0으로 맞출 때
- `Auto Increment` 자동으로 데이터를 채워주는 (id가 1 2 3 4 5...)
- `Generated` 다른 컬럼에 의존하는 컬럼
- `Default/Expression` 값을 넣지 않았을 때 기본으로 채워주는 값
  - `CURRENT_TIMESPAMP` `NOW()` 현재 시간이 들어가게 됌
- `comment` 설명
### foreign key
- 미리 컬럼을 만들어두어야 함
- `on update` `on delete` 수정 또는 삭제 
  - `RESTRICT` `NO ACTION` 자식이 외래키로 참조하는 경우에 바꿀 수 없음 => 바꾸면 에러 발생
  - `CASCADE` 자식이 외래키로 참조하는 경우 같이 바꾸고 싶은 경우
  - `SET NULL` 자식이 참조하는 경우 바꾸는 경우 NULL로 변경
- `CONSTRAINT` 제약조건
### ERD 그리는 법
- Database - Reverse Engineer
- SHOW CREATE TABLE `table`.`column`