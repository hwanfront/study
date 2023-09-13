// https://www.acmicpc.net/problem/
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

// const input = `4
// 1 -1 -1
// 2 3 1
// 3 4 -1
// 4 -1 -1`;

const input = `19
1 2 3
2 4 5
3 6 7
4 8 -1
5 9 10
6 11 12
7 13 -1
8 -1 -1
9 14 15
10 -1 -1
11 16 -1
12 -1 -1
13 17 -1
14 -1 -1
15 18 -1
16 -1 -1
17 -1 19
18 -1 -1
19 -1 -1`;
const [N, ...data] = input.split('\n');
console.log(solution(+N, data.map(e => e.split(' ').map(Number))));

function solution (N, data) {
  const pCnt = Array(N + 1).fill(0);
  const edges = Array.from({length: N + 1}, () => ([-1, -1]));
  let min = Array(N + 1).fill(Number.MAX_SAFE_INTEGER);
  let max = Array(N + 1).fill(0);
  let root;
  let cnt = 1;
  data.forEach(([p, l, r]) => {
    if(l !== -1) {
      pCnt[l]++;
    }
    if(r !== -1) {
      pCnt[r]++;
    }
    edges[p][0] = l;
    edges[p][1] = r;
  })
  
  for(let i = 1; i < N + 1; i++) {
    if(pCnt[i] === 0) {
      root = i;
      break;
    }
  }

  const dfs = (node, level) => {
    const [l, r] = edges[node];
    if(l !== -1) {
      dfs(l, level + 1);
    }
    min[level] = Math.min(min[level], cnt);
    max[level] = Math.max(max[level], cnt);
    cnt++;
    if(r !== -1) {
      dfs(r, level + 1);
    }
  }

  dfs(root, 1);

  let level = -1;
  let width = 0;

  for(let i = 1; i < N + 1; i++) {
    if(min === Number.MAX_SAFE_INTEGER) break;
    if(max[i] - min[i] + 1 > width) {
      level = i;
      width = max[i] - min[i] + 1;
    }
    if(max[i] - min[i] + 1 === width) {
      level = level < i ? level : i;
    }
  }

  return `${level} ${width}`;
}