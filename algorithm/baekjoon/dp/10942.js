// https://www.acmicpc.net/problem/10942
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `7
1 2 1 3 1 2 1
4
1 3
2 5
3 3
5 7`;
const [n, nn, m, ...ms] = input.split`\n`;

console.log(solution(+n, (`-1 ` + nn).split` `.map(Number), +m, ms.map(e => e.split` `.map(Number))));

function solution(n, nn, m, ms) {
  const dp = Array.from({length: n + 1}, () => Array(n + 1).fill(0));
  const result = [];
  for(let i = 1; i <= n; i++) {
    dp[i][i] = 1;
    if(i === 1) continue;
    if(nn[i - 1] === nn[i]) dp[i - 1][i] = 1;
  }
  for(let i = 2; i < n; i++) {
    for(let j = 1; i + j <= n; j++) {
      if(nn[i + j] !== nn[j]) continue;
      if(dp[j + 1][i + j - 1]) {
        dp[j][i + j] = 1;
      }
    }
  }
  for(const [a, b] of ms) {
    result.push(dp[Math.min(a, b)][Math.max(a, b)]);
  }
  return result.join('\n')
}