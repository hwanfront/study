// https://www.acmicpc.net/problem/11562
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `4 3
1 2 0
2 3 1
3 4 0
7
1 1
1 2
2 1
1 4
4 1
2 3
4 3`;
const [nm, ...data] = input.split('\n');
const [n, m] = nm.split(' ').map(Number);
const uvbs = data.slice(0, m).map(e => e.split(' ').map(Number));
const q = data.slice(m + 1).map(e => e.split(' ').map(Number));
console.log(solution(n, uvbs, q));

function solution (n, uvbs, q) {
  const result = [];
  const floyd = Array.from({length: n + 1}, () => Array(n + 1).fill(Number.MAX_SAFE_INTEGER));
  for(let i = 1; i <= n; i++) {
    floyd[i][i] = 0;
  }

  for(const [u, v, b] of uvbs) {
    if(b === 1) {
      floyd[v][u] = 0;
    } else {
      floyd[v][u] = 1;
    }
    floyd[u][v] = 0;
  }

  for(let k = 1; k <= n; k++) {
    for(let i = 1; i <= n; i++) {
      for(let j = 1; j <= n; j++) {
        if(floyd[i][j] > floyd[i][k] + floyd[k][j]) {
          floyd[i][j] = floyd[i][k] + floyd[k][j];
        }
      }
    }
  }

  for(const [s, e] of q) {
    result.push(floyd[s][e]);
  }

  return result.join('\n');
}