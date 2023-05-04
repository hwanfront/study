# CustomEvent()
- 새로운 커스텀 이벤트를 생성함
```js
new CustomEvent(typeArg, options);
```
- `typeArg`: 이벤트의 이름 문자열
- `options`
  - `detail`: 이벤트의 세부 정보 값
# EventTarget.dispatchEvent()
- EventTarget 객체로 Event를 발송함
- 해당 이벤트에 대해 등록된 eventlistener 들을 호출
- dispatchEvent()로 발송된 이벤트는 동기적으로 호출됨
## 예시) url 이동 시 발생하는 이벤트
```js
$element.addEventListsner('click', () => {
  window.history.pushState('', '', '/web/');
  const urlchange = new CustomEvent('urlchange', { detail: { url: '/' } });
  document.dispatchEvent(urlchange);
})

$element.addEventListener('urlchange', (e) => {
  const { url } = e.detail;
  console.log(url);
})

```