const PriorityQueue = require('../util/PriorityQueue');
// https://www.acmicpc.net/problem/1719
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `6 10
1 2 2
1 3 1
2 4 5
2 5 3
2 6 7
3 4 4
3 5 6
3 6 7
4 6 4
5 6 2`;
const [nm, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
const [n, m] = nm;
console.log(solution(n, m, data));

function solution (n, m, data) {
  const result = [];
  const graph = new Map(Array.from({ length: n }, (_, i) => [i + 1, []]));

  data.forEach(([s, e, t]) => {
    graph.get(s).push([t, e]);
    graph.get(e).push([t, s]);
  })

  const dijkstra = (start) => {
    const pq = new PriorityQueue((a, b) => a[0] < b[0]);
    const dist = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    const res = Array(n).fill('-');
    dist[start] = 0;

    for(let i = 0; i < graph.get(start).length; i++) {
      const [cost, nextNode] = graph.get(start)[i];
      dist[nextNode] = cost;
      res[nextNode - 1] = nextNode;
      pq.push([cost, nextNode, nextNode]);
    }

    while(!pq.empty()) {
      const [curCost, curNode, firstNode] = pq.top();
      pq.pop();
      for(let i = 0; i < graph.get(curNode).length; i++) {
        const [cost, nextNode] = graph.get(curNode)[i];
        const nextCost = cost + curCost;
        if(nextCost < dist[nextNode]) {
          dist[nextNode] = nextCost;
          res[nextNode - 1] = firstNode
          pq.push([nextCost, nextNode, firstNode]);
        }
      }
    }

    return res.join(' ');
  }

  for(let i = 1; i <= n; i++) {
    result.push(dijkstra(i));
  }
  return result.join('\n');
}