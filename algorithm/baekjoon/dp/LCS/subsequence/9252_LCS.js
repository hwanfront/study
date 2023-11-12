// Longest Common Subsequence 최장 공통 부분수열
// https://www.acmicpc.net/problem/9252
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `ACAYKP
CAPCAK`;
const [a, b] = input.split`\n`
console.log(solution(a, b));

function solution(a, b) {
  const dp = Array.from({length: a.length + 1}, () => Array(b.length + 1).fill(0));
  const lcs = [];
  
  for(let i = 1; i <= a.length; i++) {
    for(let j = 1; j <= b.length; j++) {
      if(a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const go = (y, x) => {
    if(dp[y][x] === 0) return;
    if(a[y - 1] === b[x - 1]) {
      go(y - 1, x - 1);
      lcs.push(a[y - 1]);
    } else {
      if(dp[y - 1][x] > dp[y][x - 1]) {
        go(y - 1, x);
      } else {
        go(y, x - 1);
      }
    }
  }

  go(a.length, b.length);
  
  return dp[a.length][b.length] === 0 ? 0 : `${dp[a.length][b.length]}\n${lcs.join('')}`;
}