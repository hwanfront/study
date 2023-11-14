// https://www.acmicpc.net/problem/1068
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `5
-1 0 0 1 1
2`;
const [n, p, r] = input.split`\n`;
console.log(solution(+n, p.split` `.map(Number), +r));

function solution(n, p, rm) {
  const graph = Array.from({length: n}, () => ([]));
  let root = null;
  let result = 0;
  for(let i = 0; i < n; i++) {
    if(i === rm) continue;
    if(p[i] === -1) {
      root = i;
      continue;
    }
    graph[p[i]].push(i);
  }

  if(root === null) return 0;

  const dfs = (node) => {
    let is = false;
    for(const next of graph[node]) {
      is = true;
      dfs(next);
    }
    if(!is) result++;
  }

  dfs(root);
  return result;
}
