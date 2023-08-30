// https://www.acmicpc.net/problem/1799
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `4
1 1 1 1
1 1 1 1
1 1 1 1
1 1 1 1`;
const [n, ...board] = input.split('\n');
console.log(solution(+n, board.map(e => e.split(' ')))); 

function solution (n, board) {
  const visited = Array.from({length: n}, () => Array(n).fill(false));
  const direction = [[-1, -1],[-1, 1],[1, -1],[1, 1]];
  const nn = n * n;
  let max = 0;
  let result = 0;
  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < n;
  const dfs = (idx, cnt, visited, o) => {
    max = Math.max(max, cnt);
    for(let i = idx; i < nn; i++) {
      const y = Math.floor(i / n);
      const x = i % n;
      if(o) {
        if((y + x) % 2 === 0) continue;
      } else {
        if((y + x) % 2 === 1) continue;
      }
      if(board[y][x] === '0') continue;
      if(visited[y][x]) continue;
      const newVisited = JSON.parse(JSON.stringify(visited));
      newVisited[y][x] = true;
      for(const [dy, dx] of direction) {
        let n = 1;
        while(1) {
          const [ny, nx] = [y + dy * n, x + dx * n];
          if(!check(ny, nx)) break;
          newVisited[ny][nx] = true;
          n++;
        }
      }
      dfs(i + 1, cnt + 1, newVisited, o);
    }
  }
  dfs(0, 0, visited, true);
  result += max;
  max = 0;
  dfs(0, 0, visited, false);
  return result + max;
}