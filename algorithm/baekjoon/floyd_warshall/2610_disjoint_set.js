// https://www.acmicpc.net/problem/2610
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `4
3
1 2
3 4
2 3`;
const [n, m, ...data] = input.split`\n`;

console.log(solution(+n, +m, data.map(e => e.split` `.map(Number))));

function solution(n, m, data) {
  const parent = Array.from({length: n + 1}, (_, i) => i);
  const floyd = Array.from({length: n + 1}, () => Array(n + 1).fill(Number.MAX_SAFE_INTEGER));
  const result = [];

  const find = (x) => {
    if(parent[x] === x) return x;
    return parent[x] = find(parent[x]);
  }

  // https://www.acmicpc.net/board/view/101248
  const union = (x, y) => {
    const s1 = find(x);
    const s2 = find(y);
    if(s1 === s2) return;
    parent[s2] = s1;
    for(let i = 1; i <= n; i++) {
      if(parent[i] === s2) {
        parent[i] = s1;
      }
    }
  }

  for(const [x, y] of data) {
    union(x, y);
    floyd[x][y] = 1;
    floyd[y][x] = 1;
  }
  
  for(let k = 1; k <= n; k++) {
    for(let i = 1; i <= n; i++) {
      for(let j = 1; j <= n; j++) {
        if(i === j) continue;
        if(floyd[i][j] > floyd[i][k] + floyd[k][j]) {
          floyd[i][j] = floyd[i][k] + floyd[k][j]
        }
      }
    }
  }

  const map = new Map();
  
  for(let i = 1; i <= n; i++) {
    if(!map.has(parent[i])) map.set(parent[i], []);
    map.get(parent[i]).push(i);
  }
  map.forEach((v) => {
    let min = Number.MAX_SAFE_INTEGER;
    let node = 0;
    for(const i of v) {
      let max = 0;
      for(const j of v) {
        if(floyd[i][j] === Number.MAX_SAFE_INTEGER) continue;
        if(max >= floyd[i][j]) continue;
        max = floyd[i][j];
      }
      if(min > max) {
        min = max;
        node = i;
      }
    }
    result.push(node);
  })

  result.sort((a, b) => a - b);

  return `${result.length}\n${result.join`\n`}`
}
