# 관계 데이터 모델
## 테이블
데이터를 열과 행으로 나타낸 정보 모음입니다. `DBMS`로 구현되는 단계에서 테이블이라고 합니다.
|[학생]|학번|이름|학과|학년|
|---|---|---|---|---|
||1001|김하나|컴퓨터|1|
||1002|김두나|컴퓨터|2|
||1003|김세나|전기|3|
## 릴레이션 relation
데이터베이스에서 정보를 구분하여 저장하는 기본 단위로, 엔티티에 대한 데이터를 데이터베이스에 담아 관리합니다. 릴레이션은 다음과 같은 특징을 가집니다.
- `튜플의 유일성`
- `튜플의 무순서성`
- `속성의 무순서성`
- `속성 값이 원자값`
### 릴레이션 스키마 relation schema
릴레이션이 저장되는 데이터 구조나 제약 조건을 정의합니다. (ex. id, 이름, 학년 등)
### 릴레이션 인스턴스 relation instance
`스키마`에 실제로 저장된 데이터의 집합입니다. 
### 속성 attribute
테이블의 열을 의미하며 필드라고도 합니다.
#### 차수 degree
한 릴레이션에 들어가 있는 **속성의 수**입니다. (최소 1 이상)
### 튜플 tuple
테이블의 행을 의미하며 레코드라고도 합니다. 
```bash
1. 1001 김하나 컴퓨터
2. 1002 김두나 컴퓨터
3. 1003 김세나 전기
```
#### 카디널리티 cardinality
릴레이션 튜플의 개수를 의미합니다. (0을 가질 수 있음)
### 속성 값 attribute value
데이터의 가장 작은 논리적 단위를 의미합니다. ERD 에서는 더이상 분해할 수 없는 `원자 값 atomic value` 만을 허용합니다.
```bash
학번 김하나 1001 이름 등
```
### 도메인 domain
하나의 속성이 취할 수 있는 같은 타입의 모든 원자 값들의 집합을 의미합니다. 원자 값으로 된 도메인을 단순 도메인, 단순 도메인 여러 개를 결합하여 별개의 도메인을 정의하는 경우를 복합 도메인이라고 합니다.
```bash
학년 -> 1 2 3
학과 -> 컴퓨터 전기
```
## 릴레이션과 테이블의 차이점
같은 용어로 이야기하는 경우도 있지만 약간은 다릅니다. 모든 릴레이션은 테이블이지만, 모든 테이블이 릴레이션은 아닙니다. 
|[학생]|학번|이름|학과|과목|
|---|---|---|---|---|
||1001|김하나|컴퓨터|C++|
||1002|김두나|컴퓨터|C++|
||1002|김두나|컴퓨터|Java|

동일한 두 행을 가지고 있어도 테이블이지만 `튜플의 유일성` 을 만족하지 않아 릴레이션은 아닙니다.
|[학생]|학번|이름|학과|과목|
|---|---|---|---|---|
||1001|김하나|컴퓨터|C++|
||1002|김두나|컴퓨터|C++, Java|

속성 값이 원자값을 가지지 않아도 테이블이지만 `속성 값이 원자값` 을 만족하지 않아 릴레이션은 아닙니다.