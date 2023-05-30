// https://www.acmicpc.net/problem/2749
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `1000`;
const NUM = '1000000';
const LEN = '1500000';
console.log(solution(input));

function solution(n) {
  const num = Number(BigInt(n) % BigInt(LEN));
  const arr = Array(num + 1).fill(0);
  arr[1] = 1;
  for(let i = 2; i < num + 1; i++) {
    arr[i] = (arr[i - 1] + arr[i - 2]) % NUM;
  }  
  return arr[num];
}
