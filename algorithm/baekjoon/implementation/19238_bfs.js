// https://www.acmicpc.net/problem/19238
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `6 3 15
0 0 1 0 0 0
0 0 1 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 1 0
0 0 0 1 0 0
6 5
2 2 5 6
5 4 1 6
4 2 3 5`;
const [NMF, ...etc] = input.split('\n').map(e => e.split(' ').map(Number));
const direction = [[-1, 0], [0, -1], [0, 1], [1, 0]];
const [N, M, F] = NMF;
const map = [Array(N).fill(-1)].concat(etc.slice(0, N)).map(line => [-1].concat(line).map(e => e === 1 ? -1 : 0));
let texiPos = etc[N];
const endPos = [null];
for(let i = 0; i < M; i++) {
  const [sy, sx, ey, ex] = etc[i + N + 1];
  map[sy][sx] = i + 1;
  endPos.push([ey, ex]);
}
console.log(solution(map, texiPos, endPos));

function solution (map, texiPos, endPos) {
  let customerCnt = M;
  let texiFuel = F;
  let customer = -1;

  const check = (y, x) => 0 < y && y <= N && 0 < x && x <= N;

  const findCustomer = () => {
    const [ty, tx] = texiPos;
    const visited = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));
    let queue = [[ty, tx, 0]];
    const customers = [];
    visited[ty][tx] = true;

    if(map[ty][tx] > 0) {
      customer = map[ty][tx];
      map[ty][tx] = 0;
      return true;
    }

    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [y, x, cnt] = queue[i];
        for(const [dy, dx] of direction) {
          const ny = dy + y;
          const nx = dx + x;
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(map[ny][nx] === -1) continue;
          if(map[ny][nx] === 0) {
            visited[ny][nx] = true;
            nextQueue.push([ny, nx, cnt + 1]);
          } else {
            visited[ny][nx] = true;
            customers.push([ny, nx, cnt + 1]);
          }
        }
      }
      if(customers.length > 0) {
        break;
      }
      queue = nextQueue;
    }


    if(customers.length > 0) {
      customers.sort(([ay, ax], [by, bx]) => {
        if(ay === by) return ax - bx;
        return ay - by;
      });
      const [cy, cx, cnt] = customers[0];
      texiPos = [cy, cx];
      texiFuel -= cnt;
      customer = map[cy][cx];
      map[cy][cx] = 0;
      return true;
    }
    return false;
  }

  const go = () => {
    const [ey, ex] = endPos[customer];
    const visited = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));
    let queue = [[texiPos[0], texiPos[1], 0]];
    visited[texiPos[0]][texiPos[1]] = true;
    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [y, x, cnt] = queue[i];
        for(const [dy, dx] of direction) {
          const ny = dy + y;
          const nx = dx + x;
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(map[ny][nx] === -1) continue;
          if(ny === ey && nx === ex) {
            if(texiFuel - (cnt + 1) < 0) {
              return false;
            }
            texiPos = [ny, nx];
            texiFuel += cnt + 1;
            customer = -1;
            return true;
          } else {
            visited[ny][nx] = true;
            nextQueue.push([ny, nx, cnt + 1]);
          }
        }
      }
      queue = nextQueue;
    }
    return false;
  }

  while(1) {
    if(customerCnt-- === 0) {
      break;
    }
    if(!findCustomer()) return -1;
    if(!go()) return -1;
  }

  return texiFuel;
}