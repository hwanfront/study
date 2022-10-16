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