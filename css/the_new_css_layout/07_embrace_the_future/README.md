## css feature query
- CSS 조건부 규칙 모듈(CSS Conditional Rules) `@supports`
- CSS 기능의 지원을 확인함
```css
@supports (display: grid) { // CSS grid 지원되는 브라우저에만 적용
  .container {
    display: grid;
  }
}
@supports (display: -ms-grid) { ... }
@supports (display: grid) or (display: -ms-grid) { ... }
@supports (display: grid) and (shape-outside: circle(50%)) { ... }
```
## 덮어 쓰기
- 구식 브라우저를 위한 속성을 먼저 작성하고 이후 최신 브라우저를 위한 속성을 작성