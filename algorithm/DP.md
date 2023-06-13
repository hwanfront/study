# 동적 계획법
## 의미
- 문제를 풀기 위해 여러 개의 작은 문제로 쪼개서 그 값들의 합으로 최종 결과를 구하는 것
- 문제를 표현할 때 점화식으로 표현할 수 있음
- 이전에 계산해둔 값을 `memoization`하여 반복작업을 줄임
## 특징
- 수학적으로 점화식을 찾아내야 함
## fibonacci 피보나치
- f(0) = 0, f(1) = 1, f(2) = 2, f(3) = 3, f(4) = 5
- 단순히 재귀로 푸는 경우 O(2**n)의 시간복잡도를 가짐 => 구해야 할 수가 늘어날수록 시간이 급격하게 오래걸림
### 점화식
- f(n) = f(n - 1) + f(n - 2)
### 코드
```js
const dp = Array(n + 1).fill(0);
const fibo = (n) => {
  dp[1] = 1;
  for(let i = ; i < n + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n]
}
```
### knapsack 배낭 채우기
- 무게 한도가 정해진 배낭에 짐을 싣는 경우 짐의 가격 최대 값 찾기
- 모든 경우의 수를 넣는다면(BruteForce) O(2**n)의 시간복잡도를 가짐
- 가치가 가장 높은 보석부터 먼저 넣어도(Greedy) 최적의 답을 보장받지 못함
### 점화식
```bash
if wi > w: p[i, w] = p[i - 1, w]
else: p[i, w] = max(p[i - 1, w - wi] + value, p[i - 1, w])
```
### 코드
```js
const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));

for(let i = 1; i < n + 1; i++) {
  for(let j = 1; j < k + 1; j++) {
    const [w, v] = data[i - 1];
    if(w > j) {
      dp[i][j] = dp[i - 1][j];
      continue;
    }
    dp[i][j] = Math.max(dp[i - 1][j], v + dp[i - 1][j - w]);
  }
}
```