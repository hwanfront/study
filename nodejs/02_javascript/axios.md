## 서버로 요청 보내는 코드
- 라이브러리 없이는 XMLHttpRequest 객체 이용
## axios
- ajax 요청 시 사용하는 라이브러리
```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>...</script>
```
### get
```js
axios.get(주소)
.then((result) => {
  console.log(result);
  console.log(result.data);
})
.catch((error) => {
  console.error(error);
})
```
```js
(async () => {
  try {
    const result = await axios.get(주소);
    console.log(result);
    console.log(result.data);
  } catch (error) {
    console.error(error);
  }
})
```
### post
```js
(async () => {
  try {
    const result = await axios.post(주소, 데이터);
    console.log(result);
    console.log(result.data);
  } catch (error) {
    console.error(error);
  }
})
```
### FormData
- axios는 이미지나 파일 전송할 때 FormData 에 넣어서 보냄

### encodeURIComponent, decodeURIComponent
- 주소창에 한글 입력하면 서버 처리 못하는 경우 발생, ascii 코드만 넣는게 안전
- 서버에 있는 자원, Locator 가 아닌 Identifier
```js
const url = `https://.../api/${encodeURIComponent('한글')}`;
```
- encode 하면 ascii 코드로 변환되고, ascii 코드를 decode 하면 한글로 변함
### data attribute 와 dataset
- html 태그에 데이터 저장
- 서버 데이터를 프론트엔드로 내려줄 때 사용
- 태그 속성은 data-@@@@
- 자바스크립트에서는 dataset.@@@@
```html
<div data-id="1" data-first-name="kim">aaa</div>
```
```js
data.id = '1';
data.firstName = 'kim';
```