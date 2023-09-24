// https://www.acmicpc.net/problem/11726
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `1000`;
console.log(solution(+input));

function solution (n) {
  const dp = Array(n + 1).fill(0n);
  const MOD = 10007n;
  dp[0] = 1n;
  dp[1] = 1n;
  for(let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return Number(dp[n] % MOD);
}