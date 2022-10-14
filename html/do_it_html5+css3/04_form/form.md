## form
- method : 사용자가 입력한 데이터를 어떻게 넘겨줄지 (get, post)
- name : form 이 여러 개일 경우 구분
- action : 내용을 처리해 줄 서버 상의 프로그램 지정
- target : action 에서 지정한 스크립트 파일을 다른 위치에서 열도록 지정
- autocomplete : 자동완성기능 사용유무
### 폼 요소 그룹으로 묶는 fieldset, legend 태그
- `fieldset` 태그는 폼들을 하나의 영역으로 묶음
- `legend` 태그는 `fieldset` 에 제목을 붙여 줌
## 데이터 나열
### 드롭다운 목록 select, option 태그
- `select` 태그 내부에 `option` 태그 추가
- `option` 을 그룹으로 묶어야 하는 경우 `optgroup` 태그로 나눔
### 데이터 목록에서 값 선택 datalist, option 태그
- input 태그와 함께 사용
```html
<input type="text" list="데이터목록id">
<datalist id="데이터목록id">
  <option>...</option>
  ...
</datalist>
```
## form 요소들
### button 태그의 submit 과 input 태그의 submit 차이
- 기본 모습과 용도는 비슷함
- button 태그는 태그 이름에서 역할을 알 수 있어 화면 낭독기가 의미를 정확히 전달
- button 태그는 아이콘 추가 및 css를 이용해 원하는 형태로 꾸미기 쉬움
### 계산 결과라는 것을 브라우저에 알려주는 output 태그
```html
<form oninput="result.value=parseInt(num1.value)+parseInt(num2.value)">
  <input type="number" name="num1" value="0">
  +<input type="number" name="num2" value="0">
  =<output name="result" for="num"><output>
</form>
```
### 진행 상태 보여주는 progress 태그
- 진행 상황을 표시
### 값이 차지하는 크기 표시하는 meter 태그
- 전체 크기 중 얼마나 차지하는지 표현
