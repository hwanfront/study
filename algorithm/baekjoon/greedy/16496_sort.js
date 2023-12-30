// https://www.acmicpc.net/problem/16496
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `5
0 0 0 0 1`;
const [n, data] = input.split`\n`;
console.log(solution(+n, data.split` `));

function solution(n, data) {
  data.sort((a, b) => Number(b + a) - Number(a + b));
  return BigInt(data.join``) + '';
}