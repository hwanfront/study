# transaction 트랜잭션
[트랜잭션](../02_dbms/01_dbms.md#트랜잭션)은 데이터베이스의 상태를 변화시키기 위해 수행하는 작업의 논리적 단위입니다. 여러 테이블을 동시에 수정하는 등 여러 쿼리문을 수행할 때, 부분만 실패하는 경우 ROLLBACK 하거나 성공하면 COMMIT 합니다. MySQL에서는 InnoDB가 트랜젝션이 존재합니다.
```sql
USE test;
UPDATE test_role SET role = 'b1' WHERE role_id = 2; -- 성공
UPDATE test_role SET role = 'e1' WHREE role_id = 3; -- 실패
UPDATE test_role SET role = 'c1' WHERE role_id = 4; -- 실행되지 않음
```
```sql
START TRANSACTION;
USE test;
UPDATE test_role SET role = 'b' WHERE role_id = 2; -- 성공
UPDATE test_role SET role = 'e1' WHREE role_id = 3; -- 실패
UPDATE test_role SET role = 'c1' WHERE role_id = 4;

COMMIT; -- 성공
ROLLBACK; -- 초기화
```
## Isolation Level 격리 수준
[Isolation](../02_dbms/01_dbms.md#고립성-isolation)
- `READ Uncommitted`
- `READ Committed`
- `Repeatable READ` (InnoDB가 격리수준으로 사용)
- `Serializable` (phantom read 문제를 극복하기 위한 방법, InnoDB에서는 발생하지 않음)
### READ Uncommitted
- 커밋되지 않은 값을 읽은 경우에 커밋된 결과값을 불러오기 때문에 dirty read 가 발생합니다. 
```sql
1. START TRANSACTION;
1. SELECT v FROM item WHERE id = 1; -- > 5000
1. UPDATE item WHERE id = 1 SET v = v - 3000; -- > 2000
2. START TRANSACTION;
2. SELECT v FROM item WHERE id = 1; -- > 2000 (dirty read)
1. ROLLBACK; -- > 5000
2. UPDATE item WHERE id = 1 SET v = v - 3000; -- > ERROR
2. COMMIT;
```
### READ Committed
- 커밋되지 전까지 결과값 변동이 없지만 커밋된 이후에 값이 달라지는 non-repeatable read 가 발생합니다.
```sql
1. START TRANSACTION;
1. SELECT v FROM item WHERE id = 1; -- > 5000
1. UPDATE item WHERE id = 1 SET v = v - 3000; -- > 2000
2. START TRANSACTION;
2. SELECT v FROM item WHERE id = 1; -- > 5000
1. COMMIT; -- > 2000
2. SELECT v FROM item WHERE id = 1; -- > 2000 (non-repeatable read)
```
### Repeatable READ
- COMMIT 전에 컬럼에 접근하지 못하도록 Lock을 걸어 보호합니다.
```sql
1. START TRANSACTION;
1. SELECT v FROM item WHERE id = 1; -- > 5000
1. UPDATE item WHERE id = 1 SET v = v - 3000; -- > 2000
2. START TRANSACTION;
2. SELECT v FROM item WHERE id = 1; -- > (여기서 실행되지 않게 막음)
1. COMMIT; -- > 2000
2. SELECT v FROM item WHERE id = 1; -- > 2000
```
```sql
1. START TRANSACTION;
1. SELECT v FROM item WHERE id = 1; -- > 5000
1. UPDATE item WHERE id = 1 SET v = v - 3000; -- > 2000
2. START TRANSACTION;
1. COMMIT; -- > 2000
2. SELECT v FROM item WHERE id = 1; -- > 2000 (여기서 실행)
2. SELECT v FROM item WHERE id = 1; -- > 2000
```