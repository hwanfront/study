// https://www.acmicpc.net/problem/1761
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `7
1 6 13
6 3 9
3 5 7
4 1 3
2 4 20
4 7 2
3
1 6
1 4
2 6`;
const [n, ...data] = input.split('\n');
const nn = data.slice(0, n - 1).map(e => e.split` `.map(Number));
const mm = data.slice(n).map(e => e.split` `.map(Number));
console.log(solution(+n, nn, mm));

function solution (n, nn, mm) {
  const LEN = Math.ceil(Math.log2(n + 1));
  const graph = Array.from({length: n + 1}, () => []);
  const parent = Array.from({length: n + 1}, () => Array(LEN).fill(0));
  const dist = Array.from({length: n + 1}, () => Array(LEN).fill(0));
  const depth = Array(n + 1).fill(0);
  const visited = Array(n + 1).fill(false);

  const result = [];
  
  for(const [a, b, c] of nn) {
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }

  const dfs = (node, level) => {
    visited[node] = true;
    depth[node] = level;
    for(const [next, cost] of graph[node]) {
      if(visited[next]) continue;
      parent[next][0] = node;
      dist[next][0] = cost;
      dfs(next, level + 1);
    }
  }

  const lca = (a, b) => {
    let sum = 0;
    if(depth[a] > depth[b]) [a, b] = [b, a];

    for(let i = LEN - 1; i >= 0; i--) {
      const jump = 1 << i;
      if(depth[b] - depth[a] >= jump) {
        sum += dist[b][i];
        b = parent[b][i];
      }
    }

    if(a === b) return sum;

    for(let i = LEN - 1; i >= 0; i--) {
      if(parent[a][i] === parent[b][i]) continue;
      sum += dist[a][i] + dist[b][i];
      a = parent[a][i];
      b = parent[b][i];
    }

    return sum += (dist[a][0] + dist[b][0]);
  }

  dfs(1, 0);

  for(let i = 1; i < LEN; i++) {
    for(let j = 0; j <= n; j++) {
      parent[j][i] = parent[parent[j][i - 1]][i - 1];
      if(parent[j][i] === 0) continue;
      dist[j][i] = dist[j][i - 1] + dist[parent[j][i - 1]][i - 1];
    }
  }
  
  for(const [a, b] of mm) {
    result.push(lca(a, b));
  }

  return result.join`\n`;
}