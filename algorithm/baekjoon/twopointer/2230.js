// https://www.acmicpc.net/problem/2230
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const [NM, ...nums] = input.split('\n');
const [N, M] = NM.split(' ');
const numbers = nums.map(Number);
console.log(solution(numbers, Number(M)));

function solution(numbers, M) {
  numbers.sort((a, b) => a - b);
  let near = Number.MAX_SAFE_INTEGER;
  let start = 0;
  let end = 0;

  while(start <= end && end < numbers.length) {
    const diff = Math.abs(numbers[end] - numbers[start]);
    if(diff < M) {
      end++;
    } else {
      start++;
      near = Math.min(diff, near);
    }

    if(near === M) {
      return M;
    }
  }

  return near;
}