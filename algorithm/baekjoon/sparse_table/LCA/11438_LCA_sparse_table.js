// https://www.acmicpc.net/problem/11438
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `14
1 2
2 3
3 4
4 5
5 6
6 7
7 8
8 9
4 10
10 11
11 12
12 13
13 14
1
9 14`;
const [n, ...data] = input.split('\n');
const v = data.slice(0, n - 1).map(e => e.split(' ').map(Number));
const w = data.slice(n).map(e => e.split(' ').map(Number));
console.log(solution(+n, v, w));

function solution (n, v, w) {
  const LEN = Math.ceil(Math.log2(n + 1));
  const graph = Array.from({length: n + 1}, () => []);
  const parent = Array.from({length: n + 1}, () => Array(LEN).fill(0));
  const visited = Array(n + 1).fill(false);
  const depth = Array(n + 1).fill(0);
  const result = [];
  for(const [a, b] of v) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const dfs = (node, level) => {
    visited[node] = true;
    depth[node] = level;
    for(const next of graph[node]) {
      if(visited[next]) continue;
      parent[next][0] = node;
      dfs(next, level + 1);
    }
  }

  const lca = (a, b) => {
    if(depth[a] > depth[b]) {
      [a, b] = [b, a];
    }

    for(let i = LEN - 1; i >= 0; i--) {
      const jump = 1 << i;
      if(depth[b] - depth[a] >= jump) {
        b = parent[b][i];
      }
    }

    if(a === b) return a;

    for(let i = LEN - 1; i >= 0; i--) {
      if(parent[a][i] === parent[b][i]) continue;
      a = parent[a][i];
      b = parent[b][i];
    }

    return parent[a][0];
  }

  dfs(1, 0);

  for(let i = 1; i < LEN; i++) {
    for(let j = 0; j <= n; j++) {
      parent[j][i] = parent[parent[j][i - 1]][i - 1];
    }
  }

  for(const [a, b] of w) {
    result.push(lca(a, b));
  }

  return result.join`\n`;
}