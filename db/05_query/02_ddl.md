# DDL
## CREATE
- DB 객체, 테이블, 뷰, 인덱스 등 생성
- `ON REPLACE` 뷰를 교체하는 명령입니다.
- `UNIQUE` 중복 데이터가 들어갈 수 없습니다.
```sql
CREATE DATABASE `데이터베이스`;
CREATE TABLE `스키마`.`테이블`{ 컬럼 데이터타입 제약조건 };
CREATE [OR REPLACE] VIEW `뷰` AS SELECT ... FROM ... 
CREATE [UNIQUE] INDEX `인덱스` ON `테이블`([컬럼1] [기준], [컬럼2])
```
```sql
CREATE TABLE `test`.`test_main` (
  `test_id` INT NOT NULL AUTO_INCREMENT,
  `role_id` INT UNSIGNED NULL,
  `test_a` VARCHAR(45) NOT NULL,
  `test_b` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`test_id`),
  UNIQUE INDEX `test_b_UNIQUE` (`test_b` ASC) VISIBLE,
  INDEX `main_role_fk_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `main_role_fk`
    FOREIGN KEY (`role_id`)
    REFERENCES `test`.`test_role` (`role_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);
```
## ALTER
DB 객체 변경
```sql
ALTER TABLE `테이블` ADD 컬럼 데이터타입 [제약조건];
ALTER TABLE `테이블` MODIFY 컬럼 데이터타입 [제약조건];
ALTER TABLE `테이블` CHANGE 컬럼 컬럼이름 데이터타입 [제약조건];
ALTER TABLE `테이블` RENAME 테이블이름;
ALTER TABLE `테이블` DROP 컬럼;
ALTER [UNIQUE] INDEX `인덱스` ON `테이블`([컬럼1] [기준], [컬럼2])
```
## TRUNCATE
테이블 내 데이터 삭제
```sql
TRUNCATE TABLE `테이블`;
```
## DROP
데이터베이스 또는 테이블 삭제
```sql
DROP DATABASE `데이터베이스`;
DROP TABLE `테이블`;
DROP VIEW `뷰`;
DROP INDEX `인덱스`
```
## SHOW
데이터베이스 또는 테이블목록 조회
```sql
SHOW DATABASES;
SHOW TABLES;
```
```sql
SHOW CREATE TABLE test.test_main;

CREATE TABLE `test_main` (
  `test_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int unsigned DEFAULT NULL,
  `test_a` varchar(45) NOT NULL,
  `test_b` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`test_id`),
  UNIQUE KEY `test_b_UNIQUE` (`test_b`),
  KEY `main_role_fk_idx` (`role_id`),
  CONSTRAINT `main_role_fk` FOREIGN KEY (`role_id`) REFERENCES `test_role` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```
## USE
특정 데이터베이스 사용
```sql
USE 데이터베이스 이름;
```
## 외래키 삭제
```sql
ALTER TABLE `test`.`test_main` 
DROP FOREIGN KEY `main_role_fk`;
ALTER TABLE `test`.`test_main` 
DROP INDEX `main_role_fk_idx` ;
```
## 외래키 수정
바로 수정할 수 없고 foreign key를 없앤 후 다시 생성
```sql
ALTER TABLE `test`.`test_main` 
DROP FOREIGN KEY `main_role_fk`;
ALTER TABLE `test`.`test_main` 
ADD CONSTRAINT `main_role_fkey`
  FOREIGN KEY (`role_id`)
  REFERENCES `test`.`test_role` (`role_id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;
```