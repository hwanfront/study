# binomial coefficient 이항 계수
## 정의
- 자연수 n 및 정수 k가 주어졌을 때 이항 계수는 다음과 같다.
```bash
          n! / (k!(n - k)!)   (0 <= k <= n)
C(n, k) = 0                   (k < 0)
          0                   (k > n)
```
- 이항 계수의 값들을 삼각형 모양으로 나열한 것을 파스칼 삼각형이라고 한다.
## 파스칼 삼각형과 dp table
- 시간복잡도 O(n ** 2)
- n과 r이 충분히 작다면 사용
- `nCr = n-1Cr-1 + n-1Cr`
```js
for(let i = 1; i <= n; i++) {
  for(let j = 0; j <= i; j++) {
    if(j === 0 || j === i) {
      dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % MODULAR;
    }
  }
}
```
## 페르마의 소정리
- 시간복잡도 O(nlogp), O(n + logp), O(n)
- n이 10000보다 커진다면 파스칼의 삼각형을 이용하는 방식은 사용하기 어려워진다.
- `nCr = n!/(r!(n - r)!)`
- 페르마의 소정리인 `a ** (p−1) ≡ 1 ( mod p )`를 이용
  - `a ** (p-2) ≡ a ** (-1) ( mod p )`와 같음
  - a의 `mod p` 에 대한 곱셈의 역원은 `a ** (p-2)`
- `mod p`에 대해서 `r!(n-r)!`을 나누는 게 아니라 `(r!(n-r)!) ** (p-2)`을 곱하는 방식
- a ** n 을 구하는 데 걸리는 시간은 빠른 거듭제곱 알고리즘을 통해 O(logn)으로 줄일 수 있다.
```js
const pow = (x, y) => {
  let result = 1n;
  let a = x;
  while(y) {
    if(y & 1) { 
      result = (result * a) % MODULAR;
    }
    a = (a * a) % MODULAR;
    y = Number(y) >> 1;
  }
  return result;
}

const factorial = (from, to) => {
  let result = 1n;
  for(let i = from; i <= to; i++) {
    result = (result * i) % MODULAR;
  }
  return result;
}

let a = factorial(N - K + 1n, N);
let b = factorial(1n, K);

console.log(Number(a * pow(b, Number(MODULAR - 2n)) % MODULAR));
```
# 뤼카의 정리
- n이 크고 p가 작은 경우 O(n)보다 빠른 O(p)만에 구할 수 있다.