## media query
- 사이트에 접속하는 장치에 따라 특정한 css 스타일을 사용하도록 해줌
```css
@media [only | not] 미디어 유형 [and 조건] * [and 조건] {
  ...
}
```
### 연산자
- and, 조건을 계속 추가할 때 
- , - 동일한 스타일 유형을 사용할 것들 추가
- only : 미디어쿼리를 지원하는 웹 브라우저에서만 조건 인식
- not : not 다음 지정하는 미디어 유형 제외
### 미디어 유형
- all : 모든 유형
- screen : 컴퓨터 스크린 (스마트폰 스크린 포함)
- tv
- print : 인쇄장치
- handheld : 패드처럼 손에 들고다니는 장치
- aural : 음성
- braille : 점자
- projection
- tty : 디스플레이 기능이 제한된 장치
- embossed : 점자프린터
### 조건
#### 웹페이지 기준
- width, height, min-width, min-height, max-width, max-height
#### 단말기 기준
- device-width, device-height, min-device-width, min-device-height, max-device-width, max-device-height
#### 화면 회전
- orientation: portrait (단말기 세로 방향)
- orientation: landscape (단말기 가로 방향)
#### 화면 비율
- aspect-ratio : 화면 비율 (width / height)
- min-aspect-ratio, max-aspect-ratio : 최소/최대 화면 비율
#### 단말기 비율
- device-aspect-ratio, min-device-aspect-ratio, max-device-aspect-ratio
#### 색상당 비트 수
- color : 비트 수
- min-color, max-color : 최소/최대 비트 수
```css
@media all (min-width: 720px) and (max-width: 1279px) { ... }
@media screen and (max-width: 1024px) { ... }
@media screen and (max-device-width: 1024px) { ... }
@media screen and (orientation: portrait) { ... }
@media all and (aspect-ratio: 16/9) { ... }
@media all and (device-aspect-ratio: 16/9) { ... }
@media all and (color) { ... } // 컬러 지원하면 실행
@media all and (color: 0) { ... } // 컬러 지원하지 않으면 실행
@media all and (color: 3) { ... } // 8비트 색상이면 실행
```
### 적용
#### 외부 파일 적용
```html
<link rel="stylesheet" media="미디어 쿼리 조건" href="css파일">
```
```html
<style>
  @import url("css파일") 미디어 쿼리 조건;
</style>
```
#### 웹 문서에 직접 정의
```html
<style media="미디어 쿼리 조건">
  ... { ... }
</style>
```
```html
<style>
  @media 미디어 쿼리 조건 {
    ... { ... }
  }
</style>
```