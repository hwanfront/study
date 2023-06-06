// https://www.acmicpc.net/problem/1719
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `6 10
1 2 2
1 3 1
2 4 5
2 5 3
2 6 7
3 4 4
3 5 6
3 6 7
4 6 4
5 6 2`;
const [nm, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
const [n, m] = nm;
console.log(solution(n, m, data));

function solution (n, m, data) {
  const graph = Array.from({ length: n + 1 }, (v, k) => new Array(n + 1).fill(Number.MAX_SAFE_INTEGER));
  const result = Array.from({ length: n + 1 }, (v, k) => new Array(n + 1).fill('-'));

  for(let i = 1; i < n + 1; i++) {
    graph[i][i] = 0;
  }

  data.forEach(([s, e, c]) => {
    graph[s][e] = c;
    graph[e][s] = c;
    result[s][e] = e;
    result[e][s] = s;
  })
  
  for (let k = 1; k < n + 1; k++) {
    for (let i = 1; i < n + 1; i++) {
      for (let j = 1; j < n + 1; j++) {
        if(graph[i][j] > graph[i][k] + graph[k][j]) {
          graph[i][j] = graph[i][k] + graph[k][j];
          result[i][j] = result[i][k];
        }
      }      
    }    
  }

  return result.slice(1).map(e => e.slice(1).join(' ')).join('\n');
}
