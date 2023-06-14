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