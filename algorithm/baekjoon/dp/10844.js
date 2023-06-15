// https://www.acmicpc.net/problem/10844
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3`
const n = Number(input);
const MODULER = 1_000_000_000;
console.log(solution(n));

function solution (n) {
  const dp = Array.from({ length: n + 1 }, () => Array(10).fill(0));
  for(let i = 1; i < 10; i++) {
    dp[1][i] = 1;
  }

  for(let i = 2; i < n + 1; i++) {
    for(let j = 0; j < 10; j++) {
      if(j === 0) {
        dp[i][j] = dp[i - 1][j + 1] % MODULER;
        continue;
      }
      if(j === 9) {
        dp[i][j] = dp[i - 1][j - 1] % MODULER;
        continue;
      }
      dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % MODULER;
    }
  }
  return dp[n].reduce((prev, curr) => prev + curr, 0) % MODULER;
}