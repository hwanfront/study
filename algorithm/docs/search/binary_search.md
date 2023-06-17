# 이진 탐색
## 의미
- 중간지점을 기준으로 데이터를 반씩 나눠서 탐색하는 알고리즘
- 정렬된 데이터에서 사용
## 시간복잡도
- O(log2n)
```js
arr.sort((a, b) => a - b);
const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;
  while (left < right) {
    const mid = Math.floor((start + end) / 2);
    if(arr[mid] === target) return mid;
    if(arr[mid] > target) {
      end = mid - 1;
      continue;
    }
    start = mid + 1;
  }
  return -1;
}
```
## Upper Bound
- 찾고자 하는 값보다 큰 값의 처음 위치 반환
```js
arr.sort((a, b) => a - b);
const upperBound = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    if(arr[mid] < target) {
      start = mid + 1;
      continue;
    }
    right = mid;
  }
  return -1;
}
```
## Lower Bound
- 찾고자 하는 값보다 크거나 같은 값의 처음 위치 반환

```js
arr.sort((a, b) => a - b);
const lowerBound = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    if(arr[mid] <= target) {
      start = mid + 1;
      continue;
    }
    right = mid;
  }
  return -1;
}
```