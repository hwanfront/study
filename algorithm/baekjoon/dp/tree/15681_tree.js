// https://www.acmicpc.net/problem/15681
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `9 5 3
1 3
4 3
5 4
5 6
6 7
2 3
9 6
6 8
5
4
8`;
const [NRQ, ...info] = input.split('\n').map(e => e.split(' ').map(Number));
const edges = info.slice(0, NRQ[0] - 1);
const U = info.slice(NRQ[0] - 1).map(e => e[0]);
console.log(solution(NRQ, edges, U));
function solution ([N, R, Q], edges, U) {
  const graph = Array.from({length: N + 1}, () => ([]));
  const visited = Array(N + 1).fill(false);
  const dp = Array(N + 1).fill(0);
  for(const [U, V] of edges) {
    graph[U].push(V);
    graph[V].push(U);
  }

  const dfs = (cur) => {
    visited[cur] = true;
    dp[cur] = 1;

    for(const next of graph[cur]) {
      if(visited[next]) continue;
      dfs(next);
      dp[cur] += dp[next];
    }
  }

  dfs(R);
  return U.map(e => dp[e]).join('\n');
}