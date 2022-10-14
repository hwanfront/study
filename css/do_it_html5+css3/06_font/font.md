## 폰트 적용
### 웹 폰트
```css
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap');
  .class {
    font-family: 'Noto Sans KR', sans-serif;
  }
</style>
```
```css
<style>
  @font-face {
    font-family: 글꼴 이름;
    src:url(글꼴 파일 경로) format(파일 유형);
  }
</style>
```
#### 글꼴 파일 유형
- ttf
- woff
- eot 등