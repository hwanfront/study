// https://www.acmicpc.net/problem/10282
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const PriorityQueue = require("../util/PriorityQueue");

const input = `2
3 2 2
2 1 5
3 2 5
3 3 1
2 1 2
3 1 8
3 2 4`;

const [tc, ...info] = input.split('\n').map(e => e.split(' ').map(Number));
const result = [];
let i = 0;

while(i < info.length) {
  const [n, d, c] = info[i++];
  const deps = info.slice(i, i + d);
  result.push(solution(n, d, c, deps));
  i += d;
}

console.log(result.join('\n'));

function solution (n, d, c, deps) {
  const dist = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  const graph = Array.from({length: n + 1}, () => ([]));
  deps.forEach(([a, b, s]) => {
    graph[b].push([a, s]);
  })

  const dijkstra = (c) => {
    const pq = new PriorityQueue((a, b) => a[1] < b[1]);
    dist[c] = 0;
    pq.push([c, 0]);

    while(!pq.empty()) {
      console.log(pq.top())
      const [curNode, cost] = pq.top();
      pq.pop()
      for(const [nextNode, nextDist] of graph[curNode]) {
        const nextCost = cost + nextDist;
        if(nextCost < dist[nextNode]) {
          dist[nextNode] = nextCost;
          pq.push([nextNode, nextCost]);
        }
      }
    }
  }

  dijkstra(c);
  let res1 = 0;
  let res2 = 0;
  for(let i = 1; i <= n; i++) {
    if(dist[i] === Number.MAX_SAFE_INTEGER) continue;
    res1++;
    res2 = Math.max(res2, dist[i]);
  }

  return res1 + ' ' + res2;
}