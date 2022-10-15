## 블록 양식화 문맥 (Block Formatting Context: BFC)
- 요소에 블록 양식화 문맥을 적용하면 자식 요소에 적용할 독립적인 레이아웃 환경을 만들 수 있음
### BFC 조건
- root 요소일 때
- floating 되었을 때
- `position: absolute;` 속성이 적용될 때
- `display: inline-block;` 속성이 적용될 때
- overflow 속성 값이 visible 이외의 값이 적용될 때
### BFC 예시
- ex) box 가 floating 되면 container 가 줄어듬 => 크기를 유지해줄 요소가 없기 때문
- floating 된 요소는 flow을 벗어난다
```html 
<div class="container">
  <div class="box">
    <p>...</p>
  </div>
</div>
```
#### 해결
- container 에 `overflow: hidden;` 속성 추가
  - box-shadow 잘리는 문제가 있음
- container 에 `float: left;` 속성 추가
- container 에 `display: flow-root;` 속성 추가
## flow
- block level 요소에서 별다른 제약이 없는 경우, 요소는 컨테이너 너비만큼 넓어짐
- inline 요소는 공간이 있을 경우 다른 요소 바로 뒤에 표시
- 요소를 floating 하거나 `position: absolute;` 또는 `position: fixed;` 작용하면 flow 흐름에서 벗어남
