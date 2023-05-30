// https://www.acmicpc.net/problem/2166
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4
0 0
0 10
10 10
10 0`;
const [N, ...arr] = input.split('\n')
console.log(solution(arr.map(e => e.split(' ').map(Number))));

function solution(arr) {
  arr.push(arr[0]);
  let sum = 0;
  for(let i = 1 ; i < arr.length; i++) {
    const [x1, y1] = arr[i];
    const [x2, y2] = arr[i - 1];
    sum += x1 * y2 - x2 * y1;
  }
  return Math.abs(sum / 2).toFixed(1);
}
