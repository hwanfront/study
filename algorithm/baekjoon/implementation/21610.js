// https://www.acmicpc.net/problem/21610
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `2 1
1 1
1 1
1 1`;
let [NM, ...etc] = input.split('\n').map(e => e.split(' ').map(Number));
const directionD = [,[0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]];
const directionW = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
console.log(solution(NM, etc));

function solution ([N, M], etc) {
  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < N;
  const firstCloud = () => [[N - 1, 0], [N - 1, 1], [N - 2, 0], [N - 2, 1]];
  const move = (cloud, [dy, dx], s) => {
    const result = [];
    cloud.forEach(([y, x]) => {
      const ny = (y + dy * s) < 0 ? (N + ((y + dy * s) % N)) % N : (y + dy * s) % N;
      const nx = (x + dx * s) < 0 ? (N + ((x + dx * s) % N)) % N : (x + dx * s) % N;
      result.push([ny, nx]);
      cloudGrid[ny][nx] = true;
    })
    return result;
  }
  const rain = (cloud, grid) => {
    cloud.forEach(([y, x]) => {
      grid[y][x] += 1;
    });
  }
  const copyWater = (cloud, grid) => {
    cloud.forEach(([y, x]) => {
      for(const [dy, dx] of directionW) {
        const ny = y + dy;
        const nx = x + dx;
        if(!check(ny, nx)) continue;
        if(grid[ny][nx] > 0) grid[y][x] += 1;
      }
    })
  }
  const createCloud = (cloudGrid, grid) => {
    const newCloud = [];
    for(let i = 0; i < N; i++) {
      for(let j = 0; j < N; j++) {
        if(cloudGrid[i][j]) continue;
        if(grid[i][j] < 2) continue;
        grid[i][j] -= 2;
        newCloud.push([i, j]);
      }
    }
    return newCloud;
  }

  let grid = etc.slice(0, N);
  let info = etc.slice(N);
  let cloud = firstCloud();
  let cloudGrid;

  info.forEach(([d, s]) => {
    cloudGrid = Array.from({length: N}, () => Array(N).fill(false))
    const movedCloud = move(cloud, directionD[d], s);
    rain(movedCloud, grid);
    copyWater(movedCloud, grid);
    const newCloud = createCloud(cloudGrid, grid);
    cloud = newCloud;
  })

  return grid.reduce((prev, cur) => prev + cur.reduce((p, c) => p + c, 0), 0);
}