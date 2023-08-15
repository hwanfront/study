# DML
## INSERT
```sql
INSERT INTO `test`.`test_role` (`role`, `value`) VALUES ('a', '100');
INSERT INTO `test`.`test_role` (`role`, `value`) VALUES ('b', '200'), ('c', '300');
```
## UPDATE
```sql
UPDATE `test`.`test_main` SET `test_b` = 'bbb' WHERE (`test_id` = '1');
UPDATE `test`.`test_main` SET `test_a` = 'abb', `test_b` = 'cccc' WHERE (`test_id` = '3');
```
## DELETE
```sql
DELETE FROM `test`.`test_main` WHERE (`test_id` = '2');
```
# DQL
## SELECT
```sql
SELECT * FROM `test`.`test_role`;
-- projection
SELECT `role_id`,`created_at` FROM test.test_main;
```
```sql
-- 정렬 ORDER BY
SELECT `role_id`,`created_at` FROM test.test_main ORDER BY `role_id` DESC, `test_id` DESC;
```
```sql
-- 조건
SELECT * FROM `test`.`test_role` WHERE role_id >= 3;
SELECT * FROM `test`.`test_role` WHERE role_a IS null;
SELECT * FROM `test`.`test_role` WHERE role_a IS NOT null;
SELECT * FROM `test`.`test_role` WHERE role_id > 5 AND (created_at BETWEEN '2023-04-25' AND '2023-05-25');
```
```sql
-- limit개 씩 제한, 시작은 offset부터
-- 게시글 페이지의 간단 구현에서 사용 but 페이지가 높아질수록 성능이 좋지않고, 새로운 데이터가 들어오거나 hard delete 시  혼란을 주기 쉬움
-- 커서 방식으로 극복
SELECT * FROM `test`.`test_role` WHERE role_id != 1 LIMIT 2 OFFSET 2;
SELECT * FROM `test`.`test_role` WHERE role_id != 1 AND test_id < 8 LIMIT 2;
```
```sql
SELECT COUNT(*) FROM `test`.`test_role`;
SELECT SUM(`value`) FROM `test`.`test_role`;
SELECT AVG(`value`) FROM `test`.`test_role`;
SELECT MIN(`value`) FROM `test`.`test_role`;
SELECT MAX(`value`) FROM `test`.`test_role`;
SELECT COUNT(*) AS '총 개수' FROM `test`.`test_role`;
SELECT AVG(role_id), SUM(role_id) FROM `test`.`test_role`;
```
```sql
SELECT COUNT(*) as `개수`, role_id FROM test.test_main GROUP BY role_id;
SELECT MIN(test_id) as `최초`, role_id FROM test.test_main GROUP BY role_id;
SELECT AVG(test_id), role_id FROM test.test_main GROUP BY role_id HAVING role_id != 1;
```
```sql
-- INNER JOIN => join으로 엮인 부분에서 연결된 데이터가 없어도 null 이 안나옴
SELECT * FROM test.test_main JOIN test.test_role ON test.test_main.role_id = test.test_role.role_id;
-- OUTER JOIN => join으로 엮인 부분에서 연결된 데이터가 없으면 null 이 나옴
-- LEFT OUTER JOIN
SELECT * FROM test.test_main m LEFT JOIN test.test_role r ON m.role_id = r.role_id;
SELECT * FROM (test.test_main m LEFT JOIN test.test_role r ON m.role_id = r.role_id) LEFT JOIN test.test_sub s ON m.sub_id = s.sub_id;
-- RIGHT OUTER JOIN
SELECT * FROM test.test_main m right JOIN test.test_role r ON m.role_id = r.role_id;
-- FULL OUTER JOIN => LEFT + RIGHT
(SELECT * FROM test.test_main m LEFT JOIN test.test_role r ON m.role_id = r.role_id)
UNION
(SELECT * FROM test.test_main m right JOIN test.test_role r ON m.role_id = r.role_id)
-- JOIN, CROSS JOIN => CARTESIAN JOIN
SELECT * FROM test.test_main JOIN test.test_role;
SELECT * FROM test.test_main, test.test_role;
```
```sql
-- 별명
SELECT m.test_id, m.test_a as 'm_test_a', m.test_b, r.role_id, r.test_a as 'r_test_a', from test.test_main m JOIN test.test_role r ON m.role_id = r.role_id;
```

> https://www.tutorialspoint.com/sql/index.htm