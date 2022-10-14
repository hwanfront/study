## 이벤트 버블링
- 이벤트가 발생할 때 부모 태그에도 동일한 이벤트가 발생
- 이벤트를 연결한 태그에 접근하려면 `event.currentTarget`

## 유사배열객체
- 배열처럼 생긴 객체
```html
<div>
  <span>text1</span>
  <span>text2</span>
</div>
```
```js
const $div = $children;
const $children = $div.children; 
const $text1 = document.querySelector('span');
const $text2 = document.querySelectorAll('span')[1];

console.log($children) // => 유사배열객체 HTMLCollection(2) [span, span]
console.log($children[0]) // => <span>text1</span>
console.log($children.indexOf($text1)); // error, 유사배열객체에 indexOf() 없음
```
### Array.from
- 배열의 메서드를 사용하고 싶을 경우
```js
console.log(Array.from($children).indexOf($text1)); // => <span>text1</span>
console.log(Array.from($children).indexOf($text2)); // => <span>text2</span>
```
