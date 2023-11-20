// https://www.acmicpc.net/problem/1911
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `3 3
1 5
13 17
8 12`;
const [NL, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(NL, data))

function solution([N, L], data) {
  data.sort((a, b) => a[0] - b[0]);
  let result = 0;
  let cur = 0;

  for(const [from, to] of data) {
    if(cur < from) cur = from;
    while(1) {
      if(cur >= to) break;
      cur += L;
      result++;
    }
  }

  return result;
}