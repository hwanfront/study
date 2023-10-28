// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `2
16
1 14
8 5
10 16
5 9
4 6
8 4
4 10
1 13
6 15
10 11
6 7
10 2
16 3
8 1
16 12
16 7
5
2 3
3 4
3 1
1 5
3 5`;
const result = [];
const [t, ...data] = input.split`\n`;
let j = 0;
for(let i = 0; i < +t; i++) {
  const n = +data[j++];
  const info = data.slice(j, j += n).map(e => e.split` `.map(Number));
  const [n1, n2] = info.pop();
  result.push(solution(n, info, n1, n2));
}

console.log(result.join('\n'))

function solution(n, info, n1, n2) {
  const graph = Array.from({length: n + 1}, () => []);
  const parent = Array(n + 1).fill(-1);
  const levels = Array(n + 1).fill(-1);
  let sum = 0;
  for(const [a, b] of info) {
    graph[a].push(b);
    sum += b;
  }
  const root = ((n + 1) * n) / 2 - sum;

  const dfs = (node, level) => {
    levels[node] = level;
    for(const next of graph[node]) {
      parent[next] = node;
      dfs(next, level + 1);
    }
  }
  dfs(root, 0);

  while(n1 !== n2) {
    if(levels[n1] === levels[n2]) {
      n1 = parent[n1];
      n2 = parent[n2];
    } else if(levels[n1] > levels[n2]) {
      n1 = parent[n1];
    } else {
      n2 = parent[n2];
    }
  }
  
  return n1;
}