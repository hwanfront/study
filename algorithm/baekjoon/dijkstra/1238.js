const PriorityQueue = require('../util/PriorityQueue');
// https://www.acmicpc.net/problem/1238
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `4 8 2
1 2 4
1 3 2
1 4 7
2 1 1
2 3 5
3 1 2
3 4 4
4 2 3`;
const [NMT, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
const [N, M, X] = NMT;

console.log(solution(N, X, data));

function solution(N, X, data) {
  let result = 0;
  const graph = new Map();
  const rgraph = new Map();

  data.forEach(e => {
    const [start, end, time] = e;
    if(!graph.has(start)) {
      graph.set(start, []);
    }
    if(!rgraph.has(end)) {
      rgraph.set(end, []);
    }
    graph.get(start).push([end, time]);
    rgraph.get(end).push([start, time]);
  });

  const dijkstra = (start, graph) => {
    const dist = Array(N + 1).fill(Number.MAX_SAFE_INTEGER);
    const pq = new PriorityQueue((a, b) => a.key > b.key);
    dist[start] = 0;
    pq.push({ key: 0, value: start });

    while(!pq.empty()) {
      const { key: curDist, value: curNode } = pq.top();
      pq.pop();
      if(dist[curNode] < curDist) continue;
      for(let i = 0; i < graph.get(curNode).length; i++) {
        const [nextNode, d] = graph.get(curNode)[i];
        const nextDist = d + curDist;
        if(nextDist < dist[nextNode]) {
          dist[nextNode] = nextDist;
          pq.push({ key: nextDist, value: nextNode });
        }
      }
    }
    return dist;
  }
  const res1 = dijkstra(X, graph);
  const res2 = dijkstra(X, rgraph);

  for(let i = 1; i < N + 1; i++) {
    result = Math.max(result, res1[i] + res2[i])
  }

  return result;
}
