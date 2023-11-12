// https://www.acmicpc.net/problem/12865
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const [NK, ...data] = input.split('\n');
const [N, K] = NK.split(' ').map(Number);
console.log(solution(N, K, data.map(e => e.split(' ').map(Number))));

function solution (n, k, data) {
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
  
  return dp[N][k];
}