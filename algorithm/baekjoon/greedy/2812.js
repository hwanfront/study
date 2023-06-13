// https://www.acmicpc.net/problem/2812
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `10 4
4177252841`;
const [first, number] = input.split('\n');
const [N, K] = first.split(' ');

console.log(solution(Number(K), number));

function solution(K, number) {
  const stack = [];
  let k = K;

  for(let i = 0; i < number.length; i++) {
    while(k > 0 && stack[stack.length - 1] < Number(number[i])) {
      stack.pop();
      k--;
    }
    stack.push(Number(number[i]));
  }

  if(k > 0) {
    stack.splice(stack.length - k, k);
  }

  return stack.join('');
}
