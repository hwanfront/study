# NoSQL
관계형 DB가 아닌 DB를 의미합니다. 관계형 DB에 존재하는 1:1, 1:N, N:M 관계 등이 없습니다. 관계형 DB에서는 [제 1정규화](../04_normalization/02_normalization.md#1nf) 과정에서 원자값이 아닌 컬럼을 원자값으로 나누는데 이를 불러오기 위해서는 JOIN을 해야했지만, NoSQL에서는 제 1정규화 과정을 거친 형태가 아닌 배열 형태로 저장이 가능합니다. 얼핏보기에 편해보이지만 대규모 서비스로 갔을 때 중복된 데이터가 발생하는 등 공간낭비가 발생하고, 데이터 삽입, 수정, 삭제에 이상이 생깁니다. 
## REDIS
NoSQL이자 MemoryDB 또는 자료구조DB라고 불립니다. 배열, SET, Hash 등 저장할 수 있습니다. HDD에 비해 속도가 훨씬 빠른데 용량이 작은 RAM을 사용합니다. 필수적인, 빈번하게 조회하는 것만 저장해둡니다. 바뀌지 않는 데이터를 자주 SELECT 한다면 사용하면 DB에 부하도 줄어들고 빠릅니다. [Backup](./09_replication_sharding.md#backup)과 비슷하게 DB 데이터가 변경됐지만 Redis에는 적용이 되지 않아 시차가 발생할 수 있습니다.
```bash
서버 -SQL-> DB (SSD/HDD)

서버 -> Redis (Cache/RAM) -> 없으면 DB
```