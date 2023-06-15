# Breadth-First Search 너비 우선 탐색
## 의미
- 너비 우선 탐색, 그래프의 시작 지점에서 가까운 노드부터 탐색하는 알고리즘
- 큐를 이용해 구현함, 재귀로 구현하지 않음
## 특징
- 최단 경로나 임의의 경로를 구하는 데 사용
- DFS보다 검색에 유리
- 방문한 노드들을 저장 후 차례로 꺼내는 FIFO 방식으로 탐색
### 장점
- 해가 여러 개라도 가장 먼저 구한 해가 최단 경로임을 보장
### 단점
- 큐에 탐색할 노드들을 저장하므로 저장 공간을 많이 요구, 메모리 공간이 많이 필요함
- 노드의 개수가 많아지면 효율성이 떨어짐
## 동작
- 시작 노드를 큐에 삽입 후 방문 처리
- 큐에서 노드를 꺼내 해당 노드의 인접 노드 중 방문하지 않은 노드를 큐에 삽입하고 방문 처리
- 큐에 정점이 없을 때까지 위 과정 반복
## 코드
```js
// 1. 인접 리스트
const graph = [[1, 2, 3], [0, 5], [5, 6], [2, 4], [0, 2], [6], [4]];
```
```js
const bfs = (start) => {
  let queue = [];
  const visited = Array(graph.length).fill(false);
  queue.push(start);
  visited[start] = true;

  while(queue.length > 0) {
    const size = queue.length;
    const nextQueue = [];
    for(let i = 0; i < size; i++) {
      const v = queue[i];

      if(조건) {
        // 결과 처리
      }

      for(const n of graph[n]) {
        if(visited[n]) continue;
        nextQueue.push(n);
        visited[n] = true;
      }
    }
    queue = nextQueue;
  }
}
```
```js
// 2. 인접 행렬
const graph = [
  [0, 1, 0, 1, 1],
  [0, 0, 0, 1, 1],
  [0, 1, 0, 0, 1],
  [1, 1, 1, 1, 0]
];
const N = graph.length;
const M = graph[0].length;
const direction = [[1, 0],[0, -1],[-1, 0],[0, 1]];
const check = (y, x) => 0 <= y && y < N && 0 <= x && x < M;
```
```js
const bfs = (start) => {
  let queue = [];
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  queue.push(start);
  visited[start[0]][start[1]] = true;

  while(queue.length > 0) {
    const size = queue.length;
    const nextQueue = [];
    for(let i = 0; i < size; i++) {
      const [y, x] = queue[i];

      if(조건) {
        // 결과 처리
      }

      for(const [dy, dx] of direction) {
        const ny = y + dy;
        const nx = x + dx;
        if(!check(ny, nx)) continue;
        if(visited[ny][nx]) continue;
        nextQueue.push([ny, nx]);
        visited[ny][nx] = true;
      }
    }
    queue = nextQueue;
  }
}
```