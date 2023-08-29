// https://www.acmicpc.net/problem/22862
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `10 3
1 2 3 4 5 6 7 8 9 10`;
const [SN, nums] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(SN, nums)); 

function solution ([S, N], nums) {
  let result = 0;
  let l = 0;
  let r = 0;
  let cnt = 0;
  for(; r < S; r++) {
    if(nums[r] % 2 === 1) {
      cnt++;
      if(cnt > N) {
        while(1) {
          if(nums[l++] % 2 === 1) break;
        }
        cnt--;
      }
    } else {
      result = Math.max(result, (r + 1 - l) - cnt);
    }
  }
  return result;
}