// https://www.acmicpc.net/problem/1976
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5
5
0 1 0 1 1
1 0 1 1 0
0 1 0 0 0
1 1 0 0 0
1 0 0 0 0
5 3 2 3 4`;
const [N, M, ...info] = input.split('\n');
console.log(solution(+N, +M, info.map(e => e.split(' ').map(Number))));

function solution (N, M, info) {
  if(N === 1) return 'YES';
  const parent = Array.from({length: N}, (_, i) => i);
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
  
  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      if(info[i][j] === 0) continue; 
      union(i, j);
    }
  }

  const plan = info.pop();
  const base = parent[plan[0] - 1];
  for(let i = 1; i < M; i++) {
    if(base !== parent[plan[i] - 1]) return 'NO';
  }
  return 'YES';
}