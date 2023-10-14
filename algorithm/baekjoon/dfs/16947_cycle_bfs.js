// https://www.acmicpc.net/problem/16947
const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 
const [n, ...data] = input.split('\n');
console.log(solution(+n,  data.map(e => e.split(' ').map(Number))));

function solution (n, data) {
  const graph = Array.from({length: n + 1},() => ([]));
  const cycle = Array(n + 1).fill(false);
  const visited = Array(n + 1).fill(false);
  const prev = Array(n + 1).fill(-1);
  const result = Array(n).fill(0);
  let is = false;

  for(const [a, b] of data) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const dfs = (node) => { 
    visited[node] = true;
    for(const next of graph[node]) {
      if(is) return;
      if(next === prev[node]) continue;
      if(visited[next]) {
        is = true;
        let n = node;
        cycle[n] = true;
        while(1) {
          if(n === next) break;
          cycle[prev[n]] = true;
          n = prev[n];
        }
        return;
      } else {
        prev[next] = node;
        dfs(next, node);
      }
    }
  }

  const bfs = () => {
    const v = Array(n + 1).fill(false);
    let queue = [];

    for(let i = 0; i <= n; i++) {
      if(!cycle[i]) continue;
      queue.push([i, 0]);
      v[i] = true;
    }

    while(queue.length > 0) {
      const nextQueue = []
      for(const [node, cnt] of queue) {
        for(const next of graph[node]) {
          if(v[next]) continue;
          v[next] = true;
          result[next - 1] = cnt + 1;
          nextQueue.push([next, cnt + 1]);
        }
      }
      queue = nextQueue;
    }
  }

  dfs(1);
  bfs();
  
  return result.join(' ');
}