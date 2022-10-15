## flex
- 1차원 레이아웃 : 위나 아래에 있는 다른 flex box와 선을 맞추어 정렬하지 않음
  - 줄과 칸을 동시에 제어 불가능
- `display: flex;` 설정하면 내부가 flex item 이 됨
  - 기본값에 따라 한줄로 배열, flex container 높이만큼 길이가 늘어남
```css
.container {
  display: flex;
}
```
- `display: flex;` 설정된 컨테이너에 flex item 들이 여러 줄에 걸쳐 표현되려면 `flex-wrap: wrap` 설정
  - flex item 들이 너비를 꽉 채움
```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```
- flex item 들이 줄바꿈이 되게 하려면 item 에 `flex` 속성 추가
  - `flex` 는 `flex-grow`, `flex-shrink`, `flex-basis` 로 이루어 짐
```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.container .child {
  flex: 1 1 200px;
}
```
- flex box 가 grid 처럼 동작하게 하려면 너비 계산 후 flex 속성 0 0 auto 로 변경
```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.container .child {
  width: ...;
  flex: 0 0 auto;
}
```