// https://www.acmicpc.net/problem/6087
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `7 4
...C...
C......
.*****.
.......`;
const [wh, ...data] = input.split`\n`;
console.log(solution(wh.split` `.map(Number), data));

function solution([w, h], data) {
  const visited = Array.from({length: h}, () => Array.from({length: w}, () => Array(2).fill(false)));
  const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const check = (y, x) => 0 <= y && y < h && 0 <= x && x < w;

  const c = [];

  for(let y = 0; y < h; y++) {
    if(c.length === 2) break;
    for(let x = 0; x < w; x++) {
      if(data[y][x] === 'C') {
        c.push([y, x]);
        data[y][x] = '.';
      }
    }
  }

  const bfs = () => {
    let cnt = -1;
    let queue = [];
    visited[c[0][0]][c[0][1]].fill(true);
    queue.push([c[0][0], c[0][1], 0]);
    queue.push([c[0][0], c[0][1], 1]);

    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x, d] of queue) {
        if(y === c[1][0] && x === c[1][1]) return cnt;
        for(let i = 0; i < 4; i++) {
          if(i % 2 === d) continue;
          const [dy, dx] = direction[i];
          const nd = i % 2;
          let j = 1;
          while(1) {
            const [ny, nx] = [dy * j + y, dx * j + x];
            if(!check(ny, nx)) break;
            if(visited[ny][nx][nd]) break;
            if(data[ny][nx] === '*') break;
            visited[ny][nx][nd] = true;
            nextQueue.push([ny, nx, nd]);
            j++;
          }
        }
      }
      cnt++;
      queue = nextQueue;
    }
  }
  return bfs();
}