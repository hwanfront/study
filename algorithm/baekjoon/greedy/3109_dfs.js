/**
 * 조건 확인 확실하게!!
 */
// https://www.acmicpc.net/problem/3109
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `15 15
.xxxxxxxxxx....
...x.......xxx.
...x.......x...
..xx.......xx..
...x........xx.
.x.x......x.x..
...x......xx...
.x.x....xxx....
.x....x.x......
.x.....xx.x....
.x..x.xx.......
.....xx........
....x..........
......x........
...............`;
const [RC, ...grid] = input.split('\n');
console.log(solution(RC.split(' ').map(Number), grid.map(e => e.split(''))));

function solution ([R, C], grid) {
  const direction = [[-1, 1], [0, 1], [1, 1]];
  const check = (r, c) => 0 <= r && r < R && 0 <= c && c < C;
  const dfs = (r, c, visited) => {
    if(c === C - 1) {
      return true;
    }

    for(const [dr, dc] of direction) {
      const nr = r + dr;
      const nc = c + dc;
      if(!check(nr, nc)) continue;
      if(visited[nr][nc]) continue;
      if(grid[nr][nc] === 'x') continue;
      visited[nr][nc] = true;
      grid[nr][nc] = 'x';
      if(dfs(nr, nc, visited)) {
        return true;
      }
      grid[nr][nc] = '.';
    }
    return false;
  }

  const visited = Array.from({length: R}, () => Array(C).fill(false));
  let cnt = 0;

  for(let i = 0; i < R; i++) {
    if(grid[i][1] === 'x') continue;
    visited[i][1] = true;
    if(dfs(i, 1, visited)) {
      cnt++;
    }
  }
  return cnt;
}