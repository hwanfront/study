## Promise
- 내용이 실행은 되었지만 결과를 아직 반환하지 않은 객체
- `then` 결과를 반환함
- 실행이 완료되지 않았으면 완료된 후에 `then` 내부 함수 실행
- resolve(성공return 값) => then 으로 연결
- reject(실패return 값) => catch 로 연결
- finally 무조건 실행
```js
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('success');
  } else {
    reject('failed')
  }
});
promise
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  })
```
### Promise.all(...)
- 여러 개의 프로미스를 동시에 실행
- 하나라도 실패하면 catch로 감
- `Promise.allSettled` 실패한 것만 추려낼 수 있음
```js
const promise1 = Promise.resolve('1');
const promise2 = Promise.resolve('2');
Promise.all([promise1, promise2])
  .then((result) => {
    console.log(result); // ['1', '2'];
  })
  .catch((error) => {
    console.error(error);
  })
```
## async/await
- promise then 예시
```js
function findAndSaveUser(Users) {
  Users.findOne({})
    .then((user) => {
      user.name = 'aaa';
      return user.save();
    })
    .then((user) => {
      return Users.findOne({gender: 'm'});
    })
    .then((user) => {
      ...
    })
}
```
- async/await 예시
```js
async function findAndSaveUser(Users) {
  try {
    let user = await Users.findOne({});
    user.name = 'aaa';
    user = await user.save();
    user = await Users.findOne({gender: 'm'});
  } catch (error) {
    console.error(error);
  }
}
```
- async 함수는 항상 promise 반환
```js
async function a() {
  const result = await ...;
  return ...;
}
a().then((res) => ...);
const a = await a();
```
### for await of
- resolve된 promise가 변수에 담겨나옴
- await 사용하기 때문에 async 함수 안에서 해야함
```js
const p1 = Promise.resolve('1');
const p2 = Promise.resolve('2');
(async () => {
  for await (promise of [p1, p2]) {
    console.log(promise);
  }
})
```