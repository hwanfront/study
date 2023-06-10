// https://www.acmicpc.net/problem/1938
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4
000E
BBBE
000E
0000`;
const directionTurnH = [[-1, -1],[0, -1],[1, -1],[-1, 1],[0, 1],[1, 1]];
const directionTurnV = [[-1, -1],[-1, 0],[-1, 1],[1, -1],[1, 0],[1, 1]];
const direction = [[-1, 0],[0, 1],[1, 0],[0, -1]];
const [N, ...data] = input.split('\n');
console.log(solution(Number(N), data));

function solution (N, data) {
  const BBB = [];
  const EEE = [];
  data.forEach((line, y) => {
    for(let x = 0; x < line.length; x++) {
      if(line[x] === 'B') {
        BBB.push([y, x]);
      }
      if(line[x] === 'E') {
        EEE.push([y, x]);
      }
    }
  });
  const check = ([y, x]) => 0 <= x && x < N && 0 <= y && y < N && data[y][x] !== '1';
  const checkV = (vh) => vh === 0;
  const checkEEEPoint = (y, x, vh) => {
    if(data[y][x] !== 'E') return false;
    if(checkV(vh)) {
      if(data[y][x - 1] !== 'E') return false;
      if(data[y][x + 1] !== 'E') return false;
    } else {
      if(data[y - 1][x] !== 'E') return false;
      if(data[y + 1][x] !== 'E') return false;
    }
    return true;
  }
  const checkTurnable = (y, x, isV) => {
    for(const [dy, dx] of isV ? directionTurnV : directionTurnH) {
      if(!check([dy + y, dx + x])) {
        return false;
      }
    }
    return true;
  }

  const bfs = () => {
    const visited = Array.from({ length: N }, () => Array.from({length: N}, () => ([false, false])));
    let queue = [[BBB[1][0], BBB[1][1], BBB[0][0] === BBB[1][0] ? 0 : 1, 0]];
    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [y, x, vh, cnt] = queue[i];

        if(visited[y][x][vh]) continue;
        visited[y][x][vh] = true;
        if(checkEEEPoint(y, x, vh)) {
          return cnt;
        }

        if(checkTurnable(y, x, checkV(vh))) {
          nextQueue.push([y, x, vh === 0 ? 1 : 0, cnt + 1]);
        }

        for(const [dy, dx] of direction) {
          const ny = dy + y;
          const nx = dx + x;
          if(!check([ny, nx])) continue;
          if(visited[ny][nx][vh]) continue;
          if(checkV(vh)) {
            if(!check([ny, nx - 1])) continue;
            if(!check([ny, nx + 1])) continue;
            nextQueue.push([ny, nx, 0, cnt + 1])
          } else {
            if(!check([ny - 1, nx])) continue;
            if(!check([ny + 1, nx])) continue;
            nextQueue.push([ny, nx, 1, cnt + 1])
          }
        }
      }
      queue = nextQueue;
    }
    return 0;
  }
  return bfs();
}