# sequelize ORM
```bash
npm init
npm i express morgan nunjucks sequelize sequelize-cli mysql2
npm i -D nodemon

// sequelize 구조 생성
npx sequelize init
npx sequelize-cli init

// DB생성
npx sequelize db:create
```
## 관계
### 1:1 관계
```js
db.User.hasOne(db.UserInfo, { foreignKey: 'user_id', sourceKey: 'id' });
db.UserInfo.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
```
### 1:n 관계
```js
db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
```
### n:m 관계
```js
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
```
## 쿼리
### INSERT
```sql
INSERT INTO test.users (name, age, married) VALUES ('김하나', 26, 0);
```
```js
const { User } = require('../models');

User.create({{ 
  name: '김하나',
  age: 26,
  married: false,
}})
```
### SELECT
- [operators](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators)
```sql
SELECT * FROM test.user;
SELECT name, age FROM test.user;
SELECT name, age FROM test.user WHERE married = 0 AND age > 10;
SELECT name, age FROM test.user WHERE married = 1 OR age <= 15;
SELECT name, age FROM test.user ORDER BY age DESC;
SELECT name, age FROM test.user ORDER BY age DESC LIMIT 1 OFFSET 1;
```
```js
const { Op } = require('sequelize');
const { User } = require('../models');

User.findAll({});

User.findAll({
  attribute: ['name','age'],
})

User.findAll({
  attribute: ['name','age'],
  where: {
    married: 0,
    age: { [Op.gt]: 10 }
  }
})

User.findAll({
  attribute: ['name','age'],
  where: {
    [Op.or]: [{ married: 1 }, age: { [Op.lte]: 30 }];
  }
})

User.findAll({
  attribute: ['name','age'],
  order: [['age', 'DESC']],
})

User.findAll({
  attribute: ['name','age'],
  order: [['age', 'DESC']],
  limit: 1,
  offset: 1,
})
```
### UPDATE
```sql
UPDATE test.users SET age = 29 WHERE id = 1;
```
```js
const { User } = require('../models');

User.update({
  age: 29,
}, {
  where: { id: 1 },
})
```
### DELETE
```sql
DELETE FROM test.users WHERE id = 2;
DELETE FROM test.users WHERE id IN (2,3,5);
DELETE FROM test.users WHERE age != 30;
```
```js
const { User } = require('../models');

User.destroy({
  where: { id: 2 },
})

User.destroy({
  where: { id: [Op.in]: [2,3,5] },
})

User.destroy({
  where: { id: [Op.ne]: 30 }
})
```
## 관계 쿼리
### include
JOIN과 유사한 기능을 수행합니다. 호출을 한 번만 실행합니다. include에서도 `findAll`과 같이 `where`, `attributes` 등을 사용할 수 있습니다.
```js
const user = await User.findOne({
  include: [{
    model: Comment,
  }]
})
console.log(user.Comments);
```
```js
const user = await User.findOne({
  include: [{
    model: Comment,
    where: {
      id: 1,
    },
    attributes: ['id'],
  }]
})
console.log(user.Comments);
```
### get을 통해 데이터 로딩
include와 동일한 결과를 가져오지만 호출을 두 번 실행합니다.
```js
const user = await User.findOne({});
const comments = await user.getComments();
console.log(comments);
```
```js
const user = await User.findOne({});
const comments = await user.getComments({
  where: {
    id: 1,
  },
  attributes: ['id'],
});
console.log(comments);
```
### 다대다
```js
db.sequelize.models.PostHashtag
```
### 생성쿼리
데이터를 등록할 경우 즉시 정해지는 게 아니라 나중에 정해지는 경우에 미리 생성한 후 데이터를 추가합니다. 
```js
const user = await User.findOne({});
const comment = await Comment.create();
await user.addComment(comment);
await user.addComment(comment.id);
```
### 여러 개 동시에
```js
const user = await User.findOne({});
const comment1 = await Comment.create();
const comment2 = await Comment.create();
await user.addComment([comment1, comment2]);
```
### raw 쿼리
```js
const [result, metadata] = await sequelize.query('SELECT * from users');
console.log(result);
```
## seeder
```bash
npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo:all
```