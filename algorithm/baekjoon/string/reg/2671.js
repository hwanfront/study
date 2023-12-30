// https://www.acmicpc.net/problem/2671
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `100000000001101`;
console.log(solution(input));

function solution (data) {
  const reg = new RegExp(/^(100+1+|01)+$/);
  return data.match(reg) ? 'SUBMARINE' : 'NOISE';
}