// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 
const input = `4 5 8
1 2 3
1 3 2
2 3 2
2 4 4
3 4 1`;
const [nmt, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(nmt, data));

function solution ([n, m, t], data) {
  const parent = Array.from({length: n + 1}, (_, i) => i);
  let result = 0;
  let cnt = 0;
  data.sort((a, b) => a[2] - b[2]);
  const find = (x) => {
    if(parent[x] === x) return parent[x];
    return parent[x] = find(parent[x])
  }

  const union = (x, y) => {
    const s1 = find(x);
    const s2 = find(y);
    if(s1 === s2) return;
    if(s1 < s2) parent[s2] = s1;
    else parent[s1] = s2;
  }

  const getSameParent = (x, y) => find(x) === find(y);

  for(const [a, b, c] of data) {
    if(getSameParent(a, b)) continue;
    union(a, b);
    result += c + cnt++ * t;
  }

  return result;
}