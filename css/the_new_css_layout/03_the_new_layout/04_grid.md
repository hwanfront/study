## grid
- 2차원 레이아웃 : 줄과 컬럼을 동시에 제어하고 배치 가능
- `display: grid;`
- `grid-template-columns` : 사용 가능한 공간을 비율로 나누는 설정
  - `grid-template-columns: 1fr 1fr 1fr;` : 공간을 균등하게 세 등분
  - `grid-template-columns: repeat(3, 1fr)` 로 표현 가능
- `grid-gap` : grid item 들의 간격
  - column과 row를 따로 설정하려면 `grid-column-gap`, `grid-row-gap`
  - 최근에는 `grid-` 생략
```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  gap: 16px;
}
```
- grid item 배치는 `grid-column`, `grid-row` 사용
  - 1 이면 1 (1 / 2 와 같은 듯?)
  - 1 / 3 이면 1 2 
  - 2 / 4 이면 2 3
```css
.card1 {
  grid-column: 1 / 3;
  grid-row: 1;
}
.card2 {
  grid-column: 3;
  grid-row: 1;
}
.card3 {
  grid-column: 1;
  grid-row: 2 / 4;
}
.card4 {
  grid-column: 2 / 4;
  grid-row: 2;
}
.card5 {
  grid-column: 2 / 4;
  grid-row: 3;
}
```
- `grid-template-areas` 를 통해 형태를 정의할수도 있음
  - 칸을 공백으로 하려면 `.` 넣음
- 각 item 들에 `grid-area` 추가
```css
.container {
  ...
  grid-template-areas: 
    "a a b"
    "c d d"
    "c e e"
  ;
}
.card1 { grid-area: a; }
.card2 { grid-area: b; }
.card3 { grid-area: c; }
.card4 { grid-area: d; }
.card5 { grid-area: e; }
```
- 결과
```bash
┌─┬─┬─┐
│1│1│2|
├─┼─┼─┤
│3│4│4|
├─┼─┼─┤
│3│5│5|
└─┴─┴─┘
```