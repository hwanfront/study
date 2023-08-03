# Union-Find 알고리즘
## 정의
- 두 노드가 같은 집합에 속하는지 판별하는 알고리즘, 서로 중복되지 않고 공통 원소가 없는 서로소 집합을 판별함
- 노드를 합치는 union 연산, 노드의 루트노드를 찾는 find 연산으로 구성
### union by rank 
- 작은 트리를 큰 트리 루트에 붙이는 방법
- 노드마다 rank 변수를 추가해 트리로부터 노드의 높이를 값으로 할당
- 대표를 찾기위해 계쏙해서 올라가야 할 필요가 있음 -> find 연산에 깊이가 깊을수록 시간 증가
### path compression 경로 압축
- find 연산을 수행할 때마다 트리를 평평하게 만드는 방법
- 루트 노드까지 순회하며 모든 노드들이 같은 대표 노드를 공유하도록 함
- 트리가 만들어진 후 find 연산의 시간복잡도 `O(1)`
## 코드
```js
const parent = [];
// ... parent 초기화

// 루트 노드를 찾는 find 연산
const find = (x) => {
  if(x === parent[x]) return x;
  return parent[x] = find(parent[x]);
}

// 1. union - union by rank
const union = (x, y) => {
  const s1 = find(x);
  const s2 = find(y);

  // 이미 연결되어 있는 경우
  if(s1 === s2) return;
  
  // 더 작은 값이 부모 노드로
  if(s1 < s2) parent[s2] = s1;
  else parent[s1] = s2;
}

// 2. union - path compression
const union = (x, y) => {
  const s1 = find(x);
  const s2 = find(y);
  parent[s1] = s2;
}
```