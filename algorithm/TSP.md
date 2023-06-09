# 외판원 순회 Traveling Salesman Problem
## 의미
- 여러 지역을 돌면서 물건을 판매해야 하는 판매원이 모든 지역을 돌고 다시 출발지점으로 돌아올 때 최적의 경로를 찾는 문제
- 모든 도시들 간에 이동비용이 주어졌을 때, 각 도시들을 한번만 방문하고 처음 시작점으로 돌아오는 최소 비용 구하기
- 핵심은 반복되는 부분을 제거해서 시간복잡도를 줄이는 것
## 설명
- `1->2->3->4->5->1`와 `1->3->2->4->5->1`가 있을 때
- `4->5->1`의 경로 비용을 memoization 해놓으면 같은 과정을 반복하지 않아도 됌
## 특징
- memoization을 할 때 메모리 사용량을 줄이기 위해 보통 2진수 활용 `비트마스킹`
  - 10101(2) 이라면 0->2->4
- n이 커지면 배열 크기 문제로 사용하기 어려워지기도 (약 27이상부터라고 함)
```js
// -1 은 방문하지 않은 상태
// Number.MAX_SAFE_INTEGER 는 길이 없는 경우
const dist = Array.from({ length: N }, () => Array(1 << N).fill(-1));

dist[0][0] = 0;
const tsp = (now, visited) => {
  visited = visited | (1 << now);
  
  if(visited === (1 << N) - 1)  {
    return arr[now][0] === 0 ? Number.MAX_SAFE_INTEGER : arr[now][0]
  }

  if(dist[now][visited] !== -1) {
    return dist[now][visited];
  }

  dist[now][visited] = Number.MAX_SAFE_INTEGER;

  for(let i = 0; i < N; i++) {
    if(arr[now][i] === 0) continue;
    if((visited & (1 << i)) > 0) continue;
    dist[now][visited] = Math.min(dist[now][visited], tsp(i, visited) + arr[now][i]);
  }
  return dist[now][visited];
}
```