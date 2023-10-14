// https://www.acmicpc.net/problem/10711
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 

const input = `10 10
..........
.99999999.
.9.323239.
.91444449.
.91444449.
.91444449.
.91444449.
.91232329.
.99999999.
..........`;
const [hw, ...data] = input.split('\n');
console.log(solution(hw.split(' ').map(Number), data.map(e => e.split(''))));

function solution ([h, w], data) {
  const direction = [[0, 1],[1, 1],[1 ,0],[1, -1],[0, -1],[-1, -1],[-1, 0],[-1, 1]];
  const check = (y, x) => 0 <= y && y < h && 0 <= x && x < w;
  const visited = Array.from({length: h}, () => Array(w).fill(-1));

  const bfs = (pos) => {
    let queue = pos;
    let wave = 0;

    while(queue.length > 0) {
      wave++;
      for(const [y, x] of queue) {
        data[y][x] = '.';
      }

      const nextQueue = []

      for(const [y, x] of queue) {
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(visited[ny][nx] === wave) continue;
          visited[ny][nx] = wave;
          let cnt = 0;
          for(const [ddy, ddx] of direction) {
            const [nny, nnx] = [ny + ddy, nx + ddx];
            if(!check(nny, nnx)) continue;
            if(data[nny][nnx] === '.') cnt++;
          }
          if(cnt >= +data[ny][nx]) {
            nextQueue.push([ny, nx]);
          }
        }
      }
      queue = nextQueue;
    }
    return wave;
  }

  const arr = [];
  
  for(let y = 0; y < h; y++) {
    for(let x = 0; x < w; x++) {
      if(data[y][x] === '.' || data[y][x] === '9') continue;
      let cnt = 0;
      for(const [dy, dx] of direction) {
        const [ny, nx] = [dy + y, dx + x];
        if(!check(ny, nx)) continue;
        if(data[ny][nx] === '.') cnt++;
      }
      if(cnt >= +data[y][x]) arr.push([y, x])
    }
  }

  if(arr.length === 0) return 0;
  return bfs(arr);
}
