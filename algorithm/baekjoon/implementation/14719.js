// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `9 9
0 0 0 2 0 0 0 0 0`;
const [hw, b] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(hw, b));

function solution([h, w], bb) {
  let stack = [];
  let result = 0;
  
  for(const b of bb) {
    if(stack.length === 0) {
      stack.push(b);
      continue;
    }
    if(stack[0] <= b) {
      const min = Math.min(stack[0], b);
      for(let i = 1; i < stack.length; i++) {
        result += min - stack[i];
      }
      stack = [b];
    } else {
      stack.push(b);
    }
  }

  for(let i = 1; i < stack.length - 1; i++) {
    let left = stack[0];
    let right = stack[stack.length - 1];
    for(let j = 1; j < i; j++) {
      left = Math.max(left, stack[j]);
    }
    for(let j = i + 1; j < stack.length - 1; j++) {
      right = Math.max(right, stack[j]);
    }
    const min = Math.min(left, right);
    if(min > stack[i]) result += (min - stack[i]);
  }

  return result;
}