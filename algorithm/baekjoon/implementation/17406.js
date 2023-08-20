// https://www.acmicpc.net/problem/17406
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 6 2
1 2 3 2 5 6
3 8 7 2 1 3
8 2 3 1 4 5
3 4 5 1 1 1
9 3 2 1 4 3
3 4 2
4 2 1`;
const [NMK, ...etc] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NMK, etc.slice(0, NMK[0]), etc.slice(NMK[0]).map(([r, c, s]) => [r - 1, c - 1, s])));

function solution ([N, M, K], grid, info) {
  let result = Number.MAX_SAFE_INTEGER;
  const visited = Array(K).fill(false);

  const round = (grid, [r, c, s]) => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    for(let i = 1; i <= s; i++) {
      for(let x = c - i; x < c + i; x++) {
        newGrid[r - i][x + 1] = grid[r - i][x];
      }

      for(let x = c + i; x > c - i; x--) {
        newGrid[r + i][x - 1] = grid[r + i][x];
      }

      for(let y = r - i; y < r + i; y++) {
        newGrid[y + 1][c + i] = grid[y][c + i];
      }

      for(let y = r + i; y > r - i; y--) {
        newGrid[y - 1][c - i] = grid[y][c - i];
      }
    }
    return newGrid
  }

  const dfs = (arr, myGrid) => {
    if(arr.length === K) {
      myGrid.forEach(e => result = Math.min(result, e.reduce((a, b) => a + b)))
      return;
    }

    for(let i = 0; i < K; i++) {
      if(visited[i]) continue;
      visited[i] = true;
      dfs([...arr, i], round(myGrid, info[i]))
      visited[i] = false;
  }
  }

  dfs([], grid);

  return result;
}
