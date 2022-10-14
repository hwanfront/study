## this
```js
document.addEventListener('click', function() {
  console.log(this); // document
})
```
```js
document.addEventListener('click', () => {
  console.log(this); // window
})
```
```html
...
<button id='id'>버튼</button>
...
```
```js
class Example {
  constructor() {
    this.foo();
  }
  foo() {
    document.querySelector('#id').addEventListener("click", this.callback1);
    document.querySelector('#id').addEventListener("click", this.callback2);
  }
  callback1() {
    console.log(this); // <button id='id'>버튼</button>
  }
  callback2 = () => {
    console.log(this); // Example {...}
  }
}

const example = new Example();
```
