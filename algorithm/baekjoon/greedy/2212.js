// https://www.acmicpc.net/problem/2212
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `7
3
1 2 3 4 6 7 8`;
const [N, K, nums] = input.split('\n');
console.log(solution(+N, +K, nums.split(' ').map(Number)));

function solution (N, K, data) {
  data.sort((a, b) => a - b);

  for(let i = data.length - 1; i > 0; i--) {
    data[i] -= data[i - 1];
  }
  data.shift();

  data.sort((a, b) => a - b);

  return data.slice(0, N - K).reduce((pre, cur) => pre + cur, 0);
}