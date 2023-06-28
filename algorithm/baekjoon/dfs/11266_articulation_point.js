/**
 * 단절점 Articulation Point
 * # 정의
 *  - 무방향 그래프에서 특정 정점을 제거 했을 때 두 개 이상의 그래프로 나누어 지는 정점  
 * # 조건
 * 1. 정점 A가 루트 노드가 아니라면 
 *  => 정점 A에서 자식 노드들이 정점 A를 거치지 않고 정점 A보다 방문번호가 빠른 정점으로 갈 수 없다면 단절점이다.
 *  => low >= discovered[start]
 * 2. 정점 A가 루트 노드라면
 *  => 자식 노드 수가 2개 이상이면 단절점이다.
 *  => childCnt > 1
 */
// https://www.acmicpc.net/problem/11266
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `7 7
1 4
4 5
5 1
1 6
6 7
2 7
7 3`;
const [[V, E], ...nums] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(V, nums));

function solution (V, nums) {
  const graph = Array.from({ length: V + 1 }, () => ([]));
  const discovered = Array(V + 1).fill(-1);
  const result = new Set();

  let cnt = 0;
  for(const [A, B] of nums) {
    graph[A].push(B);
    graph[B].push(A);
  }

  const dfs = (start, isRoot) => {
    discovered[start] = ++cnt;
    let num = discovered[start];
    let childCnt = 0;
    for(let i = 0; i < graph[start].length; i++) {
      const next = graph[start][i];
      if(discovered[next] === -1) {
        const low = dfs(next, false)
        childCnt++;
        num = Math.min(num, low);
        if(isRoot) continue;
        if(low >= discovered[start]) {
          result.add(start);
        }
      } else {
        num = Math.min(num, discovered[next]);
      }
    }
    if(isRoot && childCnt > 1) {
      result.add(start);
    }
    return num;
  }

  for(let i = 0; i <= V; i++) {
    if(discovered[i] !== -1) continue;
    dfs(i, true);
  }

  const res = [...result];
  res.sort((a, b) => a - b);

  return `${res.length}\n${res.join(' ')}`
}
