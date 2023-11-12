// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `2 1
1
2`;
const [nk, ...data] = input.split`\n`;
console.log(solution(nk.split` `.map(Number), data.map(Number)));

function solution([n, k], data) {
  const dp = Array(k + 1).fill(Number.MAX_SAFE_INTEGER);
  for(const num of data) {
    dp[num] = 1;
    for(let i = num + 1; i <= k; i++) {
      if(i % num !== 0) {
        if(dp[i - num] === Number.MAX_SAFE_INTEGER) continue;
        dp[i] = Math.min(dp[i], dp[i - num] + 1);
        continue;
      } 
      if(dp[i - num] === Number.MAX_SAFE_INTEGER) dp[i] = Math.min(dp[i], i / num);
      else dp[i] = Math.min(dp[i], dp[i - num] + 1);
    }
  }
  return dp[k] === Number.MAX_SAFE_INTEGER ? -1 : dp[k];
}