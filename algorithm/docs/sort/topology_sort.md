# Tooplogy Sort 위상 정렬
## 정의
- 순서가 정해져있는 작업을 차례대로 수행해야 할 때 사용하는 알고리즘
## 특징
- `Directed Acyclic Graph 비순환 방향 그래프` 에서만 적용이 가능하다.
  - 시작점이 존재해야한다. 진입차수가 0인 노드가 있다.
  - 모든 원소에 방문하기 전 큐가 빈다면 사이클이 존재한다고 판단할 수 있다.
- 여러 개의 답이 존재할 수 있다.
- 큐 또는 스택을 이용한 DFS로 구현한다.
## 동작
- 각 정점의 진입차수를 구한다.
- 진입차수가 0인 정점을 큐에 삽입한다.
- 큐에서 원소를 꺼내 연결된 간선을 제거한다.
- 진입차수가 0이 된 정점을 큐에 삽입한다.
- 3~4 과정을 큐가 빌 때까지 반복한다.
## 시간복잡도
- O(V + E) 노드 확인 V, 노드에서 출발하는 간선을 차례대로 제거 E
## 코드
```js
const inDegree = Array(N + 1).fill(0);
const graph = Array.from({length: N + 1}, () => []);

for(let i = 0; i < data.length; i++) {
  const [x, y] = data[i];
  inDegree[y]++;
  graph[x].push(y);
}

const topologySort = () => {
  let queue = [];

  for(let i = 1; i <= N; i++) {
    if(inDegree[i] === 0) {
      queue.push(i);
    }
  }

  while(queue.length > 0) {
    const nextQueue = [];
    const size = queue.length;
    for(let i = 0; i < size; i++) {
      const node = queue[i];
      for(const next of graph[node]) {
        inDegree[next]--;
        // ~~
        if(inDegree[next] === 0) nextQueue.push(next);
      }
    }

    queue = nextQueue;
  }
}
```