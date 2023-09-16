// https://www.acmicpc.net/problem/2352
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

// const input = `4
// 1 -1 -1
// 2 3 1
// 3 4 -1
// 4 -1 -1`;

const input = `6
4 2 6 3 1 5`;
const [n, data] = input.split('\n');
console.log(solution(+n, data.split(' ').map(Number)));

function solution (n, nums) {
  const result = [];
  const bs = (s, e, t) => {
    while(s < e) {
      const mid = Math.floor((s + e) / 2);
      if(result[mid] < t) {
        s = mid + 1;
      } else {
        e = mid;
      }
    }
    return s;
  }

  const LIS = () => {
    result.push(nums[0]);
    for(let i = 1; i < n; i++) {
      if(nums[i] > result.at(-1)) {
        result.push(nums[i]) 
        continue;
      }
      const idx = bs(0, result.length - 1, nums[i]);
      result[idx] = nums[i];
    }
  }

  LIS();

  return result.length;
}