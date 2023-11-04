// https://www.acmicpc.net/problem/2225
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `6 4`;
const MOD = 1_000_000_000;

console.log(solution(input.split` `.map(Number)));

function solution([n, k]) {
  const dp = Array.from({length: n + 1}, () => Array(k + 1).fill(0));
  for(let i = 1; i <= n; i++) {
    dp[i][1] = 1;
  }
  for(let i = 1; i <= k; i++) {
    dp[1][i] = i;
  }

  for(let i = 2; i <= n; i++) {
    for(let j = 2; j <= k; j++) {
      dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
    }
  }
  return dp[n][k];
}