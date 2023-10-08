// Lowest Common Ancestor, 최소 공통 조상
// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 

const input = `15
1 2
1 3
2 4
3 7
6 2
3 8
4 9
2 5
5 11
7 13
10 4
11 15
12 5
14 7
6
6 11
10 9
2 6
7 6
8 13
8 15`;
const [n, ...data] = input.split('\n');
const v = data.slice(0, n - 1).map(e => e.split(' ').map(Number));
const w = data.slice(n).map(e => e.split(' ').map(Number));
console.log(solution(n, v, w));

function solution (n, v, w) {
  const result = [];
  const graph = Array.from({length: n + 1}, () => []);
  const parent = Array(n + 1).fill(-1);
  const level = Array(n + 1).fill(-1);

  parent[1] = 0;
  level[1] = 1;

  for(const [p1, p2] of v) {
    graph[p1].push(p2);
    graph[p2].push(p1);
  }

  const bfs = () => {
    const visited = Array(n + 1).fill(false);
    let q = [1];
    visited[1] = true;
    while(q.length > 0) {
      const nq = [];
      for(const n of q) {
        for(const nn of graph[n]) {
          if(visited[nn]) continue;
          visited[nn] = true;
          level[nn] = level[n] + 1;
          parent[nn] = n;
          nq.push(nn);
        }
      }
      q = nq;
    }
  }

  bfs();

  for(const [a, b] of w) {
    let p1 = a;
    let p2 = b;
    while(1) {
      if(level[p1] === level[p2]) break;
      if(level[p1] > level[p2]) {
        p1 = parent[p1];
      } else {
        p2 = parent[p2];
      }
    }

    while(1) {
      if(p1 === p2) break;
      p1 = parent[p1];
      p2 = parent[p2];
    }
    result.push(p1);
  }

  return result.join('\n');
}