# Counter Clock Wise 선분 교차 판별
## 의미
- 세 점의 방향성을 알 수 있는 계산이다.
- 세 점 p1(x1, y1) p2(x2, y2) p3(x3, y3)의 면적을 구하는 방법을 이용한다
- 면적의 부호에 따라 양수이면 반시계, 0이면 직선(평행), 음수이면 시계방향
## 삼각형의 면적
```bash
        | x1 y1 1 |
2 * S = | x2 y2 1 | = (x2 - x1)(y3 - y1) - (y2 - y1)(x3 - x1)
        | x3 y3 1 |
```
## 코드
```js
const CCW = (x1, y1, x2, y2, x3, y3) => {
  const tmp = x2*y3 - x2*y1 - x1*y3 + x1*y1 - (y2*x3 - y1*x3 - y2*x1 + x1*y1);
  if(tmp > 0) {
    return 1;
  }
  if(tmp < 0) {
    return -1;
  }
  return 0;
}
```