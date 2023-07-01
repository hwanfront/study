# 세그먼트 트리
## 의미
- 여러 개의 연속적인 데이터가 존재할 때 특정한 범위의 데이터에 대한 정보를 구하기 위해 사용한다.
  - 구간 합, 구간 최솟값, 구간 최댓값
- 수행 시간을 줄이고 메모리를 많이 사용하는 방법
## 시간복잡도
- 선형 구조를 이용할 때 구간 합을 구하는 속도 O(N)
- 트리 구조를 이용할 때 구간 합을 구하는 속도 O(logN)
## 세그먼트 트리의 크기
- `1 << (Math.ceil(Math.log2(N)) + 1)`
- 사이즈`N`보다 클 수 있는 `2 ** a` 값을 찾아서 트리 크기를 구한다.
- 귀찮으면 모든 범위를 커버할 수 있는 `N * 4` 사용
## 초기화 init
- 데이터에 대한 입력을 받은 후에 수행한다.
- 원래 데이터의 범위를 반씩 분할하며 구간의 합들을 저장한다. start~mid, (mid+1)~end
```js
const arr = Array(N).fill(0);
const tree = Array(1 << (Math.ceil(Math.log2(N)) + 1)).fill(0);

const init = (start, end, node) => {
  if(start === end) return tree[node] = arr[start];
  const mid = Math.floor((start + end) / 2);
  return tree[node] = init(start, mid, node * 2) + init(mid + 1, end, node * 2 + 1);
}
init(0, N - 1, 1);
```
## 합 sum
- 구간 합을 항상 O(logN) 시간에 구할 수 있다.
- 범위 안에 있는 경우에만 더해준다. 
```js
const tree = Array(1 << (Math.ceil(Math.log2(N)) + 1)).fill(0);

const sum = (start, end, node, left, right) => {
  if(end < left) return 0;
  if(right < start) return 0;
  if(left <= start && end <= right) return tree[node];
  const mid = Math.floor((start + end) / 2);
  return sum(start, mid, node * 2, left, right) + sum(mid + 1, end, node * 2 + 1, left, right);
}
```
## 갱신 update
- 해당 원소를 포함하는, 범위 안에 있는 모든 구간 노드를 갱신한다.
```js
const arr = Array(N).fill(0);
const tree = Array(1 << (Math.ceil(Math.log2(N)) + 1)).fill(0);

const update = (start, end, node, index, diff) => {
  if(index < start) return;
  if(index > end) return;
  tree[node] += diff;
  if(start === end) return;

  const mid = Math.floor((start + end) / 2);
  update(start, mid, node * 2, index, diff);
  update(mid + 1, end, node * 2 + 1, index, diff);
}
```
## 코드
```js
const arr = Array(N).fill(0);
const tree = Array(1 << (Math.ceil(Math.log2(N)) + 1)).fill(0);

const init = (start, end, node) => {
  if(start === end) return tree[node] = arr[start];
  const mid = Math.floor((start + end) / 2);
  return tree[node] = init(start, mid, node * 2) + init(mid + 1, end, node * 2 + 1);
}

const sum = (start, end, node, left, right) => {
  if(end < left) return 0;
  if(right < start) return 0;
  if(left <= start && end <= right) return tree[node];

  const mid = Math.floor((start + end) / 2);
  return sum(start, mid, node * 2, left, right) + sum(mid + 1, end, node * 2 + 1, left, right);
}

const update = (start, end, node, index, diff) => {
  if(index < start) return;
  if(index > end) return;
  tree[node] += diff;
  if(start === end) return;

  const mid = Math.floor((start + end) / 2);
  update(start, mid, node * 2, index, diff);
  update(mid + 1, end, node * 2 + 1, index, diff);
}
```