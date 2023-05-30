// https://www.acmicpc.net/problem/9471
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5
1 4
2 5
3 11
4 123456
5 987654`;
const [P, ...arr] = input.split('\n');
console.log(solution(Number(P), arr.map(e => e.split(' ').map(Number))));

function solution(P, c) {
  const result = [];
  for(const [N, M] of c) {
    let cnt = 0;
    let a = 0;
    let b = 1;
    while(1) {
      const temp = a;
      a = b;
      b = (temp + a) % M;
      cnt++
      if(a === 0 && b === 1) {
        result.push(`${N} ${cnt}`);
        break;
      }
    }
  }
  return result.join('\n');
}
