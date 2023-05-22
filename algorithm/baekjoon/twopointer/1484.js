// https://www.acmicpc.net/problem/1484
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `100000`;
const G = Number(input);
console.log(solution(G));

function solution(G) {
  const result = [];
  let left = 1;
  let right = 2;

  while(left < right) {
    const res = (right ** 2) - (left ** 2);
    if(res === G) {
      result.push(right++);
    } else {
      if(res < G) {
        right++;
      } else {
        left++;
      }
    }
  }

  return result.length === 0 ? -1 : result.join('\n');
}