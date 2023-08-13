// https://www.acmicpc.net/problem/
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `1
4 4
0 0 0 0
1 0 0 0
0 0 1 0
0 1 0 0`;
const [K, WH, ...grid] = input.split('\n');
console.log(solution(+K, WH.split(' ').map(Number), grid.map(e => e.split(' ').map(Number))));

function solution (K, [W, H], grid) {
  const directionM = [[-1,0],[0,1],[1,0],[0,-1]];
  const directionH = [[-1,-2],[-2,-1],[-2,1],[-1,2],[1,2],[2,1],[2,-1],[1,-2]];
  const check = (y, x) => 0 <= y && y < H && 0 <= x && x < W;
  const bfs = () => {
    const visited = Array.from({length: H}, () => Array.from({length: W}, () => Array(9).fill(false)));
    let queue = [[0, 0, 0, 0]]
    while(queue.length > 0) {
      const nextQueue = [];
      for(let i = 0; i < queue.length; i++) {
        const [y, x, a, cnt] = queue[i];

        if(y === H - 1 && x === W - 1) return cnt;

        if(a !== K) {
          for(const [dy, dx] of directionH) {
            const [ny, nx] = [dy + y, dx + x];
            if(!check(ny, nx)) continue;
            if(visited[ny][nx][a + 1]) continue;
            if(grid[ny][nx] === 1) continue;
            visited[ny][nx][a + 1] = true;
            nextQueue.push([ny, nx, a + 1, cnt + 1]);
          }
        }

        for(const [dy, dx] of directionM) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(visited[ny][nx][a]) continue;
          if(grid[ny][nx] === 1) continue;
          visited[ny][nx][a] = true;
          nextQueue.push([ny, nx, a, cnt + 1]);
        }
      }
      queue = nextQueue;
    }
    return -1;
  }
  return bfs();
}