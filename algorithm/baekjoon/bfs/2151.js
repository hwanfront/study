// https://www.acmicpc.net/problem/
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `2
#.
!#`;
const [N, ...data] = input.split('\n');
console.log(solution(+N, data));

function solution (N, data) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const doors = [];
  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      if(data[i][j] === '#') doors.push([i, j]);
    }
  }
  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < N;
  const bfs = () => {
    const visited = Array.from({length: N}, () => Array(N).fill(false));
    let queue = [[doors[0][0], doors[0][1], 0]];
    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x, c] of queue) {
        for(const [dy, dx] of direction) {
          let [ny, nx] = [y, x];
          while(1) {
            [ny, nx] = [ny + dy, nx + dx];
            if(!check(ny, nx)) break;
            if(data[ny][nx] === '*') break;
            if(visited[ny][nx]) break;
            if(data[ny][nx] === '!') {
              visited[ny][nx] = true;
              nextQueue.push([ny, nx, c + 1]);
            } else {
              if(ny === doors[1][0] && nx === doors[1][1]) return c;
            }
          }

        }
      }
      queue = nextQueue;
    }
  }

  return bfs();
}