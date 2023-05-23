// https://www.acmicpc.net/problem/2493
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5
6 9 5 7 4`;
const [N, n] = input.split('\n');
const numbers = n.split(' ').map(Number);
console.log(solution(Number(N), numbers));

function solution(N, numbers) {
  const stack = [];
  const res = [];

  stack.push({ idx: 1, value: numbers[0] });
  res.push(0);

  for(let i = 1; i < numbers.length; i++) {
    if(stack[stack.length - 1].value < numbers[i]) {
      while(stack.length) {
        if(stack[stack.length - 1].value >= numbers[i]) {
          break;
        }
        stack.pop();
      }
    }
    res.push(stack.length > 0 ? stack[stack.length - 1].idx : 0);
    stack.push({idx: i + 1, value: numbers[i]});
  }

  return res.join(' ');
}