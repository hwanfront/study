// https://www.acmicpc.net/problem/6198
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `8
8
6
4
3
5
4
3
7`;
const [n, ...h] = input.split('\n').map(Number);
console.log(solution(n, h));

function solution (n, h) {
  const stack = [];
  let result = 0;

  for(let i = 0; i < n; i++) {
    if(stack.length === 0) {
      stack.push(h[i]);
      continue;
    }

    while(1) {
      if(stack.length === 0) break;
      if(stack[stack.length - 1] > h[i]) break;
      stack.pop();
    }
    result += stack.length;
    stack.push(h[i]);
  }

  return result;
}
