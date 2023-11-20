// https://www.acmicpc.net/problem/11049
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `3
5 3
3 2
2 6`;
const [n, ...data] = input.split`\n`
console.log(solution(+n, data.map(e => e.split` `.map(Number))));

function solution(n, data) {
  const dp = Array.from({length: n + 2}, () => Array(n + 1).fill(0));

  for(let size = 1; size < n; size++) {
    for(let start = 1; start + size <= n; start++) {
      const end = start + size;
      dp[start][end] = Number.MAX_SAFE_INTEGER;
      for(let mid = start; mid <= end; mid++) {
        dp[start][end] = Math.min(
          dp[start][end], 
          dp[start][mid] + dp[mid + 1][end] + (data[start - 1][0] * data[mid - 1][1] * data[end - 1][1])
        )
      }
    }
  }

  return dp[1][n];
}
