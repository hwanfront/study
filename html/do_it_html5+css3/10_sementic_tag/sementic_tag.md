## 시멘틱 태그
- HTML5 부터 태그 이름만 봐도 문서 구조에서 어떤 역할을 하는지 쉽게 이해하도록 만든 태그
```html
<header>헤더</header>
<section>
  콘텐츠영역
  <article>...</article>
  <article>...</article>
</section>
<aside>
  사이드바
</aside>
<footer>
  <address>
    <p>주소</p>
    <p>이메일</p>
  </address>
  <p>카피라이트</p>
</footer>
```
### header 머리말
- 사이트 전체의 헤더 또는 본문 중에 해당 부분의 머리말 등
### nav 문서를 연결하는 네비게이션 링크 모음
- 네비게이션 메뉴, footer, aside 등의 사이트 링크모음에 사용
### section 주제별 콘텐츠 영역
- 콘텐츠를 주제별로 묶을 때 사용
- section 안에 또 다른 section 태그를 넣기도 함
- article 과 다르게 문맥 흐름 중에서 콘텐츠를 주제별로 묶을 때 사용
### article 콘텐츠 내용 넣기
- 웹 상의 실제 내용을 넣음 (블로그의 포스트, 웹사이트 내용, 사용자가 등록한 코멘트, 독립적인 웹 콘텐츠 등)
- 독립적으로 완전히 하나의 콘텐츠가 된다면 사용
- article 안에 section 태그를 넣을 수 있음
### aside 본문 이외의 내용
- 필수 요소는 아님, 광고나 링크모음 등
### footer 제작 정보, 저작권 정보 표시
- 웹 문서 끝자락에 들어가는 사이트 정보 등
### address 사이트 제작자 정보, 연락처 정보 나타내기
- 단순 우편주소 표가의 경우 p 태그
### iframe 외부 문서 삽입
- 보안, 사용성, 크롤링 등의 사유로 사용하기 전에 고려해봐야함

## IE8 이하 시멘틱 태그 사용
- IE8.0 이하 지원안함
### css 에서 블록 레벨로 정의
```css
header, section, nav, article, footer {
  display: block;
}
```
### 시멘틱 태그 직접 정의
```html
<script>
  document.createElement("header");
  document.createElement("section");
  document.createElement("nav");
  document.createElement("article");
  document.createElement("footer");
  ...
</script>
```
### 폴리필
-  웹 개발에서 기능을 지원하지 않는 웹 브라우저 상의 기능을 구현하는 코드