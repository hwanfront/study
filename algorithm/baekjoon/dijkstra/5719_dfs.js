// https://www.acmicpc.net/problem/
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const PQ = require("./util/PriorityQueue");

const input = `5 6
0 4
0 1 10
0 2 1
2 1 2
1 3 1
3 4 2
1 4 5
0 0`;
const data = input.split('\n').map(e => e.split(' ').map(Number));
const result = [];
let cnt = 0;
while(!(data[cnt][0] === 0 && data[cnt][1] === 0)) {
  const [N, M] = data[cnt++];
  const [S, D] = data[cnt++];
  const info = data.slice(cnt, cnt += M);
  result.push(solution(N, S, D, info));
}

console.log(result.join('\n'));

function solution (N, S, D, info) {
  const graph = Array.from({length: N}, () => ([]));
  const dist = Array(N);
  const visited = Array(N).fill(false);

  for(const [u, v, p] of info) {
    graph[u].push([v, p]);
  }

  const dijkstra = () => {
    const pq = new PQ((a, b) => a[1] < b[1]);
    const path = Array.from({length: N}, () => ([]));
    dist.fill(Number.MAX_SAFE_INTEGER);
    
    pq.push([S, 0]);
    dist[S] = 0;

    while(!pq.empty()) {
      const [curNode, curCost] = pq.top();
      pq.pop();
      if(curCost < dist[curNode]) continue;
      for(const [nextNode, cost] of graph[curNode]) {
        if(nextNode === -1) continue;
        const nextCost = curCost + cost;
        if(nextCost < dist[nextNode]) {
          dist[nextNode] = nextCost;
          path[nextNode] = [curNode];
          pq.push([nextNode, nextCost]);
          continue;
        }
        if(nextCost === dist[nextNode]) {
          path[nextNode].push(curNode);
        }
      }
    }
    return path;
  }

  const dfs = (node, path) => {
    if(visited[node]) return;
    visited[node] = true;
    for(const preNode of path[node]) {
      const idx = graph[preNode].findIndex(e => e[0] === node);
      graph[preNode][idx][0] = -1;
      dfs(preNode, path);
    }
  }

  const path = dijkstra();
  dfs(D, path);
  dijkstra();

  return dist[D] === Number.MAX_SAFE_INTEGER ? -1 : dist[D];
}
