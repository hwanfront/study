// https://www.acmicpc.net/problem/
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `5
0 6 15 2 6
6 0 9 8 12
15 9 0 16 18
2 8 16 0 4
6 12 18 4 0`;
const [N, ...data] = input.split('\n');
console.log(solution(+N, data.map(e => e.split(' ').map(Number))));

function solution (N, nums) {
  const arr = Array.from({length: N}, () => Array(N).fill(true));
  let sum = 0;
  for(let k = 0; k < N; k++) {
    for(let i = 0; i < N; i++) {
      for(let j = 0; j < N; j++) {
        if(i === k || j === k) continue;
        if(nums[i][j] === nums[i][k] + nums[k][j]) {
          arr[i][j] = false;
          continue;
        }
        if(nums[i][j] > nums[i][k] + nums[k][j]) {
          return -1;
        }
      }
    }
  }
  
  for(let i = 0; i < N; i++) {
    for(let j = i; j < N; j++) {
      if(!arr[i][j]) continue;
      sum += nums[i][j];
    }
  }

  return sum;
}