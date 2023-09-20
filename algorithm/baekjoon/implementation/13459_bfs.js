// https://www.acmicpc.net/problem/
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `3 10
##########
#.O....RB#
##########`;
const [nm, ...data] = input.split('\n');
console.log(solution(nm.split(' ').map(Number), data.map(e => e.split(''))));

function solution ([n, m], data) {
  const visited = Array.from({length: n}, 
  () => Array.from({length: m}, 
  () => Array.from({length: n}, 
  () => Array(m).fill(false))));
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  let b, r;
  for(let i = 1; i < n - 1; i++) {
    for(let j = 1; j < m - 1; j++) {
      if(data[i][j] === 'B') {
        b = [i, j];
        data[i][j] = '.';
        continue;
      }
      if(data[i][j] === 'R') {
        r = [i, j];
        data[i][j] = '.';
        continue;
      }
    }
  }

  const move = (y, x, dy, dx) => {
    let cnt = 0;
    while(1) {
      if(data[y + dy * (cnt + 1)][x + dx * (cnt + 1)] === '#') break;
      if(data[y + dy * cnt][x + dx * cnt] === 'O') break;
      cnt++;
    }
    return cnt;
  }
  
  const bfs = () => {
    let queue = [[r[0],r[1], b[0],b[1], 0]];
    while(queue.length > 0) {
      const nextQueue = []
      for(const [ry, rx, by, bx, cnt] of queue) {
        if(cnt === 10) break;
        for(const [dy, dx] of direction) {
          const rc = move(ry, rx, dy, dx);
          const bc = move(by, bx, dy, dx);
          let [nry, nrx] = [ry + dy * rc, rx + dx * rc];
          let [nby, nbx] = [by + dy * bc, bx + dx * bc];
          if(data[nby][nbx] === 'O') continue;
          if(data[nry][nrx] === 'O') return 1;

          if(nry === nby && nrx === nbx) {
            if(rc < bc) {
              nby -= dy;
              nbx -= dx;
            } else {
              nry -= dy;
              nrx -= dx;
            }
          }
          if(visited[nry][nrx][nby][nbx]) continue;
          visited[nry][nrx][nby][nbx] = true;
          nextQueue.push([nry, nrx, nby, nbx, cnt + 1]);
        }
      }
      queue = nextQueue;
    }
    return 0;
  }

  return bfs();
}
