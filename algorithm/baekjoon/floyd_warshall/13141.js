// https://www.acmicpc.net/problem/13141
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 10
1 2 1
2 3 1
3 4 1
4 5 1
1 3 10
2 4 10
3 5 10
1 4 7
2 5 7
1 5 9`;
const [NM, ...data] = input.split('\n');
const [N, M] = NM.split(' ').map(Number);
console.log(solution(N, M, data.map(e => e.split(' ').map(Number))));

function solution (N, M, data) {
  let result = Number.MAX_SAFE_INTEGER;
  const floyd = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Number.MAX_SAFE_INTEGER));

  for(let i = 1; i <= N; i++) {
    floyd[i][i] = 0
  }

  for(const [S, E, L] of data) {
    floyd[S][E] = Math.min(floyd[S][E], L);
    floyd[E][S] = Math.min(floyd[E][S], L);
  }

  for(let k = 1; k <= N; k++) {
    for(let i = 1; i <= N; i++) {
      for(let j = 1; j <= N; j++) {
        if(floyd[i][j] > floyd[i][k] + floyd[k][j]) {
          floyd[i][j] = floyd[i][k] + floyd[k][j];
        }
      }
    }
  }

  for(let i = 1; i <= N; i++) {
    let max = 0;
    for(const [S, E, L] of data) {
      max = Math.max(max, floyd[i][S] + floyd[i][E] + L);
    }
    result = Math.min(result, max);
  }

  return (result / 2).toFixed(1);
}