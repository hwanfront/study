// https://www.acmicpc.net/problem/1175
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `2 3
SCC
...`;
const [NM, ...data] = input.split('\n');
console.log(solution(NM.split(' ').map(Number), data.map(e => e.split(''))));
function solution ([N, M], data) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const visited = Array.from({length: N}, () => Array.from({length: M}, () => Array.from({length: 4}, () => Array(3).fill(false))));
  let s;
  let c = 0;

  for(let y = 0; y < N; y++) {
    for(let x = 0; x < M; x++) {
      if(!s && data[y][x] === 'S') {
        s = [y, x];
        data[y][x] = '.';
        continue;
      }
      if(data[y][x] === 'C') {
        data[y][x] = c++;
      }
    }
  }

  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < M;

  const bfs = () => {
    let queue = [];
    for(let nd = 0; nd < direction.length; nd++) {
      const [dy, dx] = direction[nd];
      const [ny, nx] = [dy + s[0], dx + s[1]];
      if(!check(ny, nx)) continue;
      if(data[ny][nx] === '#') continue;
      visited[ny][nx][nd][0] = true;
      if(data[ny][nx] === '.') {
        queue.push([ny, nx, 0, 1, nd]);
        continue;
      }
      queue.push([ny, nx, (1 << data[ny][nx]), 1, nd]);
    }
    
    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x, b, cnt, d] of queue) {
        if(b === (1 << 2) - 1) return cnt;
        for(let nd = 0; nd < direction.length; nd++) {
          if(nd === d) continue;
          const [dy, dx] = direction[nd];
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(data[ny][nx] === '#') continue;
          if(visited[ny][nx][nd][b]) continue;
          visited[ny][nx][nd][b] = true;
          if(data[ny][nx] === '.') {
            nextQueue.push([ny, nx, b, cnt + 1, nd]);
            continue;
          } 
          if(b & (1 << data[ny][nx])) {
            nextQueue.push([ny, nx, b, cnt + 1, nd]);
            continue;
          }
          nextQueue.push([ny, nx, b + (1 << data[ny][nx]), cnt + 1, nd]);

        }
      }
      queue = nextQueue;
    }

    return -1;
  }

  return bfs()
}