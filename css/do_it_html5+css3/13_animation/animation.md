## transform
- translate(x, y) : 축 이동
- scale(x, y) : 축으로 확대/축소, x와 y는 n배
- rotate(각도) : 각도만큼 회전, 각도는 deg 사용
- skew(x, y) : 축으로 비틀어 왜곡, x와 y는 deg 사용
### transform-origin
- 변형 기준점 설정
- x축 좌표값으로 길이값, left, center, right 사용 가능
- y축 좌표값으로 길이값, top, center, bottom 사용 가능
- z축 좌표값으로 길이값 사용 가능
### perspective, perspective-origin
- 원근감 표현, 3차원 변형에서 사용
### transform-style
- 3D 변형 적용
- flat : 하위 요소를 평면으로 처리
- preserve-3d : 하위 요소들에 3D 효과 적용
### backface-visibility
- 요소 뒷면 표시
## transition
- 스타일 속성이 바뀌는 것
### transition-property
- 트랜지션 태상 설정
  - all
  - none
  - 속성이름
### transition-duration
- 트랜지션 진행 시간 지정
  - 1s (1초)
- transition-property 에서 속성이 여러개이면 시간이 순서대로 적용
### transition-timing-function
- 트랜지션 속도 곡선 지정
  - linear : 시작부터 끝까지 똑같은 속도
  - ease : 천천히 시작 후 점점 빨라지다 천천히 끝남 (기본값)
  - ease-in : 시작을 느리게
  - ease-out : 끝을 느리게
  - ease-in-out : 느리게 시작해서 느리게 끝남
  - cubic-bezier(n,n,n,n) 베지에 함수를 직접 정의해 사용
### transition-delay
- 시작시간(지연시간) 설정
## animation
- transition과 비슷하지만 원하는 곳 어디서든 스타일을 바꾸며 정의할 수 있는 점에서 다름
### @keyframes
- 애니메이션이 바뀌는 지점 설정
### animation-name
- 애니메이션 이름 지정
### animation-duration
- 애니메이션 실행 시간 설정
### animation-iteration-count
- 애니메이션 반복 횟수 지정
- infinity : 무한반복
```css
#box {
  ...
  animation-name: rotate;
  animation-duration: 1s;
  animation-iteration-count: infinity;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(45deg);
  }
}
```
### animation-direction
- 애니메이션 방향 지정
- normal : 애니메이션을 실행하면 원래 위치로 돌아감 (기본값)
- alter : 애니메이션을 실행하면 왔던 방향으로 되돌아가면서 실행
### animation-timing-function
- 애니메이션 속도 곡선 지정
  - linear : 시작부터 끝까지 똑같은 속도
  - ease : 천천히 시작 후 점점 빨라지다 천천히 끝남 (기본값)
  - ease-in : 시작을 느리게
  - ease-out : 끝을 느리게
  - ease-in-out : 느리게 시작해서 느리게 끝남
  - cubic-bezier(n,n,n,n) 베지에 함수를 직접 정의해 사용