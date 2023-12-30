// https://www.acmicpc.net/problem/1013
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `3
10010111
011000100110001
0110001011001`;
const [, ...data] = input.split`\n`;
console.log(solution(data));

function solution (data) {
  const result = [];
  const reg = new RegExp(/^(100+1+|01)+$/);
  for(const str of data) {
    if(str.match(reg)) result.push`YES`;
    else result.push`NO`
  }
  return result.join`\n`;
}