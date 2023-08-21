// https://www.acmicpc.net/problem/17298
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `6
9 5 4 8 7 10`;
const [N, A] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(N[0], A));

function solution (N, A) {
  const stack = [];
  const result = Array(N).fill(-1);
  for(let i = 0; i < N; i++) {
    if(stack.length === 0) {
      stack.push([i, A[i]]);
      continue;
    }

    while(1) {
      if(stack.length === 0) break;
      if(stack[stack.length - 1][1] < A[i]) {
        const [idx, value] = stack.pop();
        result[idx] = A[i];
      } else {
        break;
      }
    }
    stack.push([i, A[i]]);
  }
  return result.join(' ');
}