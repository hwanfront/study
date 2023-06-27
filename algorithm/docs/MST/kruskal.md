# Kruskal 알고리즘
## 정의
- Greedy한 방법을 이용하여 모든 정점을 최소 비용으로 연결하는 최적 해답을 구하는 것
- 최소 비용의 간선으로 구성되며 사이클을 포함하지 않는 조건에 근거하여 최소 비용 간선을 선택
## 특징
- 사이클 생성 여부를 확인하기 위해 union-find 알고리즘을 사용함
  - 추가하고자 하는 간선의 양 끝 정점이 같은 집합에 속하는지 검사
- union-find 알고리즘을 이용하면 간선들을 정렬하는 시간에 좌우됨
- 그래프 내 적은 숫자의 간선만을 가지는 희소 그래프 Sparse Graph의 경우 적합
## 동작
- 그래프의 간선들을 가중치의 오름차순으로 정렬
- 정렬된 간선 리스트에서 순서대로 사이클을 형성하지 않는 간선 선택
- 해당 간선을 MST 집합에 추가
## 시간복잡도
- 간선 n개와 퀵 정렬을 이용한다면 시간복잡도는 O(mlogn)
## 코드
## 코드
```js
const costs = [...];
const parent = [];
costs.sort((a, b) => a - b);

// 루트 노드를 찾는 find 연산
const find = (x) => {
  if(x === parent[x]) return x;
  return parent[x] = find(parent[x]);
}

// 두 노드를 같은 집합으로 합치는 union 연산
const union = (x, y) => {
  const s1 = find(x);
  const s2 = find(y);

  // 이미 연결되어 있는 경우
  if(s1 === s2) return;
  
  // 더 작은 값이 부모 노드로
  if(s1 < s2) parent[s2] = s1;
  else parent[s1] = s2;
}

// 두 노드가 연결되어 있는지 판별
const getSameParent = (x, y) => {
  const s1 = find(x);
  const s2 = find(y);

  return (s1 === s2);
}

for(const cost of costs) {
  if(!getSameParent(cost[0], cost[1])) {
    union(cost[0], cost[1]);
  }
}
```