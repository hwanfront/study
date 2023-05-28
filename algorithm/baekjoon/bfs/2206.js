// https://www.acmicpc.net/problem/2206
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `6 4
0100
1110
1000
0000
0111
0000`;
const [NM, ...arr] = input.split('\n');
const [N, M] = NM.split(' ').map(Number);
const direction = [[0, 1],[-1, 0],[0, -1],[1, 0]];
const check = (x, y) => 0 <= x && x < N && 0 <= y && y < M;

console.log(solution(N, M, arr));

function solution(N, M, arr) {
  let queue = [];
  const visited = [];
  const bvisited = [];
  for(let i = 0; i < N; i++) {
    visited.push(Array(M).fill(0));
    bvisited.push(Array(M).fill(0));
  }

  queue.push([0, 0, false]);
  visited[0][0] = 1;
  bvisited[0][0] = 1;
  while(queue.length > 0) {
    const size = queue.length;
    const nextQueue = [];
    for(let i = 0; i < size; i++) {
      const [x, y, isBroke] = queue.pop();

      if(x === N - 1 && y === M - 1) {
        return Math.max(visited[N - 1][M - 1], bvisited[N - 1][M - 1]);
      }

      for(const [nx, ny] of direction) {
        const dx = x + nx;
        const dy = y + ny;
        if(check(dx, dy)) {
          if(arr[dx][dy] === '0') {
            if(!isBroke && visited[dx][dy] === 0) {
              visited[dx][dy] = visited[x][y] + 1;
              nextQueue.push([dx, dy, false]);
              continue;
            }
            if(isBroke && bvisited[dx][dy] === 0) {
              bvisited[dx][dy] = bvisited[x][y] + 1;
              nextQueue.push([dx, dy, true]);
              continue;
            }
          } else {
            if(isBroke) continue;
            if(bvisited[dx][dy] === 0) {
              nextQueue.push([dx, dy, true]);
              bvisited[dx][dy] = visited[x][y] + 1;
            }
          }
        }
      }
    }
    queue = nextQueue;
  }
  return -1;
}
