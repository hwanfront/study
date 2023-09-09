// https://www.acmicpc.net/problem/1194
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `3 6
###...
#0A.1a
###...`;
const [NM, ...maze] = input.split('\n');
let s;
console.log(solution(
  NM.split(' ').map(Number), 
  maze.map((e, y) => e.split('').map((el, x) => {
    if(el === '0') {
      s = [y, x];
      return '.';
    };
    return el;
  }))
));

function solution ([N, M], maze) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const keys = {
    a: 1,
    b: 1 << 1,
    c: 1 << 2, 
    d: 1 << 3,
    e: 1 << 4,
    f: 1 << 5
  }
  const doors = {
    A: 'a', 
    B: 'b', 
    C: 'c', 
    D: 'd', 
    E: 'e', 
    F: 'f', 
  }
  const visited = Array.from({length: N}, () => Array.from({length: M}, () => Array(64).fill(false)));
  
  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < M;
  const bfs = ([sy, sx]) => {
    let queue = [[sy, sx, 0, 0]];
    visited[sy][sx][0] = true;
    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x, b, c] of queue) {
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(maze[ny][nx] === '#') continue;
          if(maze[ny][nx] === '1') return c + 1;
          if(visited[ny][nx][b]) continue;
          if(maze[ny][nx] === '.') {
            visited[ny][nx][b] = true;
            nextQueue.push([ny, nx, b, c + 1]);
            continue;
          }
          if(keys.hasOwnProperty(maze[ny][nx])) {
            const kb = keys[maze[ny][nx]];
            const nb = (b & kb) === 0 ? b + kb : b;
            visited[ny][nx][nb] = true;
            nextQueue.push([ny, nx, nb, c + 1]);
            continue;
          }
          const dk = doors[maze[ny][nx]]
          if((b & keys[dk]) === 0) continue;
          visited[ny][nx][b] = true;
          nextQueue.push([ny, nx, b, c + 1]);
        }
      }
      queue = nextQueue;
    }
    return -1;
  }

  return bfs(s);
}
