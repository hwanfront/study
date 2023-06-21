// https://www.acmicpc.net/problem/14938
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 5 4
5 7 8 2 3
1 4 5
5 2 4
3 2 3
1 2 3`;
const [NMR, items, ...roads] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NMR, items, roads));

function solution ([N, M, R], items, roads) {
  let result = 0;
  const floyd = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Number.MAX_SAFE_INTEGER));
  roads.forEach(([a, b, l]) => {
    floyd[a][b] = l;
    floyd[b][a] = l;
  })
  for(let i = 1; i < N + 1; i++) {
    floyd[i][i] = 0;
  }
  for(let k = 1; k < N + 1; k++) {
    for(let i = 1; i < N + 1; i++) {
      for(let j = 1; j < N + 1; j++) {
        if(floyd[i][j] > floyd[i][k] + floyd[k][j]) {
          floyd[i][j] = floyd[i][k] + floyd[k][j];
        }
      }
    }  
  }
  for(let i = 1; i < N + 1; i++) {
    let sum = 0;
    for(let j = 1; j < N + 1; j++) {
      if(floyd[i][j] <= M) {
        sum += items[j - 1];
      }
    }
    result = Math.max(result, sum);
  }
  return result;
}