// https://www.acmicpc.net/problem/1726
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `5 6
0 0 0 0 0 0
0 1 1 0 1 0
0 1 0 0 0 0
0 0 1 1 1 0
1 0 0 0 0 0
4 2 3
2 4 1`;
const [mn, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
const re = data.pop();
const rs = data.pop();
console.log(solution(mn, data, rs, re));

function solution([m, n], orbit, [sy, sx, sd], [ey, ex, ed]) {
  const direction = [[0, 1],[0, -1],[1, 0],[-1, 0]]; // 동 서 남 북
  const check = (y, x) => 0 <= y && y < m && 0 <= x && x < n;
  const go = (y, x, dir, k) => {
    const [dy, dx] = direction[dir];
    const [ny, nx] = [dy * k + y, dx * k + x];
    return [ny, nx];
  }
  const tl = (dir) => {
    switch(dir) {
    case 0: return 3;
    case 1: return 2;
    case 2: return 0;
    case 3: return 1;
    }
  }

  const tr = (dir) => {
    switch(dir) {
    case 0: return 2;
    case 1: return 3;
    case 2: return 1;
    case 3: return 0;
    }
  }

  let queue = [[sy - 1, sx - 1, sd - 1, 0]];
  const visited = Array.from({length: m}, () => Array.from({length: n}, () => Array(4).fill(false)));
  visited[sy - 1][sx - 1][sd - 1] = true;
  while(queue.length > 0) {
    const nextQueue = [];
    for(const [y, x, d, cnt] of queue) {
      if(y === ey - 1 && x === ex - 1 && ed - 1 === d) {
        return cnt;
      }
      if(!visited[y][x][tl(d)]) {
        visited[y][x][tl(d)] = true;
        nextQueue.push([y, x, tl(d), cnt + 1]);
      }
      if(!visited[y][x][tr(d)]) {
        visited[y][x][tr(d)] = true;
        nextQueue.push([y, x, tr(d), cnt + 1]);
      }
      const [ny1, nx1] = go(y, x, d, 1);    
      const [ny2, nx2] = go(y, x, d, 2);    
      const [ny3, nx3] = go(y, x, d, 3);
      if(!check(ny1, nx1)) continue;
      if(orbit[ny1][nx1] === 1) continue;
      if(!visited[ny1][nx1][d]) {
        visited[ny1][nx1][d] = true;
        nextQueue.push([ny1, nx1, d, cnt + 1]);
      } 
      if(!check(ny2, nx2)) continue;
      if(orbit[ny2][nx2] === 1) continue;
      if(!visited[ny2][nx2][d]) {
        visited[ny2][nx2][d] = true;
        nextQueue.push([ny2, nx2, d, cnt + 1]);
      }
      if(!check(ny3, nx3)) continue;
      if(orbit[ny3][nx3] === 1) continue;
      if(!visited[ny3][nx3][d]) {
        visited[ny3][nx3][d] = true;
        nextQueue.push([ny3, nx3, d, cnt + 1]);
      }
      
    }
    queue = nextQueue;
  }
}