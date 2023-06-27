// https://www.acmicpc.net/problem/14621
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 7
M W W W M
1 2 12
1 3 10
4 2 5
5 2 5
2 5 10
3 4 3
5 4 7`;
const [nm, mws, ...data] = input.split('\n');
const [n, m] = nm.split(' ').map(Number);
console.log(solution(n, m, mws.split(' '), data.map(e => e.split(' ').map(Number))));

function solution (n, m, mws, costs) {
  const parent = Array.from({ length: n + 1 }, (_, idx) => idx);
  let result = 0;
  let cnt = 0;
  costs.sort((a, b) => a[2] - b[2]);

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
    const s1 = find(x);
    const s2 = find(y);
    return s1 === s2;
  }

  for(const cost of costs) {
    if(mws[cost[0] - 1] === mws[cost[1] - 1]) continue;
    if(!getSameParent(cost[0], cost[1])) {
      union(cost[0], cost[1]);
      result += cost[2];
      if(++cnt === n - 1) {
        return result;
      }
    }
  }
  return -1;
}