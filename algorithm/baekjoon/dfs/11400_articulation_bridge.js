/**
 * 단절선 Articulation Bridge
 * # 정의
 *  - 무방향 그래프에서 특정 간선을 제거 했을 때 두 개 이상의 그래프로 나누어 지는 간선
 * # 조건
 *  - A번째 정점에서 부모로 가는 간선이 아닌 간선 중에서 
 *  - 아직 방문하지 않은 노드의 discover 번호가 현재 discover 번호보다 클 경우 단절선
 */
// https://www.acmicpc.net/problem/11400
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `7 8
1 4
4 5
5 1
1 6
6 7
2 7
7 3
2 3`;
const [[V, E], ...nums] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(V, nums));

function solution (V, nums) {
  const graph = Array.from({ length: V + 1 }, () => ([]));
  const discovered = Array(V + 1).fill(-1);
  const result = [];

  let cnt = 0;
  for(const [A, B] of nums) {
    graph[A].push(B);
    graph[B].push(A);
  }

  const dfs = (start, parent) => {
    discovered[start] = ++cnt;
    let num = discovered[start];
    for(let i = 0; i < graph[start].length; i++) {
      const next = graph[start][i];
      if(next === parent) continue;
      if(discovered[next] === -1) {
        const low = dfs(next, start);
        num = Math.min(num, low);
        if(low > discovered[start]) {
          result.push([Math.min(start, next), Math.max(start, next)]);
        }
      } else {
        num = Math.min(num, discovered[next]);
      }
    }
    return num;
  }

  for(let i = 0; i <= V; i++) {
    dfs(i, -1);
  }

  result.sort((a, b) => {
    if(a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });

  const res = result.map(e => e.join(' ')).join('\n');

  return `${result.length}\n${res}`
}