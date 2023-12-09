// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `210`;
console.log(solution(input));

function solution(n) {
  if(n[0] === '0') return 0;
  if(n.length === 1) return 1;
  const dp = Array(n.length + 1).fill(0);
  const MOD = 1_000_000;
  dp[0] = 1;
  dp[1] = 1;
  for(let i = 2; i <= n.length; i++) {
    const tmp = +(n[i - 2] + n[i - 1]);
    if(n[i - 1] !== '0') {
      dp[i] = dp[i - 1];
    }

    if(9 < tmp && tmp <= 26) {
      dp[i] = (dp[i] + dp[i - 2]) % MOD;
    }
  }
  return dp[n.length];
}