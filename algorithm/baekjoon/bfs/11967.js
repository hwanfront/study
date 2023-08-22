// https://www.acmicpc.net/problem/11967
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3 6
1 1 1 2
2 1 2 2
1 1 1 3
2 3 3 1
1 3 1 2
1 3 2 1`;
const [NM, ...info] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NM, info));

function solution ([N, M], info) {
  let result = 1;
  const sc = Array.from({length: N + 1}, () => Array.from({length: N + 1}, () => ([])));
  const room = Array.from({length: N + 1}, () => Array(N + 1).fill(false));
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const OOB = (y, x) => 0 < y && y <= N && 0 < x && x <= N;
  const bfs = () => {
    const visited = Array.from({length: N + 1}, () => Array(N + 1).fill(false));
    let queue = [[1, 1]];
    visited[1][1] = true;

    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x] of queue) {
        for(const [sy, sx] of sc[y][x]) {
          if(room[sy][sx]) continue;
          room[sy][sx] = true;
          result++;

          for(const [dy, dx] of direction) {
            const [ny, nx] = [dy + sy, dx + sx];
            if(!OOB(ny, nx)) continue;
            if(visited[ny][nx]) {
              visited[sy][sx] = true;
              nextQueue.push([sy, sx]);
              break;
            }
          }
        }

        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!OOB(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(!room[ny][nx]) continue;
          visited[ny][nx] = true;
          nextQueue.push([ny, nx]);
        }
      }
      queue = nextQueue;
    }
  }

  room[1][1] = true;

  for(const [x, y, a, b] of info) {
    sc[y][x].push([b, a]);
  }

  bfs();
  
  return result;
}