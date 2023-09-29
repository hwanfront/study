// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `4 1
0 83 38 7
15 0 30 83
67 99 0 44
14 46 81 0`;
const [nk, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(nk, data));

function solution ([n, K], data) {
  const floyd = Array.from({length: n}, () => Array(n).fill(Number.MAX_SAFE_INTEGER));
  const visited = Array.from({length: n}, (_, i) => Array.from({length: n}, (__, j) => {
    if(i === j) return 0;
    return (1 << i) + (1 << j);
  }))
  const bit = (1 << n) - 1
  let min = Number.MAX_SAFE_INTEGER;

  for(let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if(data[i][j] > data[i][k] + data[k][j]) {
          data[i][j] = data[i][k] + data[k][j];
          visited[i][j] = visited[i][k] | visited[k][j];
        }
      }
    }
  }

  const dfs = (prev, b, sum) => {
    if(sum > min) return;
    if(b === bit) {
      min = Math.min(min, sum);
      return;
    }

    for(let i = 0; i < n; i++) {
      if(((1 << i) & b) > 0) continue;
      dfs(i, visited[prev][i] | b, sum + data[prev][i]);
    }
  }
  
  for(let i = 0; i < n; i++) {
    if(i === K) continue;
    dfs(i, visited[K][i], data[K][i]);
  }

  return min;
}