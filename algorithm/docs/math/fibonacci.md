# 피보나치
- f(0) = 0
- f(1) = 1
- f(n) = f(n-1) + f(n-2)
```js
const fibo = (n) => {
  if(n === 0) return 0
  if(2 < n) return fibo(n - 1) + fibo(n);
  return 1;
}
```
## 피사노 주기
- 피보나치 수를 어떤 수 K로 나누었을 때, 나눈 나머지는 항상 주기를 가지게 됨.
### 특징
- 주기의 길이가 P 일 때, N번째 피보나치 수를 M으로 나눈 나머지는 (N % P)번째 피보나치 수를 M으로 나눈 나머지와 같다.
- 10^k (k > 2) 일 때, 항상 15 * 10^(k-1)이다.
### 문제
- https://www.acmicpc.net/problem/9471
## 도가뉴 항등식 d'Ocgane's identity
- f(m + n) = f(m-1)f(n) + f(m)f(n+1)
- f(2n) = f(n) * (f(n) + 2f(n-1))
- f(2n - 1) = f(n) ** 2 + f(n-1) ** 2​
