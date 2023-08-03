/**
 * # disjoint set
 * 공통으로 포함하는 원소가 없는 두 집합의 관계
 * # union-find
 * ## union by rank
 * - 작은 트리를 큰 트리 루트에 붙이는 방법
 * - 노드마다 rank 변수를 추가해 트리로부터 노드의 높이를 값으로 할당
 * - 대표를 찾기위해 계쏙해서 올라가야 할 필요가 있음 -> find 연산에 깊이가 깊을수록 시간 증가
 * ## path compression 경로압축
 * - find 연산을 수행할 때마다 트리를 평평하게 만드는 방법
 * - 루트 노드까지 순회하며 모든 노드들이 같은 대표 노드를 공유하도록 함
 * - 트리가 만들어진 후 find 연산의 시간복잡도 O(1)
 */
// https://www.acmicpc.net/problem/
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4
6
2
2
3
3
4
4`;
const [G, P, ...gi] = input.split('\n').map(Number);
console.log(solution(G, P, gi));

function solution (G, P, gi) {
  const parent = Array.from({length: G + 1}, (_, i) => i);

  const find = (x) => {
    if(x === parent[x]) return x;
    return parent[x] = find(parent[x]);
  }

  const union = (x, y) => {
    const s1 = find(x);
    const s2 = find(y);
    parent[s1] = s2;
  }

  let result = 0;

  for(let i = 0; i < P; i++) {
    const f = find(gi[i]);
    if(f === 0) break;
    union(f, f - 1);
    result++;
  }

  return result;
}