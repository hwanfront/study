// https://www.acmicpc.net/problem/23289
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `7 8 1000
0 0 0 0 0 0 0 0
4 4 4 4 4 4 4 4
0 0 0 0 0 5 0 0
0 0 5 5 0 0 5 0
0 0 0 0 0 5 0 0
5 0 0 0 0 0 5 0
3 3 3 3 3 3 3 3
3
4 4 1
5 4 0
5 6 0`;
const [RCK, ...etc] = input.split('\n').map(e => e.split(' ').map(Number));
const room = etc.slice(0, RCK[0]);
const W = etc[RCK[0]][0];
const info = etc.slice(RCK[0] + 1);
console.log(solution(RCK, room, W, info));

function solution ([R, C, K], room, W, info) {
  const wall = Array.from({length: R + 1}, () => Array.from({length: C + 1}, () => Array(5).fill(false)));
  const warmerDirection = [null, [0,1],[0,-1],[-1,0],[1,0]]; // 1우 2좌 3상 4하
  const windDirection = [
    null, 
    [[-1,1],[0,1],[1,1]],
    [[-1,-1],[0,-1],[1,-1]],
    [[-1,-1],[-1,0],[-1,1]],
    [[1,-1],[1,0],[1,1]],
  ];

  const wallCheckDirection = [
    null,
    [[3,2],,[4,2]],
    [[3,1],,[4,1]],
    [[2,4],,[1,4]],
    [[2,3],,[1,3]],
  ]
  const ctrlDirection = [[0, 1], [1, 0]];
  
  let eat = 0;
  let troom = Array.from({length: R + 1}, () => Array(C + 1).fill(0)); 
  const checkPlace = [];
  const warmers = [];

  for(let i = 0; i < R; i++) {
    for(let j = 0; j < C; j++) {
      if(room[i][j] === 0) continue;
      if(room[i][j] === 5) checkPlace.push([i + 1, j + 1]);
      else warmers.push([i + 1, j + 1, room[i][j]]);
    }
  }

  for(const [x, y, t] of info) {
    if(t === 1) { // 좌->우
      wall[x][y][1] = true;
      wall[x][y + 1][2] = true;
    } else { // 하->상
      wall[x][y][3] = true;
      wall[x - 1][y][4] = true;
    }
  }

  const check = (r, c) => 0 < r && r <= R && 0 < c && c <= C;
  const checkWall = (r, c, nr, nc, d, j) => {
    if(j === 1) {
      return wall[r][c][d];
    }
    const num1 = wallCheckDirection[d][j][0];
    const num2 = wallCheckDirection[d][j][1];
    return wall[r][c][num1] || wall[nr][nc][num2];
  }
  const on = ([ir, ic, d]) => {
    const visited = Array.from({length: R + 1}, () => Array(C + 1).fill(false));
    let queue = [[ir + warmerDirection[d][0], ic + warmerDirection[d][1], 5]];
    visited[ir + warmerDirection[d][0]][ic + warmerDirection[d][1]] = true;
    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [r, c, cnt] = queue[i];
        troom[r][c] += cnt;
        if(cnt === 1) continue;
        for(let j = 0; j < 3; j++) {
          const [dr, dc] = windDirection[d][j];
          const [nr, nc] = [dr + r, dc + c];
          if(!check(nr, nc)) continue;
          if(visited[nr][nc]) continue;
          if(checkWall(r, c, nr, nc, d, j)) continue;
          visited[nr][nc] = true;
          nextQueue.push([nr, nc, cnt - 1]);
        }
      }
      queue = nextQueue;
    }
  }

  const ctrlCheck = (y, x, i) => {
    if(i === 0) {
      return wall[y][x][1];
    } else {
      return wall[y][x][4];
    }
  }

  const tmprCtrl = (troom) => {
    const newTroom = JSON.parse(JSON.stringify(troom));
    for(let y = 1; y <= R; y++) {
      for(let x = 1; x <= C; x++) {
        for(let i = 0; i < 2; i++) {
          const [dy, dx] = ctrlDirection[i];
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(ctrlCheck(y, x, i)) continue;
          const v1 = troom[y][x];
          const v2 = troom[ny][nx];
          const diff = Math.floor(Math.abs(v1 - v2) / 4);
          if(v1 > v2) {
            newTroom[y][x] -= diff;
            newTroom[ny][nx] += diff;
          } else {
            newTroom[y][x] += diff;
            newTroom[ny][nx] -= diff;
          }
        }
      }
    }
    return newTroom;
  }

  const tmprCheck = () => {
    for(const [y, x] of checkPlace) {
      if(troom[y][x] < K) return false;
    }
    return true;
  }

  while(eat <= 100) {
    for(let i = 0; i < warmers.length; i++) {
      on(warmers[i]);  
    }

    troom = tmprCtrl(troom);

    for(let i = 1; i < R; i++) {
      troom[i][1] === 0 ? 0 : troom[i][1]--;
      troom[i + 1][C] === 0 ? 0 : troom[i + 1][C]--;
    }

    for(let i = 1; i < C; i++) {
      troom[1][i + 1] === 0 ? 0 : troom[1][i + 1]--;
      troom[R][i] === 0 ? 0 : troom[R][i]--;
    }
    
    eat++
    if(tmprCheck()) break;
  }

  return eat;
}