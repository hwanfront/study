## flex box 의 흐름 방향
- 기본적으로 소스 코드에서 출현한 순서에 따라 배치
### flex-direction
- row (기본값)
- column
- row-reverse
- column-reverse
## grid layout 의 흐름방향
- 자동배치도 가능하지만 명시적으로 그리드에 그리드 아이템을 배치하면 자동 배치에서 벗어남
### grid-auto-flow
- row (기본값)
- column
## grid 자동 배치
- 자동배치를 하면서 아이템의 너비를 늘이고 싶을 때
```css
...
.landscape {
  grid-column: auto / span 2;
}
```
- 이대로면 소스코드에 나타난 순서에 따라 배치됨
- 폭에 맞지 않는 아이템은 빈 공간으로 남겨두고 다음 줄에 표현
  - `grid-auto-flow: dense;` 추가
```css
.parent {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-flow: dense;
}
...
```
## order 속성
- grid, flex 모두 사용 가능
- 기본값은 0, 높을수록 뒤로감
- 시각적인 순서만 바꿈, 코드를 수정해 논리적인 순서도 바꾸어야 할 것인지 고민
## display: contents;
- flex 또는 grid 레이아웃의 구성 요소가 될 수 있음