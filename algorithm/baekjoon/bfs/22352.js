// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `3 5
1 1 1 3 3
1 1 2 3 3
1 1 2 2 4
1 1 1 4 4
1 1 2 4 4
1 1 2 2 4`;
const [nm, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(nm, data));

function solution([n, m], data) {
  const visited = Array.from({length: n}, () => Array(m).fill(false));
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < m;
  let cnt = 0;
  
  const bfs = (iy, ix) => {
    const pv = data[iy][ix];
    const nv = data[iy + n][ix];
    let queue = [[iy, ix]];
    visited[iy][ix] = true;
    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x] of queue) {
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(data[ny][nx] !== pv) continue;
          if(data[ny + n][nx] !== nv) return false;
          visited[ny][nx] = true;
          nextQueue.push([ny, nx]);
        }
      }
      queue = nextQueue;
    }
    if(pv !== nv) cnt++;
    return true;
  }

  for(let y = 0; y < n; y++) {
    for(let x = 0; x < m; x++) {
      if(visited[y][x]) continue;
      if(!bfs(y, x)) return 'NO';
      if(cnt > 1) return 'NO';
    }
  }
  return 'YES';
}