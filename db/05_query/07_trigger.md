# trigger
백업이나 `updated_at` 컬럼과 같이 어떤 동작을 수행했을 때 자동으로 수행해야 하는 또 다른 동작이 있는 경우 트리거를 추가합니다.
```sql
-- 트리거 삭제
DROP TRIGGER updateMain;
-- 트리거 생성 
--- 업데이트 시 updated_at 갱신
DELIMITER //
CREATE TRIGGER updateMain BEFORE UPDATE ON test.test_main
FOR EACH ROW
BEGIN
	SET NEW.created_at = CURRENT_TIMESTAMP;
END //
DELIMITER ;
--- 최저연봉 갱신 시 자동으로 직원 연봉 갱신
DELIMITER //
CREATE TRIGGER updateSalaryWhenMinSalaryChange AFTER UPDATE ON test.test_role
FOR EACH ROW
BEGIN
	UPDATE test.test_employee SET NEW.created_at = CURRENT_TIMESTAMP WHERE role_id = NEW.employee_id AND salary < NEW.min_salary;
END //
DELIMITER ;
-- 트리거 조회
SHOW TRIGGERS;
```