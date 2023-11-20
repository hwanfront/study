// https://www.acmicpc.net/problem/13023
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `8 8
1 7
3 7
4 7
3 4
4 6
3 5
0 4
2 7`;
const [nm, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(nm, data));

function solution([n, m], data) {
  const arr = Array.from({length: n}, () => ([]));
  for(const [a, b] of data) {
    arr[a].push(b);
    arr[b].push(a);
  }

  const visited = Array(n).fill(false);

  const dfs = (node, depth) => {
    if(depth === 4) {
      return true;
    }
    for(const next of arr[node]) {
      if(visited[next]) continue;
      visited[next] = true;
      if(dfs(next, depth + 1)) return true;
      visited[next] = false;
    }
    return false;
  }

  for(let i = 0; i < n; i++) {
    visited.fill(false);
    visited[i] = true;
    if(dfs(i, 0)) return 1;
  }

  return 0;
}