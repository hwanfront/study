# DELIMITER
문장을 구분하기 어려운 경우 세미콜론을 `;` 가 아닌 다른 문자로 대체하기 위해 사용합니다.
```sql
DELIMETER //
BEGIN
...
END;
END //
DELIMITER ;
```
# Stored Procedure
DBMS 에서 제공하는 프로그래밍 기능으로 여러 쿼리문들을 일괄적으로 처리할 때 사용합니다. 
## 특징
- SQL Server의 성능 향상 (자주 쓰는 쿼리의 경우 일반 쿼리를 여러 개 날리는 것보다 효과적임)
- 유지보수 및 재활용
- 보안 강화
- 네트워크 부하를 줄일 수 있음
- 첫번째 수행 시 최적화가 이루어져 인덱스의 사용 여부가 결정됨
- 이후에 많은 양의 데이터를 가져오도록 파라미터가 들어간다면 오히려 성능에 문제가 생김
```sql
DELIMITER // 
CREATE PROCEDURE increaseMinSalary(money INT, rid INT)
BEGIN
  START TRANSACTION;
  UPDATE test.role SET min_salary = money WHERE id = rid;
  UPDATE test.employee SET salary = money WHERE role_id = rid AND salary < money;
  COMMIT;
END //
DELIMITER ;

CALL increasedMinSalary(500, 1);
```
