// https://www.acmicpc.net/problem/2638
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `8 9
0 0 0 0 0 0 0 0 0
0 0 0 1 1 0 0 0 0
0 0 0 1 1 0 1 1 0
0 0 1 1 1 1 1 1 0
0 0 1 1 1 1 1 0 0
0 0 1 1 0 1 1 0 0
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0`;
let [NM, ...pan] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NM, pan));

function solution ([N, M], pan) {
  const direction = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < M;
  const bfs = () => {
    let hasCheeze = false;
    const visited = Array.from({length: N}, () => Array(M).fill(0));
    let queue = [[0, 0]];
    visited[0][0] = -1;
    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [y, x] = queue[i];
        for(const [dy, dx] of direction) {
          const ny = dy + y;
          const nx = dx + x;
          if(!check(ny, nx)) continue;
          if(visited[ny][nx] === -1) continue;
          if(pan[ny][nx] === 0) {
            visited[ny][nx] = -1;
            nextQueue.push([ny, nx]);
          } else {
            if(!hasCheeze) hasCheeze = true;
            if(visited[ny][nx] === 1) {
              pan[ny][nx] = 0;
              visited[ny][nx] = -1;
            } else {
              visited[ny][nx] += 1;
            }
          }
        }
      }
      queue = nextQueue;
    }
    return hasCheeze;
  }

  let cnt = 0;
  while(1) {
    if(!bfs()) {
      break;
    }
    cnt++;
  }
  return cnt;
}
