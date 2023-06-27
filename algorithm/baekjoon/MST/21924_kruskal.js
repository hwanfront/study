// https://www.acmicpc.net/problem/21924
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 4
1 2 1
2 3 1
3 1 1
4 5 5`;
const [nm, ...data] = input.split('\n');
const [n, m] = nm.split(' ').map(Number);
console.log(solution(n, m, data.map(e => e.split(' ').map(Number))));

function solution (n, m, costs) {
  const parent = Array.from({ length: n + 1 }, (_, i) => i);
  let sum = 0;
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

  sum = costs.reduce((prev, cur) => prev + cur[2], 0);

  for(const [a, b, c] of costs) {
    if(!getSameParent(a, b)) {
      union(a, b);
      result += c;
      if(++cnt === n - 1) {
        return sum - result;
      }
    }
  }
  return -1;
}