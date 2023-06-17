# knapsack 배낭 채우기
- 무게 한도가 정해진 배낭에 짐을 싣는 경우 짐의 가격 최대 값 찾기
- 모든 경우의 수를 넣는다면(BruteForce) O(2**n)의 시간복잡도를 가짐
- 가치가 가장 높은 보석부터 먼저 넣어도(Greedy) 최적의 답을 보장받지 못함
## 점화식
```bash
if wi > w: p[i, w] = p[i - 1, w]
else: p[i, w] = max(p[i - 1, w - wi] + value, p[i - 1, w])
```
## 코드
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