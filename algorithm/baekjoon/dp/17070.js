// https://www.acmicpc.net/problem/17070
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `6
0 0 0 0 0 0
0 1 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0`;
const [n, ...data] = input.split`\n`
console.log(solution(+n, data.map(e => e.split` `.map(Number))));

function solution(n, data) {
  const dp = Array.from({length: n}, () => Array.from({length: n}, () => Array(3).fill(0)));
  if(data[0][1] === 1) return 0;
  dp[0][1][0] = 1;

  for(let i = 2; i < n; i++) {
    if(data[0][i] === 1) continue;
    dp[0][i][0] = dp[0][i - 1][0];
  }

  for(let i = 1; i < n; i++) {
    for(let j = 1 ; j < n; j++) {
      if(data[i][j] === 1) continue;
      dp[i][j][0] = dp[i][j - 1][0] + dp[i][j - 1][2];
      dp[i][j][1] = dp[i - 1][j][1] + dp[i - 1][j][2];
      if(data[i][j - 1] === 0 && data[i - 1][j] === 0) {
        dp[i][j][2] = dp[i - 1][j - 1][0] + dp[i - 1][j - 1][1] + dp[i - 1][j - 1][2];
      }
    }
  }

  return dp[n - 1][n - 1].reduce((prev, cur) => prev + cur, 0);
}