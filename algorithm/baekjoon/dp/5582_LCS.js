// https://www.acmicpc.net/problem/5582
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `UPWJCIRUCAXIIRGL
SBQNYBSBZDFNEV`;
const [a, b] = input.split('\n');
console.log(solution(a, b));

function solution (a, b) {
  let result = 0;
  const dp = Array(a.length).fill(0);
  for(const s of b) {
    for(let i = a.length - 1; i >= 0; i--) {
      if(i === 0 && s === a[i]) {
        dp[i] = 1;
        result = Math.max(dp[i], result);
        continue;
      } 
      if(s === a[i]) dp[i] = dp[i - 1] + 1;
      else dp[i] = 0;
      result = Math.max(dp[i], result);
    }
  }
  return result;
}