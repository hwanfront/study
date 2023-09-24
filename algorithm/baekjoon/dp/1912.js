// https://www.acmicpc.net/problem/1912
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `10
10 -4 3 1 5 6 -35 12 21 -1`;
const [n, data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(n, data));

function solution (n, dp) {
  for(let i = 1; i < n; i++) {
    if(dp[i - 1] < 0) continue;
    if(dp[i] + dp[i - 1] > 0) dp[i] += dp[i - 1];
  }
  console.log(dp);
  return Math.max(...dp);
}