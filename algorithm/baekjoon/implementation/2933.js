// https://www.acmicpc.net/problem/2933
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `4 6
xxxxxx
xx...x
xx....
xx....
2
4 4`;
const [RC, ...data] = input.split('\n');
const [R, C] = RC.split(' ').map(Number);
const cave = data.slice(0, R).map(e => e.split(''));
const N = +data[R];
const h = data[R + 1].split(' ').map(Number)
console.log(solution(R, C, cave, N, h));
function solution (R, C, cave, N, h) {
  const direction = [[0,1],[1,0],[0,-1],[-1,0]];
  const check = (y, x) => 0 <= y && y < R && 0 <= x && x < C;
  const go = (isLeft, num) => {
    const adjacentPos = [];
    if(isLeft) {
      for(let i = 0; i < C; i++) {
        if(cave[num - 1][i] === '.') continue;
        cave[num - 1][i] = '.';
        for(const [dy, dx] of direction) {
          const [ny, nx] = [num - 1 + dy, i + dx];
          if(!check(ny, nx)) continue;
          if(cave[ny][nx] === '.') continue;
          adjacentPos.push([ny, nx]);
        }
        return adjacentPos;
      }
    } else {
      for(let i = C - 1; i >= 0; i--) {
        if(cave[num - 1][i] === '.') continue;
        cave[num - 1][i] = '.';
        for(const [dy, dx] of direction) {
          const [ny, nx] = [num - 1 + dy, i + dx];
          if(!check(ny, nx)) continue;
          if(cave[ny][nx] === '.') continue;
          adjacentPos.push([ny, nx]);
        }
        return adjacentPos;
      }
    }
    return adjacentPos;
  }

  const bfs = (pos) => {
    const visited = Array.from({length: R}, () => Array(C).fill(false));
    let isG = false;
    let queue = [pos];
    visited[pos[0]][pos[1]] = true;

    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x] of queue) {
        if(!isG && y === R - 1) isG = true;
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue
          if(cave[ny][nx] === '.') continue;
          if(visited[ny][nx]) continue;
          visited[ny][nx] = true;
          nextQueue.push([ny, nx]);
        }
      }
      queue = nextQueue;
    }

    if(isG) return false;

    const heights = Array(C).fill( Number.MAX_SAFE_INTEGER);

    for(let x = 0; x < C; x++) {
      let g = R;
      for(let y = R - 1; y >= 0; y--) {
        if(visited[y][x]) {
          heights[x] = g - y - 1;
          break;
        }
        if(cave[y][x] === 'x') {
          g = y;
        }
      }
    }

    let min = Math.min(...heights);

    for(let y = R - 1; y >= 0; y--) {
      for(let x = 0; x < C; x++) {
        if(visited[y][x]) {
          cave[y][x] = '.';
          cave[y + min][x] = 'x';
        }
      }
    }
    return true;
  }

  for(let cnt = 0; cnt < N; cnt++) {
    const adjacentPos = go(cnt % 2 === 0, R - h[cnt] + 1);
    for(const pos of adjacentPos) {
      if(bfs(pos)) break;
    }
  }

  return cave.map(e => e.join('')).join('\n');
}