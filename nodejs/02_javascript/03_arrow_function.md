## 화살표함수
- 화살표함수는 function함수를 완벽히 대체하지 못함, this에서 차이
- this를 사용할거면 function 함수, 아니라면 화살표 함수로 통일하는 게 좋음
```js
var relationship = {
  name: 'junghwan',
  friends: ['a', 'b', 'c'],
  logFriends: function() {
    var that = this; // relationship 를 가리키는 this를 저장
    this.friends.forEach(function(friend) {
      console.log(that.name, friend); // this가 relationship이 아닌 window를 가리킴
    })
  }
}
relationship.logFriends();
```
```js
const relationship = {
  name: 'junghwan',
  friends: ['a', 'b', 'c'],
  logFriends() {
    this.friends.forEach((friend) => {
      console.log(this.name, friend); // this가 relationship을 가리킴, 부모쪽과 같은 this
    })
  }
}
relationship.logFriends();
```
## 비구조화(구조분해)할당
- this는 함수를 호출할 때 어떻게 호출되었느냐에 따라 결정
- this가 있는 경우 구조분해할당을 하지 않는 게 좋다
  - 
```js
var c = {
  s: {
    n: 'n',
    co: 1,
  }
  getC: function () {
    this.s.co--; // this를 사용하고 있는 경우에는
    return this.s.co;
  }
}
var getC = c.getC; // 문제 발생
var co = c.s.co;
```
```js
const c = {
  s: {
    n: 'n',
    co: 1,
  },
  getC() {
    this.s.co--;
    return this.s.co;
  }
}
const { getC, status: { co } } = c;
```