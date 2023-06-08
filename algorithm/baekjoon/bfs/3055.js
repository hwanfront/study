// https://www.acmicpc.net/problem/3055
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 4
.D.*
....
..X.
S.*.
....`;
const [RC, ...arr] = input.split('\n');
const [R, C] = RC.split(' ').map(Number);
const direction = [[-1, 0],[1, 0],[0, -1],[0, 1]];
const check = (x, y) => 0 <= x && x < C && 0 <= y && y < R;

console.log(solution(R, C, arr));

function solution (R, C, arr) {
  let S = null;
  let waters = [];
  const data = arr.map((e, y) => {
    const line = e.split('');
    line.forEach((el, x) => {
      if(el === 'S') S = [y, x];
      if(el === '*') waters.push([y, x]); 
    })
    return line;
  })

  data[S[0]][S[1]] = '.';

  const bfs = () => {
    const visited = Array.from({ length: R }, () => Array(C).fill(false));
    let waterQueue = waters;
    let hedgehogQueue = [[S[0], S[1], 0]];
    visited[S[0]][S[1]] = true;
    while(hedgehogQueue.length > 0) {
      const wSize = waterQueue.length;
      const hSize = hedgehogQueue.length;
      const nextWaterQueue = [];
      const nextHedgehogQueue = [];
      for(let i = 0; i < wSize; i++) {
        const [y, x] = waterQueue[i];
        for(const [dy, dx] of direction) {
          const ny = dy + y;
          const nx = dx + x;
          if(!check(nx, ny)) continue;
          if(data[ny][nx] !== '.') continue;
          data[ny][nx] = '*';
          nextWaterQueue.push([ny, nx]);
        }
      }
      for(let i = 0; i < hSize; i++) {
        const [y, x, cnt] = hedgehogQueue[i];
        for(const [dy, dx] of direction) {
          const ny = dy + y;
          const nx = dx + x;
          if(!check(nx, ny)) continue;
          if(data[ny][nx] === 'D') return cnt + 1;
          if(visited[ny][nx]) continue;
          if(data[ny][nx] !== '.') continue;
          visited[ny][nx] = true
          nextHedgehogQueue.push([ny, nx, cnt + 1]);
        }

      }
      waterQueue = nextWaterQueue;
      hedgehogQueue = nextHedgehogQueue;
    }
    return 'KAKTUS';
  }
  return bfs();
}