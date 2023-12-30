// https://www.acmicpc.net/problem/2617
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `5 4
2 1
4 3
5 1
4 2`;
const [nm, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(nm, data));

function solution([n, m], data) {
  const graph = Array.from({length: n + 1}, () => []);
  const rgraph = Array.from({length: n + 1}, () => []);
  const visited = Array(n + 1).fill(false);
  const MID = Math.floor((n + 1) / 2);
  let result = 0;
  let cnt;

  for(const [a, b] of data) {
    graph[a].push(b);
    rgraph[b].push(a);
  }

  const dfs = (node, graph) => {
    visited[node] = true;
    for(const next of graph[node]) {
      if(visited[next]) continue;
      cnt++;
      dfs(next, graph);
    }
  }

  for(let i = 1; i <= n; i++) {
    visited.fill(false);
    cnt = 0;
    dfs(i, graph);
    if(cnt >= MID) {
      result++;
      continue;
    }
    visited.fill(false);
    cnt = 0;
    dfs(i, rgraph);
    if(cnt >= MID) {
      result++;
    }
  }
  return result;
}