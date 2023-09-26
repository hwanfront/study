// https://www.acmicpc.net/problem/10423
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `10 9 5
1 4 6 9 10
1 2 3
2 3 8
3 4 5
4 5 1
5 6 2
6 7 6
7 8 3
8 9 4
9 10 1`;
const [nmk, pps, ...uvws] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(nmk, pps, uvws));

function solution ([n, m, k], pps, uvws) {
  const parent = Array.from({length: n + 1}, (_, i) => i);
  let result = 0;
  uvws.sort(([,,w1], [,,w2]) => w1 - w2);
  pps.forEach((num) => parent[num] = 0);

  const find = (x) => {
    if(x === parent[x]) return x;
    return parent[x] = find(parent[x]);
  }

  const union = (x, y) => {
    const s1 = find(x);
    const s2 = find(y);
    if(s1 === s2) return;

    if(s1 < s2) parent[s2] = s1;
    else parent[s1] = s2;
  }

  const getSameParent = (x, y) => {
    return find(x) === find(y);
  }

  for(const [u, v, w] of uvws) {
    if(getSameParent(u, v)) continue;
    union(u, v);
    result += w;
  }
  
  return result;
}