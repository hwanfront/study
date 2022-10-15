## flex item 배치
- flex item 의 배치는 align-items 을 통해 설정
  - stretch, flex-start, flex-end, center ...
- 각각의 아이템에 따로 배치속성을 줄 땐 align-self 속성
```css
.flex {
  display: flex;
  align-items: ...;
}
.child {
  align-self: ...;
}
```
## flex item 정렬
- flex item 정렬은 justify-content 을 통해 설정
  - flex-start(default), flex-end, center
### 아이템 사이 간격
- space-around : 모든 아이템 양쪽에 똑같은 간격 띄움
  - | item || item || item |
- space-between : 아이템 사이 공간들을 똑같은 간격 띄움
  - item | item | item
- space-evenly : 모든 공백을 균등하게 배분하여 간격 띄움
  - | item | item | item |
```css
.flex {
  display: flex;
  justify-content: ...;
}
```
### flex 의 align-content 속성
- flex-wrap 속성값이 wrap
- 아이템을 배치하기 위해 필요한 공간보다 container가 김
- 두 조건이 만족하면 justify-content 와 같은 방식으로 사용 가능
## grid item 배치
- grid item 의 배치는 align-items 을 통해 설정
  - stretch, flex-start, flex-end, center ...
- 각각의 아이템에 따로 배치속성을 줄 땐 align-self 속성
```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 80px);
  grid-template-areas: ...;
  align-items: ...; 
}
.child {
  grid-area: ...;
}
```
## grid item 정렬
- grid item 정렬은 justify-items 을 통해 설정
  - stretch(default), start, end, center ...
- 각각의 아이템에 따로 정렬속성을 줄 땐 justify-self 속성
```css
.grid {
  display: grid;
  ...
  justify-items: ...; 
}
```
## grid 배치와 정렬
- track의 크기(grid-template-areas: ...;) 에서 fr이 아닌 고정값으로 설정하면 컨테이너의 너비나 높이를 넘지 않게 배치됨
- align-content 와 justify-content 를 사용하여 너비와 높이를 채울 수 있도록 넓게 배치 가능
```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 15%);
  grid-template-rows: repeat(3, 80px);
  grid-template-areas: ...;
  align-content: space-between; 
  justify-content: space-between;
}
.child {
  grid-area: ...;
}
```
## 자동 마진을 이용한 배치
```css
.parent {
  display: flex;
}
.parent .child {
  margin-left: auto;
}
```
## 논리적 속성과 물리적 속성
### 물리적 속성
- left, right, top, bottom 등 절대 위치에서 사용되는 속성
### 논리적 속성
- 컨테이너 시작 부분을 나타내는 논리적 속성을 사용