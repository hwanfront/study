const PriorityQueue = require('../util/PriorityQueue');
// https://www.acmicpc.net/problem/11779
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5
8
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
1 5`;
const [n, m, ...data] = input.split('\n');
const [a, b] = data.pop().split(' ').map(Number);
console.log(solution(Number(n), a, b, data.map(e => e.split(' ').map(Number))));

function solution (n, a, b, data) {
  const map = new Map(Array.from({ length: n }, (_, k) => ([k + 1, []])));
  data.forEach(([s, e, t]) => {
    map.get(s).push([e, t]);
  })

  const dijkstra = (start, end) => {
    const pq = new PriorityQueue((a, b) => a[0] < b[0]);
    const distance = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    const routes = Array(n + 1).fill(null);
    distance[start] = 0;
    pq.push([0, start, [start]]);
    while(!pq.empty()) {
      const [curCost, curNode, curRoute] = pq.top();
      pq.pop();
      if(curNode === end) break;
      for(let i = 0; i < map.get(curNode).length; i++) {
        const [nextNode, cost] = map.get(curNode)[i];
        const nextCost = cost + curCost;
        const nextRoute = curRoute.concat(nextNode);
        if(nextCost < distance[nextNode]) {
          distance[nextNode] = nextCost;
          routes[nextNode] = nextRoute;
          pq.push([nextCost, nextNode, nextRoute]);
        }
      }
    }
    return [distance[end], routes[end].length, routes[end].join(' ')];
  }

  return dijkstra(a, b).join('\n');
}