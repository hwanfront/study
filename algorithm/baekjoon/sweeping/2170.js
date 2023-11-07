// https://www.acmicpc.net/problem/2170
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `4
1 3
2 5
3 5
6 7`;
const [n, ...data] = input.split`\n`;
console.log(solution(+n, data.map(e => e.split` `.map(Number))));

function solution(n, data) {
  data.sort((a, b) => a[0] - b[0]);
  let left = null;
  let right = null;
  let sum = 0;

  for(let i = 0; i < n; i++) {
    const [from, to] = data[i];
    if(left === null && right === null) {
      left = from;
      right = to;
      continue;
    }
    if(from <= right) {
      right = Math.max(right, to);
    } else {
      sum += right - left;
      left = from;
      right = to;
    }
  }

  return sum + right - left;
}