// https://www.acmicpc.net/problem/17141
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 2
1 1 1 1 1
1 1 2 1 1
1 1 2 1 1
1 1 1 1 1
1 1 1 1 1`;
const [NM, ...labs] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NM, labs));
function solution ([N, M], labs) {
  let result = Number.MAX_SAFE_INTEGER;
  const direction = [[-1, 0],[0, 1],[1, 0],[0, -1]];
  const vrs = [];
  const v = Array(vrs.length).fill(false);
  
  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      if(labs[i][j] === 2) vrs.push([i, j]);
    }
  }

  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < N;
  const bfs = (virus) => {
    const visited = JSON.parse(JSON.stringify(labs));
    let queue = [...virus];
    let res = -1;
    virus.forEach(([y, x]) => visited[y][x] = -1);

    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x] of queue) {
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(visited[ny][nx] === 1) continue;
          if(visited[ny][nx] === -1) continue;
          visited[ny][nx] = -1;
          nextQueue.push([ny, nx]);
        }
      }
      queue = nextQueue;
      res++;
    }

    for(let i = 0; i < N; i++) {
      for(let j = 0; j < N; j++) {
        if(visited[i][j] === 0 || visited[i][j] === 2) return Number.MAX_SAFE_INTEGER; 
      }
    }
    return res;
  }

  const dfs = (virus, idx) => {
    if(virus.length === M) {
      result = Math.min(result, bfs(virus));
      return;
    }

    for(let i = idx; i < vrs.length; i++) {
      if(v[i]) continue;
      v[i] = true;
      dfs([...virus, vrs[i]], i);
      v[i] = false;
    }
  }

  dfs([], 0);

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
}