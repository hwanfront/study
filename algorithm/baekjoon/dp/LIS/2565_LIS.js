// Longest Increasing Subsequence
// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `8
1 8
3 9
2 2
4 1
6 4
10 10
9 7
7 6`;
const [n, ...abs] = input.split`\n`;
console.log(solution(+n, abs.map(e => e.split` `.map(Number))));

function solution(n, abs) {
  const dp = Array(n).fill(0);
  let result = 0;
  abs.sort((a, b) => a[0] - b[0]);

  for(let i = 0; i < n; i++) {
    dp[i] = 1;
    for(let j = 0; j < i; j++) {
      if(abs[i][1] > abs[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    result = Math.max(result, dp[i]);
  }
  return n - result;
}