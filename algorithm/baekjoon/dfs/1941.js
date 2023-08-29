// https://www.acmicpc.net/problem/1941
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `YYYYY
SYSYS
YYYYY
YSYYS
YYYYY`;
const data = input.split('\n');
console.log(solution(data)); 

function solution (data) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const visited = Array.from({length: 5}, () => Array(5).fill(false));
  let result = 0;

  const check = (y, x) => 0 <= y && y < 5 && 0 <= x && x < 5;

  const bfs = (i, j) => {
    const v = JSON.parse(JSON.stringify(visited));
    let cnt = 1;
    let queue = [[i, j]]
    v[i][j] = false;

    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x] of queue) {
        if(cnt === 7) return true;
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(!v[ny][nx]) continue;
          v[ny][nx] = false;
          nextQueue.push([ny, nx]);
          cnt++;
        }
      }
      queue = nextQueue;
    }
    return false;
  }

  const find = (idx, sc, yc) => {
    if(yc >= 4) return;
    if(sc + yc === 7) {
      const i = Math.floor(idx / 5);
      const j = idx % 5;
      if(bfs(i, j)) result++;
      return;
    }

    for(let i = idx; i < 25; i++) {
      const y = Math.floor(i / 5);
      const x = i % 5;
      if(visited[y][x]) continue;
      visited[y][x] = true;
      if(data[y][x] === 'S') find(i, sc + 1, yc);
      else find(i, sc, yc + 1);
      visited[y][x] = false;
    }
  }

  find(0, 0, 0);

  return result;
}
