// https://www.acmicpc.net/problem/2146
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `10
1 1 1 0 0 0 0 1 1 1
1 1 1 1 0 0 0 0 1 1
1 0 1 1 0 0 0 0 1 1
0 0 1 1 1 0 0 0 0 1
0 0 0 1 0 0 0 0 0 1
0 0 0 0 0 0 0 0 0 1
0 0 0 0 0 0 0 0 0 0
0 0 0 0 1 1 0 0 0 0
0 0 0 0 1 1 1 0 0 0
0 0 0 0 0 0 0 0 0 0`;
const direction = [[-1, 0],[0, 1],[1, 0],[0, -1]];
const [N, ...data] = input.split('\n');
console.log(solution(Number(N), data.map(e => e.split(' ').map(Number))));

function solution (N, data) {
  let result = Number.MAX_SAFE_INTEGER;
  let name = 2;

  const check = (y, x) => 0 <= x && x < N && 0 <= y && y < N;
  const createLand = (y, x, name) => {
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    let queue = [];
    queue.push([y, x]);
    visited[y][x] = true;
    data[y][x] = name;

    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [y, x] = queue.pop();
        for(const [dy, dx] of direction) {
          const ny = dy + y;
          const nx = dx + x;
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(data[ny][nx] !== 1) continue;
          visited[ny][nx] = true;
          data[ny][nx] = name;
          nextQueue.push([ny, nx]);
        }
      }
      queue = nextQueue;
    }
  };

  const bfs = (y, x) => {
    const name = data[y][x];
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    let queue = [];
    queue.push([y, x, 0]);
    visited[y][x] = true;

    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [y, x, cnt] = queue.pop();
        if(data[y][x] !== 0 && data[y][x] !== name) return cnt - 1;
        for(const [dy, dx] of direction) {
          const ny = dy + y;
          const nx = dx + x;
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(data[ny][nx] === name) continue;
          visited[ny][nx] = true;
          nextQueue.push([ny, nx, cnt + 1]);
        }
      }
      queue = nextQueue;
    }
    return Number.MAX_SAFE_INTEGER;
  }

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      if(data[i][j] === 1) {
        createLand(i, j, name++);
      }
    }
  }

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      if(data[i][j] > 1) {
        result = Math.min(result, bfs(i, j));
      }
    }
  }

  return result;
}