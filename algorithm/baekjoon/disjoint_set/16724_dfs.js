// https://www.acmicpc.net/problem/16724
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `10 10
DRDRRRRRRD
RDRUDUUUUL
URLDLRRRRD
RRRRLRDLUD
DDRLLDULUU
DRULLLRDUU
DULLDDDURU
URLDDDDUUL
DLRLRDUULL
RRULRUUURU`;
const [NM, ...data] = input.split('\n');
console.log(solution(NM.split(' ').map(Number), data));
function solution ([N, M], data) {
  const visited = Array.from({length: N}, () => Array(M).fill(0));
  let cnt = 0;
  const direction = {
    U: [-1, 0],
    D: [1, 0],
    L: [0, -1],
    R: [0, 1],
  }
  const dfs = ([y, x]) => {
    const [dy, dx] = direction[data[y][x]];
    const [ny, nx] = [dy + y, dx + x];
    visited[y][x] = 1;
    if(visited[ny][nx] === 1) cnt++;
    if(visited[ny][nx] === 0) dfs([ny, nx]);
    visited[y][x] = 2;
  }

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
      if(visited[i][j] !== 0) continue;
      dfs([i, j]);
    }
  }

  return cnt;
}