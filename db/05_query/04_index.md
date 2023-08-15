# INDEX
검색 또는 정렬 시 성능을 높여주기 위해 사용합니다. DB는 순차적으로 데이터에 접근하는데 INDEX 기술을 사용하면 순차적으로 접근하지 않고 테이블 컬럼을 INDEXING 하여 검색속도를 높힙니다. INDEX를 사용하는 컬럼에 데이터가 많아질수록 용량이 커집니다. UNIQUE 컬럼에서 새로운 값을 넣을 때마다 기존 값과 겹치는지 확인해야 합니다. 
```sql
-- 성능 확인
-- 1순위 조건은 반드시 where 절에 넣어야 index를 사용합니다.
EXPLAIN SELECT * FROM test.test_main;
EXPLAIN SELECT * FROM test.test_role WHERE test_a = 'a';
-- INDEX 생성
ALTER TABLE `test`.`test_role`
ADD INDEX `a_b_c` (`role_a` ASC, `role_b` ASC, `role_c` ASC) VISIBLE;
-- INDEX 삭제
ALTER TABLE `test`.`test_role`
DROP INDEX `a_b_c`;
```
- `type ALL` 전체를 확인했다는 의미
- `type const` `key primary` 기본키를 index로 확인해 찾았다는 의미
- `type const` `key test_role_unique` test_role이라는 unique 속성을 가진 컬럼에서 index를 확인해 찾았다는 의미