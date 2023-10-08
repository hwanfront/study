// https://www.acmicpc.net/problem/2118
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 

const input = `5 5
2 2 5
3 2 3 4
2 1 5
3 1 2 5
1 2`;
const [nm, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(nm, data));

function solution ([n, m], data) {
  const from = Array(n + 1).fill(-1);
  const to = Array(m + 1).fill(-1);
  const graph = Array.from({length: n + 1}, () => []);
  let visited = Array(n + 1).fill(false);
  let result = 0;

  for(let i = 0; i < data.length; i++) {
    for(let j = 1; j < data[i].length; j++) {
      graph[i + 1].push(data[i][j]);
    }
  }

  const dfs = (cur) => {
    visited[cur] = true;
    for(const next of graph[cur]) {
      if(to[next] === -1) {
        from[cur] = next;
        to[next] = cur;
        return true;
      }
      if(visited[to[next]]) continue;
      if(dfs(to[next])) {
        from[cur] = next;
        to[next] = cur;
        return true;
      }
    }
    return false;
  }

  for(let i = 1; i <= n; i++) {
    if(from[i] !== -1) continue;
    visited = Array(n + 1).fill(false);
    if(dfs(i)) result++;
  }
  
  return result;
}