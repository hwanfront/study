// https://www.acmicpc.net/problem/4803
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `4 4
2 3
3 4
4 2
1 2
0 0`;
const data = input.split`\n`.map(e => e.split` `.map(Number));
const result = [];
let cnt = 1;
let i = 0;

while(1) {
  const [n, m] = data[i++];
  if(n === 0) break;
  const edges = data.slice(i, i += m);
  result.push(`Case ${cnt}: ${solution(n, edges)}`);
  cnt++;
}

console.log(result.join(`\n`))

function solution (n, edges) {
  const parent = Array.from({length: n + 1}, (_, i) => i);
  const cycle = Array(n + 1).fill(false);
  const find = (x) => {
    if(x === parent[x]) return x;
    return parent[x] = find(parent[x]);
  }

  const union = (x, y) => {
    const s1 = find(x);
    const s2 = find(y);
    if(s1 === s2) {
      cycle[s1] = true;
      return;
    }
    if(s1 < s2) parent[s2] = s1;
    else parent[s1] = s2;
    if(cycle[s1] || cycle[s2]) {
      cycle[s1] = true;
      cycle[s2] = true;
    }
  }

  for(const [x, y] of edges) {
    union(x, y)
  }

  const set = new Set();

  for(let i = 1; i <= n; i++) {
    const p = find(i); 
    if(cycle[p]) continue;
    set.add(p);
  }

  if(set.size === 0) return 'No trees.';
  if(set.size === 1) return 'There is one tree.';
  return `A forest of ${set.size} trees.`;
}