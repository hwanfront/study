// https://www.acmicpc.net/problem/2636
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3 3
0 0 0
0 0 0
0 0 0`;
let [NM, ...pan] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NM, pan));

function solution ([N, M], pan) {
  const direction = [[-1, 0],[0, 1],[1, 0],[0, -1]];
  let result = 0;
  let cnt = 0;

  const check = (y, x) => 0 <= y && y < N && 0 <= x  && x < M;
  const bfs = (iy, ix) => {
    const visited = Array.from({length: N}, () => Array(M).fill(false));
    let queue = [[iy, ix]];
    let cnt = 0;
    visited[iy][ix] = true;
    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [y, x] = queue[i];
        for(const [dy, dx] of direction) {
          const ny = dy + y;
          const nx = dx + x;
          visited[y][x] = true;
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          visited[ny][nx] = true;
          if(pan[ny][nx] === 0) {
            nextQueue.push([ny, nx]);
          } else {
            cnt++;
            pan[ny][nx] = 0;
          }
        }
      }
      queue = nextQueue;
    }
    return cnt;
  }

  while(1) {
    const newCnt = bfs(0, 0);
    if(newCnt === 0) {
      break;
    } 
    cnt = newCnt;
    result++;
  }

  return `${result}\n${cnt}`;
}