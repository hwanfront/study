// https://www.acmicpc.net/problem/11404
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5
1
1 2 2`;
const [N, M, ...arr] = input.split('\n');
console.log(solution(N, arr));

function solution(N, arr) {
  const d = [];
  for(let i = 0; i < N; i++) {
    const a = [];
    for(let j = 0; j < N; j++) {
      if(i === j) a.push(0);
      else a.push(Infinity);
    }
    d.push(a);
  }

  for(const [a, b, c] of arr.map(e => e.split(' ').map(Number))) {
    d[a - 1][b - 1] = Math.min(d[a - 1][b - 1], c);
  }

  for(let k = 0; k < N; k++) {
    for(let i = 0; i < N; i++) {
      for(let j = 0; j < N; j++) {
        if(d[i][j] > d[i][k] + d[k][j]) {
          d[i][j] = d[i][k] + d[k][j];
        }
      } 
    }
  }

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      if(d[i][j] === Infinity) {
        d[i][j] = 0
      }
    } 
  }
  
  return d.map(e => e.join(' ')).join('\n');
}
