// https://www.acmicpc.net/problem/2631
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `2
2
1`;
const [n, ...data] = input.split('\n').map(Number);
console.log(solution(n, data));

function solution (n, data) {
  const dp = Array(n ).fill(0);
  dp[0] = 1;

  for(let i = 1; i < n; i++) {
    dp[i] = 1;
    for(let j = 0; j < i; j++) {
      if(data[i] > data[j] && dp[i] < dp[j] + 1) {
        dp[i] = dp[j] + 1;
      }
    }
  }
  const max = Math.max(...dp);
  return n - max;
}