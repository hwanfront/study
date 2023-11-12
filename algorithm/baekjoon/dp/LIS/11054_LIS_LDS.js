/**
 * 1. LIS의 길이와 LDS의 길이만을 구하여 바이토닉 길이를 구하는 문제
 * 2. 바이토닉이란 한 원소를 기준으로 왼쪽으로는 LIS, 오른쪽으로는 LDS 길이를 구했을 때
 *    둘을 합친 경우를 바이토닉 부분수열이라고 함
 * 3. 좌에서 우로 LIS, 우에서 좌로 LDS 길이를 각각 구한 후 각 자릿수의 합 중에서 가장 큰
 *    값이 가장 긴 바이토닉 부분 수열
 */

// https://www.acmicpc.net/problem/11054
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `10
1 5 2 1 4 3 4 5 2 1`
const [N, A] = input.split('\n');
console.log(solution(Number(N), A.split(' ').map(Number)));

function solution (N, numbers) {
  let result = 0;
  const rdp = Array(N).fill(null);
  const ldp = Array(N).fill(null);

  const LIS = (n, dp) => { 
    if(dp[n] === null) {
      dp[n] = 1;

      for(let i = n - 1; i >= 0; i--) {
        if(numbers[i] < numbers[n]) {
          dp[n] = Math.max(dp[n], LIS(i, dp) + 1);
        }
      }
    }
    return dp[n];
  }

  const LDS = (n, dp) => { 
    if(dp[n] === null) {
      dp[n] = 1;

      for(let i = n + 1; i < dp.length; i++) {
        if(numbers[i] < numbers[n]) {
          dp[n] = Math.max(dp[n], LDS(i, dp) + 1);
        }
      }
    }
    return dp[n];
  }


  for(let i = 0; i < N; i++) {
    LIS(i, rdp);
    LDS(i, ldp);
  }
  rdp.forEach((e, i) => {
    result = Math.max(result, e + ldp[i])
  })

  return result - 1;
}