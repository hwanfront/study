# 백트래킹
## 의미
- 모든 경우의 수를 전부 고려하는 알고리즘 상태공간을 트리로 나타낼 수 있을 때 적합한 방식
  - 한정 조건을 가진 문제를 풀려는 전략
  - 단순 for문, 깊이우선탐색 DFS, 너비우선탐색 BFS 와 같은 경우
- 해를 찾는 도중 해가 아니어서 막히면, 되돌아가서 다시 해를 찾아가는 기법
## DFS > BFS
- 모든 경우의 수에서 조건을 만족하는 경우를 탐색하기 때문에 완전탐색 기법인 BFS, DFS 모두 가능함
- 조건에 부합하지 않는다면 이전 수행으로 돌아가야하기 떄문에 BFS보다는 DFS의 구현이 좋음
## 예시 코드
```js
const dfs = (num) => {
  if(num === 5) { // 재귀함수 종료
    ...
    return;
  }

  for(let i = 0; i < check.length; i++) {
    if(check[i]) continue;
    check[i] = true;
    dfs(num + 1);
    check[i] = false;
  }
}
```
## 대표 예시
- N-Queen
