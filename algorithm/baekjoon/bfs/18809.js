// https://www.acmicpc.net/problem/18890
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `13 17 2 4
1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 0
1 1 0 0 1 1 1 1 1 1 0 1 1 1 1 1 1
1 0 1 1 1 1 0 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 0 1 1 2 1 1 1 1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1
1 1 1 1 1 1 0 1 1 1 0 1 0 1 1 1 1
1 1 1 1 1 1 1 2 1 1 1 1 1 1 0 1 1
1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1
1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1
2 1 1 1 1 1 2 1 1 1 1 2 1 1 1 1 1
2 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1`;
const [nmgr, ...garden] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(nmgr, garden)); 
function solution ([n, m, g, r], garden) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  let result = 0;
  const s = [];

  for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
      if(garden[i][j] === 2) s.push([i, j]);
    }
  }
  const v1 = [];
  const v2 = [];
  const ps = [];

  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < m
  const sow = (v, p) => {
    const visited = Array.from({length: n}, () => Array.from({length: m}, () => ([-1, -1])));
    let queue = v.map(([y, x], idx) => [y, x, p[idx], 0]);
    let res = 0;
    for(const [y, x, c, cnt] of queue) {
      visited[y][x][0] = c;
      visited[y][x][1] = -1;
    }
    while(queue.length > 0) {
      const nextQueue = [];
      for(let i = 0; i < queue.length; i++) {
        const [y, x, c, cnt] = queue[i];
        if(visited[y][x][0] === 0) continue;
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(garden[ny][nx] === 0) continue;
          if(visited[ny][nx][0] === -1) {
            visited[ny][nx] = [c, cnt];
            nextQueue.push([ny, nx, c, cnt + 1]);
            continue;
          } 
          if(visited[ny][nx][0] === 0) continue;
          if(visited[ny][nx][0] === c) continue;
          if(visited[ny][nx][1] !== cnt) continue;
          visited[ny][nx] = [0, cnt];
          res++;
        }
      }
      queue = nextQueue;
    }
    return res;
  }

  const find1 = (idx) => {
    if(v1.length === g + r) {
      for(const p of ps) {
        result = Math.max(result, sow(v1.map((i) => s[i]), p));
      }
      return;
    }

    for(let i = idx; i < s.length; i++) {
      v1.push(i);
      find1(i + 1);
      v1.pop();
    }
  }

  const find2 = (cnt, gc, rc) => {
    if(cnt === g + r) {
      if(gc > g) return;
      if(rc > r) return;
      ps.push([...v2]);
      return;
    }

    for(let i = 1; i <= 2; i++) {
      v2.push(i);
      if(i === 1) {
        find2(cnt + 1, gc + 1, rc);
      } else {
        find2(cnt + 1, gc, rc + 1);
      }
      v2.pop();
    }
  }

  find2(0, 0, 0);
  find1(0);

  return result;
}
