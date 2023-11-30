// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `3 4
2000
0012
0001`;
const [NM, ...data] = input.split`\n`;
console.log(solution(NM.split` `.map(Number), data.map(e => e.split``.map(Number))));

function solution([N, M], data) {
  const len = 1 << (N * M);
  let result = 0;

  for(let i = 0; i < len; i++) {
    let sum = 0;
    for(let y = 0; y < N; y++) {
      let tmp = 0;
      for(let x = 0; x < M; x++) {
        if((i & (1 << (y * M + x))) === 0) {
          tmp = tmp * 10 + data[y][x];
        } else {
          sum += tmp;
          tmp = 0;
        }
      }
      sum += tmp;
    }
    for(let x = 0; x < M; x++) {
      let tmp = 0;
      for(let y = 0; y < N; y++) {
        if((i & (1 << (y * M + x))) === 0) {
          sum += tmp;
          tmp = 0;
        } else {
          tmp = tmp * 10 + data[y][x];
        }
      }
      sum += tmp;
    }
    result = Math.max(result, sum);
  }
  return result;
}