// https://www.acmicpc.net/problem/2839
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString();
const sugar = Number(input);
console.log(solution(sugar));

function solution(sugar) {
  let weight = sugar;
  let cnt = 0;

  while(weight >= 0) {
    if(weight % 5 === 0) return cnt + weight / 5;
    weight -= 3;
    cnt++;
  }
  return -1;
}
