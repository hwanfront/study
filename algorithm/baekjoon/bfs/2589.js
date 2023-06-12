// https://www.acmicpc.net/problem/2589
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 7
WLLWWWL
LLLWLLL
LWLWLWW
LWLWLLL
WLLWLWW`
const [nm, ...map] = input.split('\n');
const [n, m] = nm.split(' ').map(Number);
const direction = [[1, 0],[0, -1],[-1, 0],[0, 1]];
const check = (y, x) => 0 <= y && y < n && 0 <= x && x < m;
console.log(solution(n, m, map));

function solution (n, m, map) {
  let result = 0;

  const bfs = (start) => {
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    let res = 0;
    let queue = [];
    queue.push([...start, 0]);
    visited[start[0]][start[1]] = true;

    while(queue.length > 0) {
      const size = queue.length;
      const nextQeuue = [];
      for(let i = 0; i < size; i++) {
        const [y, x, cnt] = queue[i];
        res = Math.max(res, cnt);
        for(const [dy, dx] of direction) {
          const ny = dy + y;
          const nx = dx + x;
          if(!check(ny, nx)) continue;
          if(map[ny][nx] === 'W') continue;
          if(visited[ny][nx]) continue;
          nextQeuue.push([ny, nx, cnt + 1]);
          visited[ny][nx] = true;
        }
      }
      queue = nextQeuue;
    }
    return res;
  }

  for(let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if(map[i][j] === 'L') {
        result = Math.max(result, bfs([i, j]));
      }
    }
  }

  return result;
}