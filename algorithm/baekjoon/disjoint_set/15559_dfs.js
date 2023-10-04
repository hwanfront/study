// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

//   N 위 
// W 왼 E 오
//   S 아래 

const input = `3 4
SWWW
SEWN
EEEN`;
const [nm, ...data] = input.split('\n');
console.log(solution(nm.split(' ').map(Number), data));

function solution ([n, m], data) {
  const visited = Array.from({length: n}, () => Array(m).fill(0));
  const direction = {
    N: [-1, 0],
    S: [1, 0],
    W: [0, -1],
    E: [0, 1],
  }
  let cnt = 0;
  const dfs = (y, x) => {
    const [dy, dx] = direction[data[y][x]];
    const [ny, nx] = [y + dy, x + dx];
    visited[y][x] = 1;
    if(visited[ny][nx] === 1) cnt++;
    if(visited[ny][nx] === 0) dfs(ny, nx);
    visited[y][x] = 2;
  }

  for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
      if(visited[i][j]) continue;
      dfs(i, j);
    }
  }

  return cnt;
}