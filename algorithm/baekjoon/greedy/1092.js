// https://www.acmicpc.net/problem/
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3
10 7 4
9
9 9 8 7 6 6 5 5 2`;
const [N, c, M, b] = input.split('\n');
console.log(solution(+N, c.split(' ').map(Number), +M, b.split(' ').map(Number)));

function solution (N, c, M, b) {
  c.sort((a, b) => a - b);
  b.sort((a, b) => a - b);
  let result = 0;

  if(c[c.length - 1] < b[b.length - 1]) return -1;

  while(b.length > 0) {
    result++;
    for(let i = 0; i < N; i++) {
      for(let j = b.length - 1; j >= 0; j--) {
        if(c[i] >= b[j]) {
          b.splice(j, 1)
          break;
        }
      }
    }
  }

  return result;
}