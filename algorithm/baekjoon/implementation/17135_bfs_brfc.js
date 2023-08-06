// https://www.acmicpc.net/problem/17135
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `7 6 2
0 1 1 0 1 0
1 1 0 1 0 0
1 0 1 0 0 1
0 1 0 0 1 0
1 0 0 1 0 1
0 0 1 0 1 1
0 1 0 1 1 0`;
const [NMD, ...grid] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NMD, grid));
function solution ([N, M, D], grid) {
  let result = 0;
  const direction = [[0, -1], [-1, 0], [0, 1]];
  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < M;

  const bfs = (iy, ix, grid) => {
    if(grid[iy - 1][ix] === 1) return [iy - 1, ix];
    const visited = Array.from({length: N}, () => Array(M).fill(false));
    let queue = [[iy - 1, ix, 1]];
    visited[iy - 1][ix] = true;
    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [y, x, cnt] = queue[i];
        if(cnt === D) return [];
        for(const [dy, dx] of direction) {
          const ny = dy + y;
          const nx = dx + x;
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(grid[ny][nx] === 1) return [ny, nx];
          visited[ny][nx] = true;
          nextQueue.push([ny, nx, cnt + 1]);
        }
      }
      queue = nextQueue;
    }
    return [];
  }

  for(let i = 0; i < M - 2; i++) {
    for(let j = i + 1; j < M - 1; j++) {
      for(let k = j + 1; k < M; k++) {
        let cnt = 0;
        const myGrid = JSON.parse(JSON.stringify(grid));
        const archers = [i, j, k];
        for(let p = 0; p < N; p++) {
          const shot = [];
          for(const a of archers) {
            const arr = bfs(N - p, a, myGrid);
            if(arr.length > 0) {
              shot.push(arr);
            }
          }
          
          for(const [y, x] of shot) {
            if(myGrid[y][x] === 1) {
              myGrid[y][x] = 0;
              cnt++;
            }
          }
        }
        result = Math.max(result, cnt);
      }
    }
  }
  return result;
}