# 키 key
키는 DB에서 조건을 만족하는 레코드를 찾거나 정렬할 때, 구분할 수 있는 기준이 되는 속성을 의미합니다
- `유일성`: 고유한 데이터 속성을 의미하며 하나의 키로 특정 행을 바로 찾아낼 수 있음을 의미합니다. 
- `최소성`: 키를 구성하는 속성들 중 꼭 필요한 최소한의 속성들로만 구성됨을 의미합니다.
## 수퍼키 super key
각 행을 유일하게 식별할 수 있는 **하나 이상**의 속성 집합입니다. `유일성`은 가지지만 최소성을 가지지 못합니다.
## 후보키 candidate key
각 행을 유일하게 식별할 수 있는 **최소한**의 속성 집합입니다. `유일성`과 `최소성`을 가집니다. 기본키가 될 수 있는 컬럼을 의미합니다. 수퍼키 중에서 최소성을 만족하는 키가 후보키입니다. 
### 수퍼키와 후보키 차이
|id|이름|취미|
|---|---|---|
|1|김하나|영화|
|2|김하나|쇼핑|
|3|김두나|게임|
- `id` `id + 이름` `id + 이름 + 취미` 는 수퍼키가 될 수 있습니다.
- `id` 는 후보키가 될 수 있지만 `id + 이름` `id + 이름 + 취미` 는 후보키가 될 수 없습니다.
## 기본키 primary key
- `후보키`들 중 하나를 선택한 키 입니다. (최소성과 유일성을 만족)
- 하나의 테이블에 `하나의 기본키만 존재`할 수 있습니다. 
- `null`을 가질 수 없습니다. 
- 각각의 튜플을 식별할 수 있는 `유일한 값`이어야 합니다.
## 대체키 alternate key
- `후보키` 중 하나가 기본키로 정해진다면 나머지는 대체키가 됩니다.
## 외래키 foreign key
- 다른 테이블의 데이터를 참조하여 관계를 연결한 키입니다.
- 참조된 column은 원래 테이블에서 `기본키`로 설정되어 있어야 합니다.
- 참조 될 테이블이 먼저 만들어지고 참조하는 테이블에 입력됩니다.
- 부모 테이블을 먼저 삭제할 수 없습니다. 자식 테이블을 먼저 삭제한 후 부모 테이블을 삭제해야 합니다.
## 복합키 composite key
- 두 개 이상 키를 묶어 하나의 기본키로 지정하는 것입니다.
- 기본키가 복합키라면 당연히 유일성과 최소성을 만족해야 합니다.
# 무결성 제약 integrity constraint
DB의 정확성과 일관성을 보장하기 위한 조건을 의미합니다. DB에 저장된 데이터의 무결성을 보장하고, 상태를 일관되게 유지합니다.
## 개체 무결성
기본 키에 속하는 속성은 null을 가질 수 없습니다.
## 참조 무결성
릴레이션은 참조할 수 없는 외래 키 값을 가질 수 없습니다. 최래키 값은 null 또는 참조하는 릴레이션의 기본키 값과 동일합니다.