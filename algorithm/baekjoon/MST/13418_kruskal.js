// https://www.acmicpc.net/problem/13418
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4 5
0 1 1
1 2 0
1 4 0
4 2 1
3 4 1
2 3 0`;
const [nm, ...data] = input.split('\n');
const [n, m] = nm.split(' ').map(Number);
console.log(solution(n, m, data.map(e => e.split(' ').map(Number))));

function solution (n, m, costs) {
  let parent;
  let cnt;
  let result;

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
  
  cnt = 0;
  parent = Array.from({ length: n + 1 }, (_, idx) => idx);
  costs.sort((a, b) => a[2] - b[2]);

  for(const cost of costs) {
    if(!getSameParent(cost[0], cost[1])) {
      union(cost[0], cost[1]);
      if(cost[2] === 0) {
        cnt++;
      }
    }
  }
  result = Math.pow(cnt, 2);
  
  cnt = 0;
  parent = Array.from({ length: n + 1 }, (_, idx) => idx);
  costs.sort((a, b) => b[2] - a[2]);

  for(const cost of costs) {
    if(!getSameParent(cost[0], cost[1])) {
      union(cost[0], cost[1]);
      if(cost[2] === 0) {
        cnt++;
      }
    }
  }
  result -= Math.pow(cnt, 2);

  return result;
}