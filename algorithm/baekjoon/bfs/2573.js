// https://www.acmicpc.net/problem/2573
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 7
0 0 0 0 0 0 0
0 2 4 5 3 0 0
0 3 0 2 5 2 0
0 7 6 2 4 0 0
0 0 0 0 0 0 0`;
const [NM, ...grid] = input.split('\n').map(e => e.split(' ').map(Number));
const direction = [[-1, 0], [0, 1], [1, 0], [0, -1]];
console.log(solution(NM, grid));


function solution ([N, M], grid) {

  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < M;

  const bfs = (i, j, visited) => {
    let queue = [[i, j]];
    visited[i][j] = true;

    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [y, x] = queue[i];
        for(const [dy, dx] of direction) {
          const ny = dy + y;
          const nx = dx + x;
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(grid[ny][nx] === 0) {
            if(grid[y][x] !== 0) {
              grid[y][x]--;
            }
            continue;
          }
          nextQueue.push([ny, nx]);
          visited[ny][nx] = true;
        }
      }
      queue = nextQueue;
    }
  }

  let result = 0;
  let cnt = -1;
  while(1) {
    const visited = Array.from({length: N}, () => Array(M).fill(false));
    let newCnt = 0;

    for(let i = 0; i < N; i++) {
      for(let j = 0; j < M; j++) {
        if(grid[i][j] > 0 && !visited[i][j]) {
          bfs(i, j, visited);
          newCnt++;
        }
      }
    }

    if(newCnt === 0) {
      result = 0;
      break;
    }

    if(cnt === -1) {
      cnt = newCnt;
    } else {
      if(cnt !== newCnt) {
        break;
      }
    }
    result++;
  }

  return result;
}