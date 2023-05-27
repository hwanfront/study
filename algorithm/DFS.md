# Depth-First Search
## 의미
- 깊이 우선 탐색, 그래프의 시작 지점에서 깊은 부분을 우선적으로 탐색하는 알고리즘
- 스택 또는 재귀로 구현함 (보통은 재귀로 구현)
## 특징
- 알고리즘이나 함수가 자기 자신을 호출하여 문제를 해결하는 순환 알고리즘 => 재귀 알고리즘
- 조건을 만족하는 순회
- 조건에 부합하지 않는다면 이전 수행으로 돌아가기위해 `백트래킹`을 사용함
### 장점
- 현재 경로 상 노드만 기억하면 되기 때문에 저장 공간이 적게 요구됨
- 찾으려는 노드가 깊은 단계에 있는 경우 BFS보다 빠르게 찾을 수 있음
### 단점
- 해가 없는 경로 탐색 시 단계가 끝날 때까지 탐색하기에 효율성을 높이기 위해 처리해야 함
- 조건에 대한 답이 도출되면 탐색을 종료하는데 이게 최단 경로를 보장하지 않음
- 최적해를 찾기 위해선 추가 탐색이 필요
## 동작
### 스택
- 시작 정점을 스택에 삽입
- 스택에서 하나의 정점을 꺼냄
- 스택에서 꺼낸 정점이 아직 방문하지 않은 정점이라면, visit 표시 후 이웃 정점들을 스택에 삽입
- 스택에 담긴 정점이 없을 때까지 2-3번 과정 반복
### 재귀
- 파라미터로 넘어온 정점이 이미 방문한 정점이면 return
- 파라미터로 넘어온 정점이 방문하지 않은 정점일 경우 visit 표시
- 인접 정점에 대해 재귀적으로 함수를 호출하며 탐색
## 코드
- stack으로 만든 dfs는 재귀와 다르게 동작함(역순), 결과는 정상적임
- 보통 트리 순
```js
// 1. 인접 리스트
const graph = [[1, 2, 3], [0, 5], [5, 6], [2, 4], [0, 2], [6], [4]];
const visited = Array(graph.length).fill(false);
```
```js
// recursive
const dfs = (start) => {
  if(조건) {
    // 결과 처리
  }

  if(visited[start]) return;  
  visited[start] = true;

  for(const end of graph[start]) {
    if(visited[end]) continue;
    dfs(end);
    visited[end] = false;
  }
}
```
```js
// stack 결과는 역순
const dfs = (start) => {
  const stack = [];
  stack.push(start);

  while(stack.length > 0) {
    const s = stack.pop();
    if(visited[s]) continue;
    visited[s] = true;

    if(조건) {
      // 결과 처리
    }

    for(const end of graph[s]) {
      if(visited[end]) continue;
      stack.push(end);
    }
  }
}
```
```js
// stack 결과는 recursive와 동일
const dfs = (start) => {
  const stack = [];
  stack.push(start);

  while(stack.length > 0) {
    const s = stack.pop();
    if(visited[s]) continue;
    visited[s] = true;
    
    if(조건) {
      // 결과 처리
    }

    for(let i = 0; i < graph[s].length; i++) {
      const end = graph[s][graph[s].length - 1 - i];
      if(visited[end]) continue;
      stack.push(end);
    }
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
const visited = Array.from({ length: N }, () => Array(M).fill(false));
```
```js
// recursive
const dfs = (y, x) => {
  if(조건) {
    // 결과 처리
  }

  if(visited[y][x]) return;
  visited[y][x] = true;

  for(const [dy, dx] of direction) {
    const ny = y + dy;
    const nx = x + dx;
    if(!check(ny, nx)) continue;
    dfs(ny, nx);
  }
}
```
```js
// recursive
const dfs = (y, x) => {
  if(조건) {
    // 결과 처리
  }

  if(visited[y][x]) return;
  visited[y][x] = true;

  for(const [dy, dx] of direction) {
    const ny = y + dy;
    const nx = x + dx;
    if(!check(ny, nx)) continue;
    dfs(ny, nx);
  }
}
```
```js
// stack
const dfs = (sy, sx) => {
  const stack = [];
  stack.push([sy, sx]);
  visited[sy][sx] = true;

  while(stack.length > 0) {
    const [y, y] = stack.pop();

    if(조건) {
      // 결과 처리
    }

    for(const [dy, dx] of direction) {
      const ny = y + dy;
      const nx = x + dx;
      if(!check(ny, nx)) continue;
      if(visited[ny][nx]) continue;
      stack.push([ny, nx]);
    }
  }
}
```