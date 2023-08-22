// https://www.acmicpc.net/problem/7570
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5
1 3 2 5 4`;
const [n, nums] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(n[0], nums));

function solution (n, nums) {
  const dp = Array(n + 1).fill(0);
  let max = 0;

  for(let i = 0; i < n; i++) {
    const num = nums[i];
    dp[num] = dp[num - 1] + 1;
    max = Math.max(dp[num], max);
  }

  return n - max;
}