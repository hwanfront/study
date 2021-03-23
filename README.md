# css
## font-size
1. **em**  
  - 1em = 16px, 상속문제 발생
  - ex) 6em(96px) 적용 박스에 64px 글자 적용하려면 64px / 96px => 0.666667em
2. **rem**  
  - 1rem = 16px, 상속문제 해결 (기준이 <html> 태그)
3. **vw**  
  - 웹 브라우저 너비=100 기준으로 하여 크기 결정  
  - vw 값 * 브라우저 너비 값 / 100 = px값  
  - ex) width:1280 에서 64px 글자 => 5vw * 1280 / 100 = 64px
4. **vh**  
  - 웹 브라우저 높이=100 기준으로 하여 크기 결정
5. **vmin**  
  - 웹 브라우저 너비와 높이 중 짧은 쪽=100 기준으로 하여 크기 결정
6. **vmax**  
  - 웹 브라우저 너비와 높이 중 긴 쪽=100 기준으로 하여 크기 결정

## width, height %
- 길이 / 전체 길이
- width 100% => 요소 크기를 100% 로 유지
- max-width 100% => 요소 기본 크기 이상으로 조절 안 됨
  
## @media
### @media [only not] [미디어 유형] [and 또는 ,] (조건문){실행문}
- **only not**
  - only : 미디어 쿼리 지원하는 브라우저에서만 해석
  - not : 조건 부정
- **미디어 유형**
  - all
  - print
  - screen
  - tv
  - projection
  - handheld
  - speech
  - aural
  - embossed
  - tty
  - braille
- **and ,** : 조건문 두 개 이상 작성가능
  - and : 앞뒤 조건이 모두 사실일 때 해석
  - , : 앞뒤 조건중 하나만 사실이라도 해석
- **조건문**
  - width : 웹페이지 너비
  - height : 웹페이지 높이
  - device-width : 기기 가로 너비
  - device-height : 기기 세로 높이
  - orientation : 기기 화면 방향 
    - portrait 세로
    - landscape 가로
  - aspect-ratio : 화면 비율
    - 브라우저 화면 비율 1
    - 브라우저 종횡비 16/9
    - 브라우저 해상도 1280/720
  - device-aspect-ratio : 단말기 화면 비율
    - 기기 화면 비율 1
    - 기기 종횡비 16/9
    - 기기 해상도 640/320
  - color : 기기 비트 수
  - color-index : 기기 색상 수
  - monochrome : 기기 흑백을 때 픽셀 당 비트 수
  - resolution : 기기 해상력
  - scan : TV 스캔방식
  - grid : 기기의 그리드 / 비트맵
    - 0 : 비트맵
    - 1 : 그리드
- **실행문**
- 320 768 1024
- @media (min-width: 320px) and (max-width: 768px) 너비가 320이상 768이하
```
@media all and (min-width: 320px) {
  #wrap div{
    width: 100%
  }
}
@media all and (min-width: 768px) {
  #wrap div{
    width: 100%
  }
  #wrap div:last-child{
    width: 100%
  }
}
@media all and (min-width: 1024px) {
  #wrap div{
    width: 20%
  }
  #wrap div:last-child{
    width: 20%
  }
}
```
### child
:first-child  
:nth-child(2)  
:nth-child(3)  
:last-child  
