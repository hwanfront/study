// https://www.acmicpc.net/problem/1937
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4
14 9 12 10
1 11 5 4
7 15 2 13
6 3 16 8`;
const [n, ...forest] = input.split('\n');
console.log(solution(+n, forest.map(e => e.split(' ').map(Number))));

function solution (n, forest) {
  let result = 0;
  const dp = Array.from({length: n}, () => Array(n).fill(0));
  const direction = [[-1, 0],[0, 1],[1, 0],[0, -1]];
  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < n;
  const dfs = (y, x) => {
    if(dp[y][x] > 0) return dp[y][x];
    dp[y][x] = 1;
    for(const [dy, dx] of direction) {
      const [ny, nx] = [dy + y, dx + x];
      if(!check(ny, nx)) continue;
      if(forest[ny][nx] <= forest[y][x]) continue;
      dp[y][x] = Math.max(dp[y][x], dfs(ny, nx) + 1);
    }
    return dp[y][x];
  }

  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n; j++) {
      result = Math.max(result, dfs(i, j));
    }
  }
  
  return result;
}