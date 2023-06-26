# euclidean algorithm 유클리드 호제법
## 의미
- 두 수의 최대공약수를 구하는 알고리즘
- 시간복잡도는 O(max(loga, logb)) 이다
## 동작
- b가 0이 아니면 `b`와 `a % b`에 대해서 다시 수행한다.
- b가 0이면 a를 반환한다.
## 코드
```js
const GCD = (a, b) => b ? GCD(b, a % b) : a;
```
# bezout's identity 베주 항등식
## 의미
- GCD(a, b) = c 이라고 할 때,
  - ax + by = c 를 만족하는 정수 x, y가 존재한다.
  - c 는 정수 x, y 에 대하여 ax + by 로 표현할 수 있는 가장 작은 정수이다.
  - ax + by 로 표현될 수 있는 모든 정수는 c의 배수이다. 
# extended euclidean algorithm 확장 유클리드 호제법
## 의미
- 정수해를 갖는 부정 방정식 ax + by = c가 주어지면 이 방정식을 만족하는 (x, y) 값을 구할 수 있다,
- c가 GCD(a, b)의 배수가 아니라면 해가 존재하지 않는다.
## 점화식
- 유클리드 호제법은 r(i + 1) = 0 일 때 종료된다.
```bash
r(i + 1) = r(i - 1) - r(i)q(i)
r(i) = s(i)a + t(i)b
아래를 위에 대입 후 점화식을 구하면
s(i + 1) = s(i - 1) - s(i)q(i)
t(i + 1) = t(i - 1) - t(i)q(i)
```
## 코드
```js
const exEuclid = (a, b) => {
  const r = [a, b];
  const s = [1, 0];
  const t = [0, 1];
  let tmp = 0;
  let q = 0;
  while(r[1] > 0) {
    q = Math.floor(r[0] / r[1]);
    tmp = r[0];
    r[0] = r[1];
    r[1] = tmp - r[1] * q;
    tmp = s[0];
    s[0] = s[1];
    s[1] = tmp - s[1] * q;
    tmp = t[0];
    t[0] = t[1];
    t[1] = tmp - t[1] * q;
  }
  return r[0];
}
```