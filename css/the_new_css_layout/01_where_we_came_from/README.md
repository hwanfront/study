## float의 문제
- float 는 원래 이미지 등 요소 주위에 텍스트 둘러 표현할 때 사용할 용도로 고안
- 여러 개의 floating element의 너비를 정확하게 계산하면 column처럼 한 줄로 나란하게 배열 가능함 [float](./float.html)
```html
<style>
  .cards li {
    float: left;
    width: calc(33.333333333% - 20px);
    ...
  }
</style>

<ul class="cards">
  <li>
    <p>1</p>
  </li>
  <li>
    <p>2</p>
  </li>
  ...
</ul>
```
- floating element 중에서 길이가 길어진다면 의도하지 않은 공백이 생김 [floating_elements](./floating_elements.html)
## 문제 해결
### clearfix 적용
- `clearfix` : float 속성을 초기화 하기 위해 `clear: both;` 같은 방법을 사용
- 그리드의 각 줄을 wrapper로 감싸고, `clearfix`를 적용해 이 전 공간을 침범하지 않도록 함
  - 새로운 마크업을 추가할 때마다 번거로움
### display: inline-block; 사용
- inline 요소는 공백을 그대로 유지하는 특성이 있음, 각 요소 사이에 4px 여백이 생김
- 쉽게 망가지는 레이아웃이 됨
- 제거하기 위해 margin 속성을 -px만큼 조정하거나, 아래와 같이 태그 사이의 공백을 없애는 등의 방법이 있음
```html
<style>
  .cards .li {
    display: inline-block;
    vertical-align: top;
    width: calc(33.333333333% - 20px);
    ...
  }
</style>

<ul class="cards">
  <li>
    <p>1</p>
  </li><li>
    <p>2</p>
  </li>
  ...
</ul>
```
### display: table; 사용
- 표를 작성할 때 사용하도록 고안됨
```html
<style>
  .wrapper {
    display: table;
    border-spacing: 20px;
    margin: -20px;
  }
  .cards {
    display: table-row;
  }
  .cards li {
    display: table-cell; 
    vertical-align: center;  
  }
</style>

<div class="wrapper">
  <ul class="cards">
    <li>
      <p>1</p>
    </li>
    <li>
      <p>2</p>
    </li>
    ...
  </ul>
  <ul class="cards">
    <li>
      <p>4</p>
    </li>
    ...
  </ul>
</div>
```
## 결론
- float 나 inline-block 을 적용하면 각 줄의 경계가 들쑥날쑥함, 어느정도 정돈된 그리드는 만들 수 있음
- display: table; 을 사용할 경우 모든 칸이 똑같은 높이로 표현됨