
## 연결 선택자
### 하위선택자
- 지정한 모든 하위 요소에 스타일 적용
```css
section span { ... }
```
### 자식선택자
- 자식 요소에만 스타일 적용
```css
section > span { ... }
```
### 인접형제선택자
- 가장 가까운 형제 요소에 스타일 적용
```css
h1 + span { ... }
```
### 형제 선택자
- 형제요소에 스타일 적용
```css
h1 ~ span { ... }
```
### 예시
```html
<section>
  <span>하위선택자, 자식선택자 적용</span>
  <p>
    <span>하위선택자 적용</span>
  </p>
</section>
```
```html
<section>
  <h1>본인 기준</h1>
  <span>형제선택자, 인접형제선택자 적용</span>
  <span>형제선택자 적용</span>
</section>
```
## 속성 선택자
### [속성]
```css
a[href] { ... }
```
```html
<a>적용x</a>
<a href="#">적용o</a>
```
### [속성=값]
```css
a[target="_blank"] { ... }
```
```html
<a target="_self">적용x</a>
<a target="_blank">적용o</a>
```
### [속성~=값]
- 여러 값 중 특정 값이 포함된 속성에 스타일 적용
```css
a[class~="button"] { ... }
```
```html
<a class="button">적용o</a>
<a class="rounded button">적용o</a>
<a class="rounded-button">적용x</a>
```
### [속성|=값]
- 특정 값이 포함된 속성에 스타일 적용
```css
a[title|="kr"] { ... }
a[title|="en"] { ... }
```
```html
<a title="kr">kr 적용</a>
<a title="kr-test">kr 적용</a>
<a title="en">en 적용</a>
```
### [속성^=값]
- 특정 값으로 시작하는 속성에 스타일 적용
```css
a[title^="kor"] { ... }
a[title^="eng"] { ... }
```
```html
<a title="korea">kor 적용</a>
<a title="english">eng 적용</a>
```
### [속성$=값]
- 특정 값으로 끝나는 속성에 스타일 적용
```css
a[title$="a"] { ... }
a[title$="h"] { ... }
```
```html
<a title="korea">a 적용</a>
<a title="english">h 적용</a>
```
### [속성*=값]
- 값의 일부가 일치하는 속성에 스타일 적용
```css
a[title*="bc"] { ... }
```
```html
<a title="abc">bc 적용</a>
<a title="bcd">bc 적용</a>
<a title="cde">적용x</a>
```
## 가상 클래스
### 사용자 동작에 따른 가상 클래스
- :link : 방문하지 않은 링크에 스타일 적용
- :visited : 방문한 링크에 스타일 적용
- :hover : 마우스 커서 올려놓을 때 스타일 적용
- :active : 활성화 했을 때 스타일 적용
- :focus : 초점이 맞추어졌을 때 스타일 적용
### UI 요소 상태에 따른 가상 클래스
- :enabled : 요소를 사용할 수 있을 때 스타일 적용
- :disabled : 요소를 사용할 수 없을 때 스타일 적용
- :checked : 라디오박스, 체크박스에서 항목 선택했을 때 스타일 적용
### 구조 가상 클래스
- :root : 문서 전체에 적용
- :nth-child(n), :nth-last-child(n) : n번째 자식 요소에 스타일 적용
- :nth-of-type(n), :nth-last-of-type(n) : 특정 태그 n번째 위치에 스타일 적용
- :first-child, :last-child : 첫 번째 요소나 마지막 요소에 스타일 적용
- :first-of-type, :last-of-type : 형제 관계 요소의 위치에 따라 스타일 적용
- :only-child, :only-of-type : 하나뿐인 자식 요소에 스타일 적용
### 그 외 가상 클래스
- :target : 앵커 목적지에 스타일 적용
- :not(요소) : 특정 요소가 아닐 때 스타일 적용

## 가상요소
- ::first-line : 첫 번째 줄에 스타일 적용
- ::first-letter : 첫 번째 글자에 스타일 적용
- ::before, ::after : 내용 앞뒤에 컨텐츠 추가
