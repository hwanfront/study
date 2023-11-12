/**
 * 1. LIS의 길이와 그 부분수열을 구하는 문제
 * 2. LIS의 길이를 구하는 코드에서 응용해 부분수열을 구함
 */

// https://www.acmicpc.net/problem/14002
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `6
10 20 10 30 20 50`;
const [N, A] = input.split('\n');
console.log(solution(Number(N), A.split(' ').map(Number)));

function solution (N, numbers) {
  const dp = Array(N).fill(null);
  const result = [];
  const graph = Array(N).fill(-1);
  let maxLen = 0;
  let idx = -1;

  const LIS = (n, dp) => {
    for(let i = 0; i < n; i++) {
      dp[i] = 1;
      for(let j = 0; j < i; j++) {
        if(numbers[j] < numbers[i] && dp[i] < dp[j] + 1) {
          dp[i] = dp[j] + 1;
          graph[i] = j;
        }
      }
      if(dp[i] > maxLen) {
        maxLen = dp[i];
        idx = i;
      }
    }
  }

  LIS(N, dp);

  for(let i = idx; i !== -1; i = graph[i]) {
    result.push(numbers[i]);
  }

  result.reverse();
  return `${maxLen}\n${result.join(' ')}`;
}