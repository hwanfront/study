// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `........
........
........
........
........
.#......
#.......
.#......`;
const data = input.split`\n`;
console.log(solution(data));

function solution(data) {
  const direction = [[-1,-1],[-1,0],[-1,1],[0,-1],[0, 0],[0,1],[1,-1],[1,0],[1,1]];
  let now = 0;
  const check = (y, x) => 0 <= y && y < 8 && 0 <= x && x < 8;
  const dfs = () => {
    let queue = [[7, 0]];
    while(queue.length > 0) {
      const visited = Array.from({length: 8}, () => Array(8).fill(false));
      const nextQueue = [];
      for(const [y, x] of queue) {
        if(now === 8) return true;
        if(y === 0 && x === 7) return true;
        if(0 <= y - now && y - now < 8 && data[y - now][x] === '#') continue;
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(0 <= ny - now && ny - now < 8 && data[ny - now][nx] === '#') continue;
          visited[ny][nx] = true;
          nextQueue.push([ny, nx]);
        }
      }
      queue = nextQueue;
      now++;
    }
    return false;
  }
  return dfs() ? 1 : 0;
}