// https://www.acmicpc.net/problem/1368
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `4
5
4
4
3
0 2 2 2
2 0 3 3
2 3 0 4
2 3 4 0`;
const [n, ...data] = input.split('\n');
console.log(solution(n, data));

function solution (n, data) {
  const parent = Array.from({length: n}, (_, i) => i);
  const cost = data.slice(0, n).map(Number);
  const ccost = data.slice(n).map(e => e.split(' ').map(Number));
  const graph = [];
  let result = 0;

  for(let i = 0; i < n; i++) {
    graph.push([0, i + 1, cost[i]]);
    for(let j = i + 1; j < n; j++) {
      if(ccost[i][j] === 0) continue;
      graph.push([i + 1, j + 1, ccost[i][j]]);
    }
  }

  graph.sort((a, b) => a[2] - b[2]);

  const find = (x) => {
    if(parent[x] === x) return x;
    return parent[x] = find(parent[x]);
  }

  const union = (x, y) => {
    const s1 = find(x);
    const s2 = find(y);
    if(s1 === s2) return;
    if(s1 < s2) return parent[s2] = s1;
    else parent[s1] = s2;
  }

  const getSameParent = (x, y) => {
    return find(x) === find(y);
  }

  for(const [i, j, p] of graph) {
    if(getSameParent(i, j)) continue;
    union(i, j);
    result += p;
  }
  
  return result;
}