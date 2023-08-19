// https://www.acmicpc.net/problem/17472
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `7 8
0 0 0 0 0 0 1 1
1 1 0 0 0 0 1 1
1 1 0 0 0 0 0 0
1 1 0 0 0 1 1 0
0 0 0 0 0 1 1 0
0 0 0 0 0 0 0 0
1 1 1 1 1 1 1 1`;
const [NM, ...grid] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NM, grid));
function solution ([N, M], grid) {
  let result = 0;
  const direction = [[-1, 0],[0, 1],[1, 0],[0, -1]];
  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < M;

  const myMap = Array.from({length: N}, () => Array(M).fill(0));
  let island = 0;

  const bfs = (i, j) => {
    let queue = [[i, j]];
    myMap[i][j] = island;

    while(queue.length > 0){
      const nextQueue = [];
      for(const [y, x] of queue) {
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(grid[ny][nx] === 0) continue;
          if(myMap[ny][nx] === island) continue;
          myMap[ny][nx] = island;
          nextQueue.push([ny, nx]);
        }
      }
      queue = nextQueue;
    }
  }

  const findIsland = (y, x, dy, dx) => {
    const from = myMap[y][x];
    let cnt = -1;
    let [ny, nx] = [y, x];
    while(1) {
      cnt++;
      [ny, nx] = [dy + ny, dx + nx];
      if(!check(ny, nx)) return;
      if(myMap[ny][nx] === 0) continue;
      if(myMap[ny][nx] === from) return;
      break;
    }
    const to = myMap[ny][nx];
    if(cnt < 2) return;
    bridge[from][to] = Math.min(bridge[from][to], cnt);
    bridge[to][from] = Math.min(bridge[to][from], cnt);
  }
  
  for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
      if(grid[i][j] === 0) continue;
      if(myMap[i][j] !== 0) continue;
      island++;
      bfs(i, j);
    }
  }

  const bridge = Array.from({ length: island + 1 }, () => Array(island + 1).fill(Number.MAX_SAFE_INTEGER));

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
      if(myMap[i][j] === 0) continue;
      for(const [dy, dx] of direction) {
        findIsland(i, j, dy, dx);
      }
    }
  }

  const edges = [];
  
  for(let i = 1; i <= island; i++) {
    for(let j = i + 1; j <= island; j++) {
      if(bridge[i][j] === Number.MAX_SAFE_INTEGER) continue;
      edges.push([i, j, bridge[i][j]]);
    }
  }

  edges.sort((a, b) => a[2] - b[2]);

  const parent = Array.from({ length: island + 1 }, (_, i) => i);

  const find = (x) => {
    if(x === parent[x]) return x;
    return parent[x] = find(parent[x]);
  }

  const union = (x, y) => {
    const s1 = find(x);
    const s2 = find(y);
    
    if(s1 === s2) return;
    if(s1 < s2) parent[s2] = s1;
    else parent[s1] = s2;
  }

  const getSameParent = (x, y) => {
    const s1 = find(x);
    const s2 = find(y);
    return s1 === s2;
  }

  for(const [x, y, cost] of edges) {
    if(getSameParent(x, y)) continue;
    union(x, y);
    result += cost;
  }

  for(let i = 2; i < parent.length; i++) {
    if(!getSameParent(i - 1, i)) return -1;
  }
  
  return result;
}
