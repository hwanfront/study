// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `13 17
1 2
2 3
3 1
9 6
6 8
8 5
5 7
7 6
10 5
1 5
5 13
13 4
4 3
11 13
13 12
12 11
10 11`;
const [ve, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(ve, data));

function solution([v, e], data) {
  const graph = Array.from({length: v + 1}, () => ([]));
  const rgraph = Array.from({length: v + 1}, () => ([]));
  const visited = Array(v + 1).fill(false);
  const result = []
  const stack = [];

  for(const [a, b] of data) {
    graph[a].push(b);
    rgraph[b].push(a);
  }

  const dfs = (node) => {
    visited[node] = true;
    for(const next of graph[node]) {
      if(visited[next]) continue;
      dfs(next);
    }
    stack.push(node);
  }

  const scc = (node) => {
    visited[node] = true;
    for(const next of rgraph[node]) {
      if(visited[next]) continue;
      scc(next);
      result.at(-1).push(next);
    }
  }

  for(let i = 1; i <= v; i++) {
    if(visited[i]) continue;
    dfs(i);
  }
  visited.fill(false);

  while(stack.length) {
    const node = stack.pop();
    if(visited[node]) continue;
    result.push([node]);
    scc(node);
  }

  for(let i = 0; i < result.length; i++) {
    result[i].sort((a, b) => a - b);
  }

  result.sort((a, b) => a[0] - b[0]);

  return result.length + '\n' + result.map(e => e.join` ` + ' -1').join`\n`;
}