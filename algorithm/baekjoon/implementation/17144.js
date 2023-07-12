// https://www.acmicpc.net/problem/17144
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `7 8 50
0 0 0 0 0 0 0 9
0 0 0 0 3 0 0 8
-1 0 5 0 0 0 22 0
-1 8 0 0 0 0 0 0
0 0 0 0 0 10 43 0
0 0 5 0 15 0 0 0
0 0 40 0 0 0 20 0`;
const direction = [[-1, 0],[0, 1],[1, 0],[0, -1]];
const [RCT, ...A] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(RCT, A));

function solution ([R, C, T], data) {
  const ap = [];
  let map = JSON.parse(JSON.stringify(data));

  data.some((line, y) => {
    if(line[0] === -1) {
      ap.push(y);
      ap.push(y + 1);
      return true;
    }
    return false;
  })

  const check = (y, x, r1, r2, c) => r1 <= y && y < r2 && 0 <= x && x < c;

  const spread = (y, x, newMap) => {
    const s = Math.floor(map[y][x] / 5);
    let cnt = 0;
    for(const [dy, dx] of direction) {
      const nx = dx + x;
      const ny = dy + y;
      if(!check(ny, nx, 0, R, C)) continue;
      if(nx === 0 && ap.includes(ny)) continue;
      newMap[ny][nx] += s;
      cnt++;
    }
    newMap[y][x] += map[y][x] - s * cnt;
  }

  const run = (newMap) => {
    let [ty, by] = ap;
    let [tx, bx] = [0, 0];
    for(const [dy, dx] of direction) {
      while(1) {
        const nx = dx + tx;
        const ny = dy + ty;
        if(!check(ny, nx, 0, ap[0] + 1, C)) break;
        newMap[ty][tx] = newMap[ny][nx];
        ty = ny;
        tx = nx;
      }
    }

    for(const [dy, dx] of [[1, 0],[0, 1],[-1, 0],[0, -1]]) {
      while(1) {
        const nx = dx + bx;
        const ny = dy + by;
        if(!check(ny, nx, ap[0] + 1, R, C)) break;
        newMap[by][bx] = newMap[ny][nx];
        by = ny;
        bx = nx;
      }
    }
    newMap[ap[0]][1] = 0;
    newMap[ap[1]][1] = 0;
    newMap[ap[0]][0] = -1;
    newMap[ap[1]][0] = -1;
  }

  for(let k = 0; k < T; k++) {
    let newMap = Array.from({length: R}, () => Array(C).fill(0));
    for(let i = 0; i < R; i++) {
      for(let j = 0; j < C; j++) {
        if(map[i][j] > 4) {
          spread(i, j, newMap);
        } else {
          newMap[i][j] += map[i][j];
        }
      }
    }
    run(newMap);
    map = newMap;
  }

  return map.reduce((prev, cur) => prev + cur.reduce((p, c) => p + c, 0), 0) + 2;
}