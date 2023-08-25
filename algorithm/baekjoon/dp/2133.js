// https://www.acmicpc.net/problem/
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
/**
 * 12 11 11
 * 12 22 23
 * 33 33 23
 * 
 * 1122 1224
 * 3446 1334
 * 3556 5566
 * 
 * 112233 1122 33
 * 455669 4557 89
 * 477889 4667 89
 * 
 * a = 1, dp2 = 3
 * dp4 = (3 * 3) + 2
 * dp4 = (dp2 * 3) + (a * 2) = 11
 * dp6 = (dp2 * 3 * 3) + (2 * 2 * 3) + 2
 * dp6 = (dp2 * 3 * 3) + (2 * 3) + (2 * 3) + 2
 * dp6 = (dp4 * 3) + (dp2 * 2) + (a * 2) = 41
 */

const input = `30`;

console.log(solution(+input));

function solution (N) {
  const dp = Array(N + 1).fill(0);
  dp[0] = 1;
  dp[2] = 3;
  for(let i = 4; i <= N; i += 2) {
    dp[i] += dp[i - 2] * 3;
    for(let j = i - 4; j >= 0; j -= 2) {
      dp[i] += dp[j] * 2;
    }
  }

  return dp[N];
}
