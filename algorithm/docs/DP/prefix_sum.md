# 누적 합
## 의미
- 구간 합을 효율적으로 계산하기 위해 사용하기 위해 사용
- 각 요소가 이전 요소들의 합으로 누적됨
## 특징
- 크기가 N인 배열의 구간 합을 구하는 `getRangedSum(arr, i, j)` 함수는 `O(N)`의 시간복잡도를 가짐
- 각각의 합을 구하기 위해 `getRangedSum(arr, i, j)` 함수를 M번 실행하게 되고 `O(MN)`의 시간복잡도를 가지게 됨
- 누적 합을 사용하게 되면 `O(N+M)`의 시간복잡도로 줄일 수 있음
## 주의
- 오버플로우 주의
## 속성
- 누적 합을 구해야하는 배열 a, 누적 합 배열 s
  - 누적 합 배열 `s[i] = s[i - 1] + a[i]`;
```js
const getPrefixSum = (arr) => {
  return arr.reduce((pre, cur) => pre + cur, 0);
}
```
```js
const getRangedSum = (arr, i, j) => {
  let sum = 0;
  for(let idx = i; idx < j + 1; idx++) {
    sum += arr[idx];
  }
  return sum;
}`
```