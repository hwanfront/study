// https://www.acmicpc.net/problem/17142
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 1
2 2 2 1 1
2 1 1 1 1
2 1 1 1 1
2 1 1 1 1
2 2 2 1 1`;
const direction = [[-1, 0],[0, 1],[1, 0],[0, -1]];
const [NM, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NM, data));

function solution ([N, M], data) {
  const virus = [];
  const initData = Array.from({length: N}, () => Array(N).fill(-1));
  let result = Number.MAX_SAFE_INTEGER;;

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      if(data[i][j] === 2) {
        virus.push([i, j, 0]);
        initData[i][j] = '*';
      }
      if(data[i][j] === 1) {
        initData[i][j] = '-';
      }
    }
  }

  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < N;

  const bfs = (arr) => {
    let queue = arr;
    const map = JSON.parse(JSON.stringify(initData));
    let max = 0;
    for(const [y, x] of queue) {
      map[y][x] = 0;  
    }

    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [y, x, cnt] = queue[i];
        for(const [dy, dx] of direction) {
          const ny = y + dy;
          const nx = x + dx;
          if(!check(ny, nx)) continue;
          if(map[ny][nx] === '-') continue;
          if(map[ny][nx] >= 0) continue;
          if(map[ny][nx] === '*') {
            map[ny][nx] = cnt + 1;
            nextQueue.push([ny, nx, cnt + 1]);
          } else {
            map[ny][nx] = cnt + 1;
            nextQueue.push([ny, nx, cnt + 1]);
            max = Math.max(max, cnt + 1);
          }
        }
      }
      queue = nextQueue;
    }

    for(const line of map) {
      for(const p of line) {
        if(p === -1) return;
      }
    }
    result = Math.min(max, result);
  }

  const dfs = (idx, arr) => {
    if(arr.length === M) {
      bfs(arr);
      return;
    }

    for(let i = idx; i < virus.length; i++) {
      dfs(i + 1, arr.concat([virus[i]]));
    }

  }

  dfs(0, []);

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
}