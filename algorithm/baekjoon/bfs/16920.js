// https://www.acmicpc.net/problem/16920
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4 4 2
2 1
1..1
....
#...
.#.2`;
const [NMP, S, ...grid] = input.split('\n');
console.log(solution(NMP.split(' ').map(Number), [0].concat(S.split(' ').map(Number)), grid.map(e => e.split(''))));

function solution ([N, M, P], S, grid) {
  const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const queue = Array.from({length: P + 1}, () => ([]));
  const result = Array(P).fill(0);
  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < M;
  const bfs = (idx) => {
    let q = queue[idx].map(([y, x]) => ([y, x, S[idx]]));
    while(q.length > 0) {
      const nextQueue = [];
      for(let i = 0; i < q.length; i++) {
        const [y, x, s] = q[i];
        if(s === 0) {
          queue[idx] = q;
          return;
        }
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(grid[ny][nx] !== '.') continue;
          grid[ny][nx] = (idx).toString();
          nextQueue.push([ny, nx, s - 1]);
        }
      }
      q = nextQueue;
    }
    queue[idx] = [];
  }


  for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
      if(grid[i][j] !== '.' && grid[i][j] !== '#') { 
        queue[+grid[i][j]].push([i, j]);
      }
    }
  }

  while(1) {
    let cnt = 0;
    for(let i = 1; i <= P; i++) {
      bfs(i);
      if(queue[i].length === 0) {
        cnt++;
      }
    }
    if(cnt === P) break;
  }

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
      if(grid[i][j] !== '.' && grid[i][j] !== '#') {
        result[grid[i][j] - 1]++;
      }
    }
  }

  return result;
}