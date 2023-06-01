# 다익스트라 dijkstra
## 의미
- 하나의 정점에서 출발하여 다른 모든 정점으로의 최단 경로
- 가장 적은 비용을 하나씩 선택
## 특징
- 모든 가중치가 양수인 경우에만 사용
- 힙 구조를 활용하여 시간복잡도를 O(NlogN)으로 줄일 수 있음
- 최단거리는 여러 개의 최단 거리로 이루어져 있음 << 이유료 DP 문제 (작은 문제가 큰 문제의 부분집합)
- 하나의 최단거리를 구할 때 이전까지 구한 최단 거리 정보를 그대로 사용
## 동작
- 노드에서 노드로 가는 그래프 준비
- 시작 노드 설정
- 시작 노드를 기준으로 각 노드의 최소 비용 저장
- 방문하지 않은 노드 중 가장 비용이 적은 노드 선택
- 해당 노드를 거쳐 특정한 노드로 가는 경우를 고려하여 최소 비용 갱신
- 반복
```js
const PriorityQueue = require('./util/PriorityQueue');
const graph = new Map();

const dijkstra = (start) => {
  const dist = Array(N).fill(Number.MAX_SAFE_INTEGER);
  const pq = new PriorityQueue((a, b) => a > b);
  dist[start] = 0;
  pq.push([start, 0]);

  while(!pq.empty()) {
    const [curNode, curDist] = pq.pop();
    for(let i = 0; i < graph.get(curNode).length; i++) {
      const [nextNode, nextDist] = graph.get(curNode)[i];
      if(nextDist < curDist + dist[nextNode]) {
        dist[nextNode] = nextDist;
        pq.push([nextNode, nextDist]);
      }
    }
  }

  return dist;
}
```
