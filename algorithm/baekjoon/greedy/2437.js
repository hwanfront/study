// https://www.acmicpc.net/problem/2437
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `7
3 1 6 2 7 30 1`;
const [N, data] = input.split('\n');
console.log(solution(+N, data.split(' ').map(Number)));

function solution (N, data) {
  data.sort((a, b) => a - b);
  let sum = 0;

  if(data[0] > 1) return 1;
  sum += data[0];

  for(let i = 1; i < data.length; i++) {
    if(sum <= data[i] - 2) return sum + 1;
    sum += data[i];
  }
  
  return sum + 1;
}