// https://www.acmicpc.net/problem/1744
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const numbers = input.split('\n').map(Number);
const N = numbers.shift();
console.log(solution(N, numbers));

function solution(N, numbers) {
  const plus = [];
  const minus = [];
  let result = 0;

  numbers.forEach((number) => {
    if(number <= 0) {
      return minus.push(number);
    }
    if(number > 1) {
      return plus.push(number);
    }
    if(number === 1) {
      return result += number;
    }
  })

  plus.sort((a, b) => b - a);
  minus.sort((a, b) => a - b);

  for(let i = 0; i < plus.length; i += 2) {
    if(i < plus.length - 1) {
      result += plus[i] * plus[i + 1];
      continue;
    }
    result += plus[i];
  }

  for(let i = 0; i < minus.length; i += 2) {
    if(i < minus.length - 1) {
      result += minus[i] * minus[i + 1];
      continue;
    }
    result += minus[i]
  }
  return result;
}
