
## float
- float의 원래 목적은 텍스트를 이미지 주변에 두르는 것
- 너무 남발하지 말고 알맞은 곳에만 사용하자
### shape-outside
- 이미지 주변에 반원 모양으로 글자 배치
## position
### static
- 일반적인 흐름 안에서 코드상에 출현한 순서대로 표시
### relative
- 단독으로 추가하면 변화가 나타나지 않음
- top, right, bottom, left 와 같은 offset 속성을 추가하면 원래 있던 위치에서 조금 이동
- 새로운 컨테이너 블록이 됨
### absolute
- 흐름에서 벗어나고 자신이 포함된 컨테이너 블록의 가장자리 기준으로 offset 속성에서 설정된 만큼 이동
- css 레이아웃 제작 초기에 많이 사용하던 방법, 절대위치
  - 모든 레이어의 높이가 같을 때만 잘 작동, 콘텐츠가 겹침
### fixed
- 화면상에서 고정된 위치에 존재
- 스크롤해도 원래 위치에 남음
- 컨텐츠가 겹치는지 잘 고려해서 사용
### sticky
- static 과 fixed 를 섞어놓은듯 동작
- 스크롤되기 전에는 static 요소처럼 동작하다가 스크롤이 일정한 위치에 도달하면 fixed 처럼 동작
## multicolumn layout
- 컨텐츠를 여러 단으로 나누는 방식
- `column-count` : 나누고싶은 column 개수
- `column-width` : column 너비 설정
- 둘 다 같이 사용하면 `column-count` 속성은 최대 칼럼 개수로 사용됨
