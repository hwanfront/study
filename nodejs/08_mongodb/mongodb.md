# mongoDB
관계형 데이터베이스가 아닌 SQL 즉 NoSQL입니다. 기본 포트는 27017번을 사용합니다.
## mongoDB의 데이터 BSON
mongoDB는 데이터를 [BSON](https://bsonspec.org/) 형태로 저장합니다. BSON은 JSON에서 몇몇 자료형이 추가된 Binary 형태로 인코딩하여 직렬화된 문서입니다. JSON과 동일한 구조이지만 텍스트 기반으로 구문 분석하는 JSON에 비해 빠르고 공간 효율성이 좋습니다. 
## 특징
- 자유로운 데이터 입력
- 컬렉션(sql의 테이블) 간 JOIN 미지원 (비슷한 populate 기능이 있음)
- 확장성과 가용성
- 비정형 데이터에서 좋음
## 용어
- sql의 table -> collection
- sql의 row -> document
- sql의 column -> field
## 설치
- mongod mongosh 설치
- window
```bash
c:\Program Files\mongoDB\Server\7.0\bin\
$ mongod
$ mongosh
> use admin
> db.createUser({ user: 'root', pwd: 'password', roles: ['root'] });
$ mongod --ipv6 --auth
$ mongosh admin -u root -p password
```
## 
```sql
use test-db
show dbs -- collection 생성 전에는 보이지 않음
db.createCollection('users')
db.createCollection('comments')
show collections
show dbs
db.users.insertOne({ name: '김하나', age: 24, married: false, comment: 'comment', createdAt: new Date() });
```
## create
- db.collection.insertOne()
- db.collection.insertMany()
```js
// 생성
db.users.insertOne({ name: '김하나', age: 24, createdAt: new Date() });
db.users.insertMany([
    { name: '김하나', age: 24, createdAt: new Date() }, 
    { name: '김하나', age: 24, createdAt: new Date() }
]);
// 관계설정
db.comments.insertOne({ commenter: ObjectId("64eb6d18fc547888869ec633"), comment: "comment1111", createdAt: new Date() });
```
## find
- db.collection.find()
- db.collection.findOne()
```js
// 전체조회
db.users.find()
// 조회
db.users.find({name: '김하나'})
[
  {
    _id: ObjectId("64eb6d18fc547888869ec633"),
    name: '김하나',
    age: 24,
    married: false,
    comment: 'comment',
    createdAt: ISODate("2023-08-27T15:34:48.178Z")
  }
]
// id만 조회
db.users.find({name: '김하나'}, {_id: 1})
[ { _id: ObjectId("64eb6d18fc547888869ec633") } ]
// 하나만 조회
db.users.findOne()
```
### find 조건
- db.collection.find().sort()
- db.collection.find().limit()
- db.collection.find().skip()
```js
// 정렬 (-1 -> DESC, 1 -> ASC)
db.users.find(...).sort({ age: -1 })
// document 개수 제한
db.users.find(...).limit(1)
// 건너 뛸 document 개수
db.users.find(...).skip(1)
```
## update
- db.collection.updateOne()
- db.collection.updateMany()
```js
db.users.updateOne({name: '김하나'}, {$set: {comment: 'updated comment'}})
```
## delete
- db.collection.deleteOne()
- db.collection.deleteMany()
- db.collection.findOneAndDelete()
```js
db.users.deleteOne({name: '김하나'})  
```
# mongoos ODM Object Document Mapping
mongoDB 작업을 쉽게 할 수 있도록 도와주는 라이브러리입니다. 객체와 document를 매핑해 mongodb에 없는 기능을 보완합니다. 테이블과 유사한 기능을 하며 JOIN 기능이 추가됩니다. 다만 확장성과 가용성이 제한됩니다.
## schema
sql의 model 역할을 합니다.
> 참고 https://github.com/ZeroCho/nodejs-book/tree/master/ch8/8.6/learn-mongoose