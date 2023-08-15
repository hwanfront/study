# VIEW
기존의 테이블에서 가상의 테이블을 만들어냅니다. 데이터를 보여주기만을 위한 테이블입니다. 기존 테이블이 업데이트 되면 VIEW 또한 업데이트됩니다. 모든 컬럼과 레코드를 가져와서 작성하면 INSERT, UPDATE, DELETE 기능이 적용되기는 합니다.
```sql
-- view 생성
CREATE VIEW test.rm_view
AS SELECT ...
-- view 생성 또는 수정
CREATE OR REPLACE VIEW test.rm_view
AS SELECT test_id, tr.role_id, test_a, test_b, created_at, role, value FROM test.test_main tm LEFT JOIN test.test_role tr ON tm.role_id = tr.role_id;
```
## 성능
성능상 이슈는 보통 view를 잘 못 알고 쓰는 경우에 발생합니다. view는 쿼리일 뿐이므로 where 조건을 주는 경우 인덱스를 고려하지 않거나 view를 생성할 때 where 조건을 넣어 아예 인덱스를 활용할 수 없도록 만드는 경우 indexing을 사용할 수 없기 때문에 성능이 떨어진다고 생각할 수 있습니다. 