# 벨만포드
## 의미
- 한 노드에서 다른 노드까지의 최단 거리를 구하는 알고리즘
## 특징
- 노드 간의 간선 가중치가 음수인 경우에 사용, 음수 사이클의 존재 여부를 알 수 있음
- 다익스트라보다 시간복잡도는 크기 때문에 가중치가 모두 양수라면 굳이 사용할 필요는 없음
- 모든 노드간의 최단 거리를 서서히 완화 시켜 동작
## 시간복잡도
- O(NE)
- N: 노드 수
- E: 엣지 수
## 동작
- 시작 노드 설정
- 시작 노드에서 다른 노드의 거리값을 무한대로 설정, 시작 노드를 0으로 설정
- 모든 노드에 대해 현재 노드에서 인접 노드를 탐색 
  - 기존에 저장된 인접 노드까지의 거리보다 현재 노드를 거치고 인접 노드에 도달하는 게 더 짧다면 갱신
  - dist[end] > dist[start] + cost => dist[end] = dist[start] + cost
- n-1번 loop 수행 후 loop를 한번 더 돌리고 
  - 거리가 갱신된다면 음수 사이클 존재함
  - 갱신되지 않는다면 모든 노드들까지의 최소 거리
## 그 외
- 벨만 포드는 가중치가 INF 일 때도 계속 계산을 해야하므로, Infinity 넣으면 overflow가 발생
```js
const dist = Array(N + 1).fill(Infinity);

const bellman = (start) => {
  dist[start] = 0;
  for(let i = 1; i <= N; i++) {
    for(const [A, B, C] of edges) {
      if(dist[A] === Infinity) continue;
      if(dist[A] + C < dist[B]) {
        if(i === N) return -1; // 음의 사이클 존재
        dist[B] = dist[A] + C;
      }
    }
  }
  return dist;
}
```