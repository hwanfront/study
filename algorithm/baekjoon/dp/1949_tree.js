// https://www.acmicpc.net/problem/1949
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `7
1000 3000 4000 1000 2000 2000 7000
1 2
2 3
4 3
4 5
6 2
6 7`;
const [N, ...etc] = input.split('\n');
const [p, ...edges] = etc.map(e => e.split(' ').map(Number));
console.log(solution(+N, [null].concat(p), edges));

function solution (N, p, edges) {
  const graph = Array.from({length: N + 1}, () => ([]));
  const dp = Array.from({length: N + 1}, () => ([0, 0]));
  const visited = Array(N + 1).fill(false);
  edges.forEach(([u, v]) => {
    graph[u].push(v);
    graph[v].push(u);
  })

  const dfs = (cur) => {
    if(visited[cur]) return;
    visited[cur] = true;
    dp[cur][0] = p[cur];
    dp[cur][1] = 0;
    for(const next of graph[cur]) {
      if(visited[next]) continue;
      dfs(next);
      dp[cur][0] += dp[next][1];
      dp[cur][1] += Math.max(...dp[next]);
    }
  }
  dfs(1)
  return Math.max(...dp[1]);
}