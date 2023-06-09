// https://www.acmicpc.net/problem/2458
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `6 6
1 5
3 4
5 4
4 2
4 6
5 2`;
const [NM, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
const [N, M] = NM;
console.log(solution(N, M, data));

function solution (N, M, data) {
  let result = 0;
  const graph = Array.from({ length: N + 1 }, (_, i) => Array(N + 1).fill(Number.MAX_SAFE_INTEGER));
  
  data.forEach(([a, b]) => {
    graph[a][b] = 1;
  })

  for(let k = 1; k < N + 1; k++) {
    for (let i = 1; i < N + 1; i++) {
      for (let j = 1; j < N + 1; j++) {
        if(graph[i][j] > graph[i][k] + graph[k][j]) {
          graph[i][j] = graph[i][k] + graph[k][j];
        }
      }      
    }
  }

  for(let i = 1; i < N + 1; i++) {
    let cnt = 0;
    for(let j = 1; j < N + 1; j++) {
      if(graph[i][j] !== Number.MAX_SAFE_INTEGER || graph[j][i] !== Number.MAX_SAFE_INTEGER) {
        cnt++;
      }
    }
    if(cnt === N - 1) {
      result++;
    }
  }

  return result;
}