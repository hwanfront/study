# 탐색
- 데이터 중에서 원하는 데이터를 찾는 과정
## 선형 탐색
- 맨 앞 또는 뒤부터 순서대로 찾는 알고리즘
- 단순, 간단
- 데이터 수가 많아지면 효율이 좋지 않음
- 시간복잡도: O(n)
```js
const data = [1,2,3,4,5,6];
const findIdx = (target) => {
  for(let i = 0; i < data.length; i++) {
    if(data[i] === target) return i;
  }
}
```
## [이진 탐색](./binary_search.md)